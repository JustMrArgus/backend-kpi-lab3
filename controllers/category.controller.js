const db = require("../data/data");

const createCategory = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  const newCategory = {
    id: db.categoryIdCounter++,
    name,
  };

  db.categories.push(newCategory);
  res.status(201).json(newCategory);
};

const getCategories = (req, res) => {
  res.status(200).json(db.categories);
};

const deleteCategory = (req, res) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  const categoryIndex = db.categories.findIndex((c) => c.id === categoryId);
  if (categoryIndex === -1) {
    return res.status(404).json({ error: "Category not found" });
  }
  db.categories.splice(categoryIndex, 1);
  res.status(204).send();
};

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
};
