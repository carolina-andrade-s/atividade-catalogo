const form = document.getElementById('formFilme');
const lista = document.getElementById('listaFilmes');

let editando = null;

// Listar filmes
async function carregarFilmes() {
    const resposta = await fetch('/api/filmes');
    const filmes = await resposta.json();

    lista.innerHTML = '';

    filmes.forEach(filme => {
        lista.innerHTML += `
            <div>
                <h3>${filme.titulo}</h3>
                <p>Ano: ${filme.ano}</p>
                <p>Gênero: ${filme.genero}</p>

                <button onclick="editar(${filme.id})">Editar</button>
                <button onclick="excluir(${filme.id})">Excluir</button>
            </div>
        `;
    });
}

// Cadastrar / atualizar
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        titulo: document.getElementById('titulo').value,
        ano: Number(document.getElementById('ano').value),
        genero: document.getElementById('genero').value
    };

    const url = editando
        ? `/api/filmes/${editando}`
        : '/api/filmes';

    await fetch(url, {
        method: editando ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    });

    editando = null;
    form.reset();
    carregarFilmes();
});

// Editar
async function editar(id) {
    const resposta = await fetch(`/api/filmes/${id}`);
    const filme = await resposta.json();

    document.getElementById('titulo').value = filme.titulo;
    document.getElementById('ano').value = filme.ano;
    document.getElementById('genero').value = filme.genero;

    editando = id;
}

// Excluir
async function excluir(id) {
    await fetch(`/api/filmes/${id}`, {
        method: 'DELETE'
    });

    carregarFilmes();
}

carregarFilmes();