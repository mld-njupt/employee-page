import { pool } from "../db/index";
import { Employee } from "../models/employee";

export async function getEmployeeById(id: string) {
  const conn = await pool.getConnection();
  try {
    const [rows]: any = await conn.query(
      "SELECT * FROM employees WHERE id = ?",
      [id]
    );
    const [expRows]: any = await conn.query(
      "SELECT * FROM experiences WHERE employee_id = ? ORDER BY start_date DESC",
      [id]
    );

    // 查教育表
    const [eduRows]: any = await conn.query(
      "SELECT * FROM educations WHERE employee_id = ? ORDER BY start_date DESC",
      [id]
    );
    if (!rows.length) return null;
    const employee = rows[0];
    employee.experiences = expRows;
    employee.educations = eduRows;
    return employee as Employee;
  } finally {
    conn.release();
  }
}

export async function updateEmployee(id: string, data: Partial<Employee>) {
  const conn = await pool.getConnection();
  try {
    const fields: string[] = [];
    const values: any[] = [];
    for (const key of [
      "first_name",
      "last_name",
      "email",
      "phone",
      "title",
      "department",
      "location",
      "start_date",
      "about",
      "social_links",
      "skills"
    ]) {
      if (data[key as keyof Employee] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(
          key === "social_links"||"skills"
            ? JSON.stringify(data[key as keyof Employee])
            : data[key as keyof Employee]
        );
      }
    }
    if (fields.length) {
      values.push(id);
      await conn.query(
        `UPDATE employees SET ${fields.join(", ")} WHERE id = ?`,
        values
      );
    }
    return getEmployeeById(id);
  } finally {
    conn.release();
  }
}

export async function updateEmployeeSkills(id: string, skills: string[]) {
  const conn = await pool.getConnection();
  try {
    await conn.query("UPDATE employees SET skills = ? WHERE id = ?", [
      JSON.stringify(skills),
      id,
    ]);
    return skills;
  } finally {
    conn.release();
  }
}
