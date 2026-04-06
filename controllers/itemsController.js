const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/items.json');

// Read data
const readData = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Write data
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET /items
exports.getItems = (req, res) => {
  const items = readData();
  res.json(items);
};

// POST /items
exports.addItem = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const items = readData();

  const newItem = {
    id: Date.now().toString(),
    title,
    description,
    createdAt: new Date()
  };

  items.push(newItem);
  writeData(items);

  res.status(201).json(newItem);
};
exports.deleteItem = (req, res) => {
  const { id } = req.params;

  let items = readData();

  const filteredItems = items.filter(item => item.id !== id);

  if (items.length === filteredItems.length) {
    return res.status(404).json({ message: 'Item not found' });
  }

  writeData(filteredItems);

  res.json({ message: 'Item deleted' });
};
exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  let items = readData();

  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  if (title) items[index].title = title;
  if (description) items[index].description = description;

  writeData(items);

  res.json(items[index]);
};