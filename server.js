const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let trees = [];


app.get('/trees', (req, res) => {
    res.json(trees);
});


app.post('/trees', (req, res) => {
    const newTree = req.body;
    trees.push(newTree);
    res.status(201).json(newTree);
});


app.put('/trees/:id', (req, res) => {
    const { id } = req.params;
    const updatedTree = req.body;
    trees[id] = updatedTree;
    res.json(updatedTree);
});


app.delete('/trees/:id', (req, res) => {
    const { id } = req.params;
    trees.splice(id, 1);
    res.status(204).send();
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущений на http://localhost:${PORT}`);
});
