import pool from "../config/db.js";

export const UserModel = {
  createUser: async (data) => {
    const query = `
      INSERT INTO users (
        email,
        password,
        full_name,
        gender,
        mobile_no,
        signup_type,
        is_mobile_verified,
        is_email_verified
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const values = [
      data.email,
      data.password,
      data.full_name,
      data.gender,
      data.mobile_no,
      "email",
      false,
      false
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0];
  }
};