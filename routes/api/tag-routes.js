const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tagsList = await Tag.findAll({
    include: [ {model: Product }]
  });
  res.status(200).json(tagsList);
});

router.get('/:id', async (req, res) => {
  const tagItem = await Tag.findOne({
    where :{
      id: req.params.id
    },
    include: [
      {
        model: Product,
      }
    ]
  })
  res.status(200).json(tagItem);
});

router.post('/', async (req, res) => {
  // create a new tag
  const newTag = await Tag.create(req.body);
  res.status(200).json(newTag);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updatedTag = await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  res.status(200).json(updatedTag);
});

router.delete('/:id', async (req, res) => {
  const deleted = await Tag.destroy({
    where: { id: req.params.id}
  });
  res.status(200).json(deleted);
});

module.exports = router;
