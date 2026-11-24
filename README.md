# Catálago de Filmes

## Pacotes pra instalar no terminal:
- npm init -y
- npm install express cors sequelize sqlite3

## Criar no terminal:
- mkdir nome-da-pasta
- cd nome-da-pasta 
- touch server.js
- mkdir public 
- touch index.html, style.css, script.js

## Pra rodar o programa:
- node server.js

## Explicar
- GET = BUSCAR
- POST = PUBLICAR
- PUT = ATUALIZAR
- DELETE = DELETAR

-----------------------------------

# Perguntas na apresentação
## 1. Como é a integração do site?

- Front-end: HTML, CSS e JavaScript puro
- Back-end: Node.js + Express (porta 3000)
- Banco: SQLite, acessado pelo Sequelize
- Fluxo: navegador → fetch → Express → Sequelize → SQLite
- O front nunca acessa o banco direto
- O Express serve a pasta public (o front)

## 2. Quais são as entidades e tabelas?

Uma entidade: Filme (tabela Filmes)
Campos: titulo (string), ano (inteiro), genero (string)
O Sequelize cria id, createdAt e updatedAt
Sem login, então sem tabela de usuários
Banco em arquivo: database.sqlite

3. Como o front conversa com o back?

Usa fetch com async/await, enviando JSON
Rotas em /api/filmes:
GET lista
GET /:id busca um filme
POST cadastra
PUT /:id atualiza
DELETE /:id exclui

4. Como o back conversa com o banco?

Pelo Sequelize, um ORM (traduz JavaScript em SQL)
Métodos: findAll, findByPk, create, update, destroy
sequelize.sync() cria a tabela ao iniciar
Não escrevo SQL direto

Resumo para fechar (30 segundos):

"O front em JavaScript puro usa fetch para chamar a API REST em Node/Express, que usa o Sequelize para gravar e ler filmes no SQLite."
# atividade-catalogo
