import { pool } from "../db/index";
import { WorkExperience } from "../models/experience";

export async function updateExperiences(
  employeeId: string,
  newExperiences: WorkExperience[]
) {
  const conn = await pool.getConnection();
  try {
    const [rows]: any = await conn.query(
      "SELECT * FROM experiences WHERE employee_id = ?",
      [employeeId]
    );
    const existing: WorkExperience[] = rows;
    const existingMap = new Map(existing.map((e) => [e.id, e]));
    for (const exp of newExperiences) {
      if (exp.id && existingMap.has(exp.id)) {
        // 已存在 -> 更新
        const fields: string[] = [];
        const values: any[] = [];
        const updatableFields: (keyof WorkExperience)[] = [
          "company",
          "position",
          "description",
        ];
        for (const key of updatableFields) {
          if (exp[key] !== undefined) {
            values.push(exp[key]);
            fields.push(`${key} = ?`);
          }
        }
        values.push(exp.id);
        if (fields.length) {
          await conn.query(
            `UPDATE experiences SET ${fields.join(", ")} WHERE id = ?`,
            values
          );
        }
        existingMap.delete(exp.id);
      } else {
        await conn.query(
          `INSERT INTO experiences 
            (employee_id, company, position, start_date, end_date, current, description)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            employeeId,
            exp.company,
            exp.position,
            exp.start_date,
            exp.end_date || null,
            0,
            exp.description || null,
          ]
        );
      }
    }
    const idsToDelete = Array.from(existingMap.keys());
    if (idsToDelete.length) {
      await conn.query(`DELETE FROM experiences WHERE id IN (?)`, [
        idsToDelete,
      ]);
    }
    const [updatedRows]: any = await conn.query(
      "SELECT * FROM experiences WHERE employee_id = ?",
      [employeeId]
    );
    return updatedRows as WorkExperience[];
  } finally {
    conn.release();
  }
}
