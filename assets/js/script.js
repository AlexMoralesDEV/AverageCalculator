let nota = document.querySelector('#nota');
let nome = document.querySelector('#nome');
const enviar = document.querySelector('#enviar');
const prox = document.querySelector('#next');
let alunos = [];
let arrayTitulos = [];

function pegarNotas(){
    let alunoExiste = alunos.find(function(aluno){
        return aluno.nome === nome.value;
    });

    if(alunoExiste){
        alunoExiste.notas.push(parseFloat(nota.value));
    }else{
        alunos.push({nome: nome.value,
                    notas: [parseFloat(nota.value)]});
    }
    zerarInput();
    console.log(alunos);
    adicionarTabela(alunos);
};

function zerarInput(){
    nota.value = '';
    nota.focus();
};

function media(notas){
    if(notas.length === 0){
        return 0;
    }

    let soma = notas.reduce(function(acumulador, notas){
        return acumulador + notas;
    });

    return soma / notas.length;
};

const tabela = document.querySelector('#tabela');
const headTabela = document.querySelector('#headTabela');

function adicionarTabela(alunos){
    let tabela = document.getElementById("tabela");
    tabela.innerHTML = "<tr><td>Nome do Aluno</td><td>Notas</td><td>Média</td><td>Apagar</td></tr>";

    alunos.forEach(function(aluno) {
        let mediaA = media(aluno.notas);
        var linha = "<tr><td>" + aluno.nome + "</td><td>" + aluno.notas.join(", ") + "</td><td>" + mediaA.toFixed(2) + "</td><td>"+ "<button>" + botaoApagar() + "</button>" + "</td></tr>";
        tabela.innerHTML += linha;
    });
};

function botaoApagar(){
    let valorInterno = 'Apagar';
    return valorInterno;
};

function validarCampos(){
    if(nota.value === '' || nota.value > 10 || nota.value < 0){
        alert('Digite uma nota válida.');
        nota.value = '';
        nota.focus();
        return true;
    };
    if(nome.value === '' || typeof nome.value == 'number'){
        alert('Digite um nome válido.');
        nome.value = '';
        nome.focus();
        return true;
    };
    desabilitarInput(true);
    return false;
};

function desabilitarInput(sN){
    nome.disabled = sN;

    if(!sN){
        nome.value = '';
        nota.focus();
    };
};

function salvarAlunos(){
    let alunosJSON = JSON.stringify(alunos);
    localStorage.setItem('alunos', alunosJSON);
};

function carregarAlunos(){
    let localAlunos = localStorage.getItem('alunos');
    alunos = JSON.parse(localAlunos);

    alunos.forEach(function(valorA){
        adicionarTabela(alunos);
    });
};

try{
    carregarAlunos();
}catch(err){
    console.log('Nenhum aluno salvo.');
    if(!alunos){
        alunos = [];
    };
};

function classeApagar(){
    let tabela = document.getElementById("tabela");
    let classeApagar = tabela.querySelectorAll('button');
    classeApagar.forEach(function(elemento){
        elemento.setAttribute('class', 'btn btn-danger form-control');
    });
};

classeApagar();

document.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if(!validarCampos()){
            pegarNotas();
            salvarAlunos();
            classeApagar();
        }
    }
});

enviar.addEventListener('click', function(){
    if(!validarCampos()){
        pegarNotas();
        salvarAlunos();
        classeApagar();
    };
});

prox.addEventListener('click', function(){
    desabilitarInput(false);
});

document.addEventListener('click', function(e){
    let el = e.target;

    if(el.innerHTML == 'Apagar'){
        let elementoPai = el.parentElement.parentElement
        let nomeAluno = elementoPai.querySelector('td').textContent;

        alunos = alunos.filter(function(aluno){
            return aluno.nome !== nomeAluno;
        });

        elementoPai.remove();

        salvarAlunos();
    };
});



