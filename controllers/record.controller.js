const db = require("../data/data");

const createRecord = (req, res) => {
  const { userId, categoryId, amount } = req.body;

  if (
    userId === undefined ||
    categoryId === undefined ||
    amount === undefined
  ) {
    return res
      .status(400)
      .json({ error: "userId, categoryId, and amount are required" });
  }

  const userExists = db.users.some((u) => u.id === parseInt(userId, 10));
  const categoryExists = db.categories.some(
    (c) => c.id === parseInt(categoryId, 10)
  );

  if (!userExists) {
    return res.status(404).json({ error: "User not found" });
  }
  if (!categoryExists) {
    return res.status(404).json({ error: "Category not found" });
  }

  const newRecord = {
    id: db.recordIdCounter++,
    userId: parseInt(userId, 10),
    categoryId: parseInt(categoryId, 10),
    createdAt: new Date().toISOString(),
    amount: parseFloat(amount),
  };

  db.records.push(newRecord);
  res.status(201).json(newRecord);
};

const getRecords = (req, res) => {
  const { user_id, category_id } = req.query;

  if (!user_id && !category_id) {
    return res.status(400).json({
      error: "At least one filter (user_id or category_id) is required",
    });
  }

  let filteredRecords = db.records;

  if (user_id) {
    filteredRecords = filteredRecords.filter(
      (r) => r.userId === parseInt(user_id, 10)
    );
  }

  if (category_id) {
    filteredRecords = filteredRecords.filter(
      (r) => r.categoryId === parseInt(category_id, 10)
    );
  }

  res.status(200).json(filteredRecords);
};

const getRecordById = (req, res) => {
  const recordId = parseInt(req.params.recordId, 10);
  const record = db.records.find((r) => r.id === recordId);
  if (!record) {
    return res.status(404).json({ error: "Record not found" });
  }
  res.status(200).json(record);
};

const deleteRecord = (req, res) => {
  const recordId = parseInt(req.params.recordId, 10);
  const recordIndex = db.records.findIndex((r) => r.id === recordId);
  if (recordIndex === -1) {
    return res.status(404).json({ error: "Record not found" });
  }
  db.records.splice(recordIndex, 1);
  res.status(204).send();
};

module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  deleteRecord,
};
