const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const app = express(); //cria servidor
const PORT = 3000; //porta onde o servidor vai ficar

app.use(cors()); //recomendado para permitir que o front-end acesse a API
app.use(express.json()); //lê o JSON do corpo da requisição
app.use(express.static('public')); //entrega os arquivos do front (HTML, CSS, JS).

//conecta ao SQlite no arquivo database.sqlite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

//cria o modelo dos titulos 
const Filme = sequelize.define('Filme', { 
    titulo: DataTypes.STRING,
    ano: DataTypes.INTEGER,
    genero: DataTypes.STRING
});

// GET - listar filmes
app.get('/api/filmes', async (req, res) => {
    const filmes = await Filme.findAll();
    res.json(filmes);
});

// GET - buscar por ID
app.get('/api/filmes/:id', async (req, res) => {
    const filme = await Filme.findByPk(req.params.id);
    res.json(filme);
});

// POST - cadastrar
app.post('/api/filmes', async (req, res) => {
    const filme = await Filme.create(req.body);
    res.status(201).json(filme);
});

// PUT - atualizar
app.put('/api/filmes/:id', async (req, res) => {
    const filme = await Filme.findByPk(req.params.id);
    await filme.update(req.body);
    res.json(filme);
});

// DELETE - excluir
app.delete('/api/filmes/:id', async (req, res) => {
    const filme = await Filme.findByPk(req.params.id);
    await filme.destroy();
    res.json({ mensagem: 'Filme excluído!' });
});

sequelize.sync().then(() => {
    console.log('Banco conectado!');
    app.listen(PORT, () => {
        console.log(`Servidor: http://localhost:${PORT}`);
    });
});