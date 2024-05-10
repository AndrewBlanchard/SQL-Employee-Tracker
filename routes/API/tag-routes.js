const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET all tags
router.get('/', async (req, res) => {
    try {
      const tags = await Tag.findAll({
        include: [{ model: Product }]
      });
      res.status(200).json(tags);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // GET one Tag by id
  router.get('/:id', async (req, res) => {
    try {
      const tag = await Tag.findByPk(req.params.id, {
        include: [{ model: Product }]
      });
      if (!Tag) {
        res.status(404).json({ message: 'No Tag found with this id!' });
        return;
      }
      res.status(200).json(Tag);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // POST a new Tag
  router.post('/', async (req, res) => {
    try {
      const tag = await Tag.create(req.body);
      res.status(200).json(tag);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // UPDATE a tag by id
  router.put('/:id', async (req, res) => {
    try {
      const [updatedRows] = await Tag.update(req.body, {
        where: { id: req.params.id }
      });
      if (updatedRows > 0) {
        res.status(200).json({ message: `${updatedRows} tag(s) updated!` });
      } else {
        res.status(404).json({ message: 'No tag found with this id!' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // DELETE a tag by id
  router.delete('/:id', async (req, res) => {
    try {
      const deletedRows = await Tag.destroy({
        where: { id: req.params.id }
      });
      if (deletedRows > 0) {
        res.status(200).json({ message: `${deletedRows} tag(s) deleted!` });
      } else {
        res.status(404).json({ message: 'No Tag found with this id!' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;