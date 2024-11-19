const fs = require('fs');
const path = require('path');
const dbFilePath = path.join(__dirname, '../db.json');

// Read the database
const readDatabase = () => {
    const data = fs.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(data);
};

// Write to the database
const writeDatabase = (data) => {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

// Get the list of products
exports.getProducts = (req, res) => {
    const db = readDatabase();
    res.status(200).json(db.products); // Send the list of products
};

// Add a new product
exports.addProduct = (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ message: 'Product name and price are required' });
    }

    const db = readDatabase();

    // Creating a new product
    const newProduct = {
        id: Date.now().toString(),
        name,
        price: parseFloat(price)
    };

    db.products.push(newProduct);
    writeDatabase(db);

    res.status(201).json({ message: 'Product added successfully' });
};

// Edit an existing product
exports.editProduct = (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ message: 'Product name and price are required' });
    }

    const db = readDatabase();
    const productIndex = db.products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    db.products[productIndex] = { id, name, price: parseFloat(price) };
    writeDatabase(db);

    res.status(200).json({ message: 'Product updated successfully' });
};

// Delete a product
exports.deleteProduct = (req, res) => {
    const { id } = req.params;

    const db = readDatabase();
    const productIndex = db.products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    db.products.splice(productIndex, 1);
    writeDatabase(db);

    res.status(200).json({ message: 'Product deleted successfully' });
};
