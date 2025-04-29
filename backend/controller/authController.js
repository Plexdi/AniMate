const pool = require('../services/db');

exports.registerUser = async (req, res) => {
  const { username, email, firebase_uid, avatar_url } = req.body;

  if (!firebase_uid || !email) {
    return res.status(400).json({ message: "Missing firebase_uid or email" });
  }

  try {
    // Insert into database
    const result = await pool.query(
      `INSERT INTO users (username, email, firebase_uid, avatar_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [username, email, firebase_uid, avatar_url]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};
