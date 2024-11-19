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

// Controller to register a user
exports.registerUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const db = readDatabase();
    const existingUser = db.users.find(user => user.email === email);

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
        id: Date.now().toString(),
        email,
        password
    };

    db.users.push(newUser);
    writeDatabase(db);
    res.status(201).json({ message: 'User registered successfully' });
};

// Controller for user login
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const db = readDatabase();
    const user = db.users.find(user => user.email === email && user.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
};
