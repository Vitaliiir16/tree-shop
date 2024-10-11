const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для парсингу JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Зберігання дерев у файлі
const dataFilePath = path.join(__dirname, 'trees.json');

// Функція для читання даних з файлу
const readTreesFromFile = () => {
    if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath);
        return JSON.parse(data);
    }
    return [];
};

// Функція для запису даних у файл
const writeTreesToFile = (trees) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(trees, null, 2));
};

// REST API для CRUD операцій
app.get('/api/trees', (req, res) => {
    const trees = readTreesFromFile();
    res.json(trees);
});

app.post('/api/trees', (req, res) => {
    const newTree = req.body;
    const trees = readTreesFromFile();
    trees.push(newTree);
    writeTreesToFile(trees);
    res.status(201).json(newTree);
});

app.put('/api/trees/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    const updatedTree = req.body;
    const trees = readTreesFromFile();
    
    if (index >= 0 && index < trees.length) {
        trees[index] = updatedTree;
        writeTreesToFile(trees);
        res.json(updatedTree);
    } else {
        res.status(404).send('Tree not found');
    }
});

app.delete('/api/trees/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    const trees = readTreesFromFile();

    if (index >= 0 && index < trees.length) {
        trees.splice(index, 1);
        writeTreesToFile(trees);
        res.status(204).send();
    } else {
        res.status(404).send('Tree not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
