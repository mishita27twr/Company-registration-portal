import pool from "../config/db.js";

export const CompanyModel = {
  create: async (data) => {
    const query = `
      INSERT INTO company_profile 
      (owner_id, company_name, address, city, state, country, postal_code, industry)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *;
    `;

    const values = [
      data.owner_id,
      data.company_name,
      data.address,
      data.city,
      data.state,
      data.country,
      data.postal_code,
      data.industry
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getByOwner: async (owner_id) => {
    const result = await pool.query(
      "SELECT * FROM company_profile WHERE owner_id = $1",
      [owner_id]
    );
    return result.rows[0];
  }
};