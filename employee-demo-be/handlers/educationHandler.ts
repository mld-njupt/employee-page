import { pool } from "../db/index";
import { Education } from "../models/education";

export async function updateEducations(
  employeeId: string,
  newEducations: Education[]
) {
  const conn = await pool.getConnection();
  try {
    const [rows]: any = await conn.query(
      "SELECT * FROM educations WHERE employee_id = ?",
      [employeeId]
    );
    const existing: Education[] = rows;
    const existingMap = new Map(existing.map((e) => [e.id, e]));
    for (const edu of newEducations) {
      if (edu.id && existingMap.has(edu.id)) {
        const fields: string[] = [];
        const values: any[] = [];
        const updatableFields: (keyof Education)[] = [
          "institution",
          "degree",
          "field",
          "start_date",
          "end_date",
        ];
        for (const key of updatableFields) {
          if (edu[key] !== undefined) {
            values.push(edu[key]);
            fields.push(`${key} = ?`);
          }
        }
        values.push(edu.id);
        if (fields.length) {
          await conn.query(
            `UPDATE educations SET ${fields.join(", ")} WHERE id = ?`,
            values
          );
        }
        existingMap.delete(edu.id);
      } else {
        await conn.query(
          `INSERT INTO educations
           (employee_id, institution, degree, field, start_date, end_date, current)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            employeeId,
            edu.institution,
            edu.degree || null,
            edu.field || null,
            edu.start_date,
            edu.end_date || null,
            0,
          ]
        );
      }
    }
    const idsToDelete = Array.from(existingMap.keys());
    if (idsToDelete.length) {
      await conn.query(`DELETE FROM educations WHERE id IN (?)`, [idsToDelete]);
    }
    const [updatedRows]: any = await conn.query(
      "SELECT * FROM educations WHERE employee_id = ?",
      [employeeId]
    );
    return updatedRows as Education[];
  } finally {
    conn.release();
  }
}
