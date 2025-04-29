const express = require('express');
const router = express.Router();
const { 
  createList, 
  addAnimeToList, 
  deleteAnimeFromList, 
  deleteList 
} = require('../controller/listController');

router.post('/', createList);             // POST /api/list/
router.post('/entry', addAnimeToList);     // POST /api/list/entry
router.delete('/entry/:anime_name', deleteAnimeFromList); // DELETE /api/list/entry/:anime_name
router.delete('/list/:list_id', deleteList);              // DELETE /api/list/list/:list_id

module.exports = router;
