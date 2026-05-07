import pool from "../config/db.js";

// CREATE or UPDATE company profile
export const saveCompanyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      company_name,
      email,
      phone,
      gst_number,
      cin_number,
      address,
      city,
      state,
      pincode,
      industry
    } = req.body;

    // Check if profile exists
    const existing = await pool.query(
      "SELECT * FROM company_info WHERE user_id = $1",
      [userId]
    );

    if (existing.rows.length > 0) {
      // UPDATE
      await pool.query(
        `UPDATE company_info
         SET company_name=$1, email=$2, phone=$3, gst_number=$4, cin_number=$5,
             address=$6, city=$7, state=$8, pincode=$9, industry=$10, updated_at=NOW()
         WHERE user_id=$11`,
        [
          company_name, email, phone, gst_number, cin_number,
          address, city, state, pincode, industry, userId
        ]
      );

      return res.json({ message: "Company profile updated successfully" });
    }

    // CREATE
    await pool.query(
      `INSERT INTO company_info 
       (user_id, company_name, email, phone, gst_number, cin_number, address, city, state, pincode, industry)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        userId, company_name, email, phone, gst_number, cin_number,
        address, city, state, pincode, industry
      ]
    );

    res.json({ message: "Company profile created successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};


// GET company profile
export const getCompanyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM company_info WHERE user_id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.json({ message: "No company profile found" });
    }

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};