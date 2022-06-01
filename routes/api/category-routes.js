const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const categories = await Category.findAll({
    include: [{ model: Product }]
  })//.catch((err) => res.status(500).json(err));
  res.status(200).json(categories);
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  const category = await Category.findByPk(req.params.id, {
    include: [{ model: Product }]
  })//.catch((err) => res.status(500).json(err));
  res.status(200).json(category);
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  const newCategory = await Category.create(req.body).catch((err) => res.status(500).json(err));
  res.status(200).json(newCategory);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const { categoryName } = req.body;

  const updatedCategory = await Category.update(
    {
      category_name: categoryName
    },
    {
      where: {
        id: req.params.id,
      }
    }
  );
  if(!updatedCategory){
    res.status(400).json('Enter valid category id');
  };

  res.status(200).json(changeCategory);
});

router.delete('/:id', async (req, res) => {
  const output = await Category.destroy({
    where: { id: req.params.id }
  });
  res.status(200).json(output);
});

module.exports = router;
