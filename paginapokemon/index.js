let tela = document.querySelector('body');
let head = document.querySelector('head');
let divMain = document.createElement('main');

let divNomeImagem;

let idPokemon = document.location.search;
idPokemon = idPokemon.replace('?', '');

function pegarDadosPokemon() {
    fetch('https://prof-poke-api.herokuapp.com/api/pokemon/' + idPokemon)
        .then(function(resultado) {
            resultado.json().then(function(data) {

                console.log(data);

                criarPagina(data);
            });
        }).catch(function(erro) {
            console.log('erro:', erro);
        });
}

function criarCabecalho() {
    let cabecalho = document.createElement('header');
    let logo = document.createElement('img');

    logo.className = 'logo';
    logo.src = "data:image/png;base64,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";

    cabecalho.appendChild(logo);
    tela.appendChild(cabecalho);
}

function criarPagina(a) {

    tela.appendChild(divMain);

    criarDivNomeImagem(a)
    tabelaStatus(a);
    tituloPagina(a);
}

function criarDivNomeImagem(a) {

    divNomeImagem = document.createElement('div');
    divNomeImagem.className = 'divNomeImagem';

    criarNomePokemon(a, divNomeImagem);
    imagemPokemon(a, divNomeImagem);

    divMain.appendChild(divNomeImagem);
}

function imagemPokemon(a, b) {

    let divImagem = document.createElement('div');
    divImagem.className = 'divImagem';

    let imagemPokemon = document.createElement('img');
    imagemPokemon.src = a.url_icon;

    imagemPokemon.className = 'imagemPokemon';

    imagemPokemon.onerror = function() {
        imagemPokemon.src = a.url_icon_2;
    }

    divImagem.appendChild(imagemPokemon);
    b.appendChild(divImagem);
}

function criarNomePokemon(a, b) {

    let nomePokemon = document.createElement('p');
    nomePokemon.innerText = a.name;

    nomePokemon.className = 'nomePokemon';

    b.appendChild(nomePokemon);
}

function tabelaStatus(a) {

    let tabelaStatus = document.createElement('table');

    divMain.appendChild(tabelaStatus);

    linhaatk(a, tabelaStatus);
    linhaatks(a, tabelaStatus);
    linhadef(a, tabelaStatus);
    linhadefs(a, tabelaStatus);
}

function linhaatk(a, b) {

    let linha = document.createElement('tr');
    linha.className = 'linha';
    linha.style.backgroundColor = 'rgb(117, 211, 117)';

    let coluna = document.createElement('td');
    coluna.innerText = 'ATK';
    coluna.className = 'coluna';

    let atkvalor = document.createElement('td');
    atkvalor.innerText = a.atk;

    if (a.atk < 15) {
        divNomeImagem.style.backgroundColor = 'rgb(199, 243, 134)';
    } else if (a.atk < 30) {
        divNomeImagem.style.backgroundColor = 'rgb(138, 137, 235)';
    } else if (a.atk < 45) {
        divNomeImagem.style.backgroundColor = 'rgb(224, 214, 117)';
    } else if (a.atk < 60) {
        divNomeImagem.style.backgroundColor = 'rgb(91, 196, 81)';
    } else if (a.atk < 75) {
        divNomeImagem.style.backgroundColor = 'rgb(136, 225, 231)';
    } else {
        divNomeImagem.style.backgroundColor = 'rgb(233, 52, 52)';
    }

    linha.appendChild(coluna);
    linha.appendChild(atkvalor);

    b.appendChild(linha);
}

function linhaatks(a, b) {

    let linha = document.createElement('tr');
    linha.className = 'linha';

    let coluna = document.createElement('td');
    coluna.innerText = 'ATKS';
    coluna.className = 'coluna';

    let atksvalor = document.createElement('td');
    atksvalor.innerText = a.atks;

    linha.appendChild(coluna);
    linha.appendChild(atksvalor);

    b.appendChild(linha);
}

function linhadef(a, b) {

    let linha = document.createElement('tr');
    linha.className = 'linha';
    linha.style.backgroundColor = 'rgb(117, 211, 117)';

    let coluna = document.createElement('td');
    coluna.innerText = 'DEF';
    coluna.className = 'coluna';

    let defvalor = document.createElement('td');
    defvalor.innerText = a.def;

    linha.appendChild(coluna);
    linha.appendChild(defvalor);

    b.appendChild(linha);
}

function linhadefs(a, b) {

    let linha = document.createElement('tr');
    linha.className = 'linha';
    linha.style.borderBottom = '0px';

    let coluna = document.createElement('td');
    coluna.innerText = 'DEFS';
    coluna.className = 'coluna';

    let defsvalor = document.createElement('td');
    defsvalor.innerText = a.defs;

    linha.appendChild(coluna);
    linha.appendChild(defsvalor);

    b.appendChild(linha);
}

function tituloPagina(a) {

    let titulo = document.createElement('title');

    titulo.innerText = a.name;

    head.appendChild(titulo);
}

criarCabecalho();
pegarDadosPokemon();