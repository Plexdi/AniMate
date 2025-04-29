const pool = require('../services/db');

exports.createList = async (req, res) => {
  const { user_id, name } = req.body;
  if (!user_id || !name) {
    return res
      .status(400)
      .json({ message: "Missing required fields: user_id and name." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO user_lists (user_id, name)
       VALUES ($1, $2)
       RETURNING *;`,
      [user_id, name]
    );
    res.status(201).json({ list: result.rows[0] });
  } catch (err) {
    console.error("Error creating list:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.addAnimeToList = async (req, res) => {
  const {
    list_id,
    anime_id,
    status,
    score = null,
    episodes_watched = 0,
  } = req.body;

  if (!list_id || !anime_id || !status) {
    return res
      .status(400)
      .json({ message: "Missing required fields: list_id, anime_id, status." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO user_list_entries
        (list_id, anime_id, status, score, episodes_watched)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (list_id, anime_id)
       DO UPDATE SET
         status = EXCLUDED.status,
         score = EXCLUDED.score,
         episodes_watched = EXCLUDED.episodes_watched
       RETURNING *;`,
      [list_id, anime_id, status, score, episodes_watched]
    );
    res.status(200).json({ entry: result.rows[0] });
  } catch (err) {
    console.error("Error adding anime to list:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

// controller/listController.js
exports.deleteAnimeFromList = async (req, res) => {
    const { user_id, anime_id, anime_list_id } = req.body;
  
    // 1) Validate input
    if (!user_id || !anime_id || !anime_list_id) {
      return res
        .status(400)
        .json({ message: "Missing required fields: user_id, anime_id, and anime_list_id are all required." });
    }
  
    try {
      // 2) Perform the delete
      const result = await pool.query(
        `DELETE FROM user_anime_list
         WHERE id = $1
           AND user_id = $2
           AND anime_id = $3
         RETURNING *;`,
        [anime_list_id, user_id, anime_id]
      );
  
      // 3) If nothing was deleted, return 404
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "List entry not found or does not belong to this user." });
      }
  
      // 4) Success
      res.status(200).json({
        message: "Entry deleted successfully.",
        deletedEntry: result.rows[0]
      });
    } catch (err) {
      console.error("Error deleting list entry:", err);
      res.status(500).json({ message: "Internal server error." });
    }
  };
  

exports.deleteList = async (req, res) => {
    const { list_id } = req.params;
    const { user_id } = req.body;
  
    // 1) Validate input
    if (!list_id || !user_id) {
      return res
        .status(400)
        .json({ message: "Missing required fields: list_id and user_id." });
    }
  
    try {
      // 2) Delete the list (and cascades to entries)
      const result = await pool.query(
        `DELETE FROM user_lists
         WHERE id = $1
           AND user_id = $2
         RETURNING *;`,
        [list_id, user_id]
      );
  
      // 3) If nothing was deleted, 404
      if (result.rowCount === 0) {
        return res.status(404).json({
          message: "List not found or does not belong to this user."
        });
      }
  
      // 4) Success
      res.status(200).json({
        message: "List deleted successfully.",
        deletedList: result.rows[0]
      });
    } catch (err) {
      console.error("Error deleting list:", err);
      res.status(500).json({ message: "Internal server error." });
    }
  };
  