// ==========================================
// Quadro Kanban - Projeto Web I
// ==========================================

const inputTarefa = document.getElementById("input-tarefa");
const btnCriar = document.getElementById("btn-criar");

const aFazer = document.getElementById("a-fazer");
const fazendo = document.getElementById("fazendo");
const concluido = document.getElementById("concluido");

let variavelCardArrastado = null;
let tarefas = [];

// ================= STORAGE =================

function salvarTarefas(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas(){
    const dados = localStorage.getItem("tarefas");
    if(dados){
        tarefas = JSON.parse(dados);
    }
}

// ================= DRAG =================

function permitirDrop(event){
    event.preventDefault();
}

function configurarColuna(coluna){

    coluna.addEventListener("dragover", permitirDrop);

    coluna.addEventListener("drop", function(){

        coluna.appendChild(variavelCardArrastado);

        const texto = variavelCardArrastado.querySelector("span").textContent;

        const tarefa = tarefas.find(t => t.texto === texto);

        if(tarefa){
            tarefa.coluna = coluna.id;
            salvarTarefas();
        }

        variavelCardArrastado = null;
    });
}

configurarColuna(aFazer);
configurarColuna(fazendo);
configurarColuna(concluido);

// ================= CARD =================

function criarCard(tarefa){

    const novoCard = document.createElement("div");
    novoCard.classList.add("card");
    novoCard.setAttribute("draggable", "true");

    // CONTEÚDO (área clicável)
    const conteudo = document.createElement("div");
    conteudo.classList.add("conteudo");

    const spanTexto = document.createElement("span");
    spanTexto.textContent = tarefa.texto;

    conteudo.appendChild(spanTexto);

    // BOTÃO EXCLUIR
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "❌";
    botaoExcluir.classList.add("btn-excluir");

    botaoExcluir.addEventListener("click", function(){

        const confirmar = confirm("Deseja excluir esta tarefa?");

        if(confirmar){
            tarefas = tarefas.filter(t => t !== tarefa);
            salvarTarefas();
            novoCard.remove();
        }
    });

    // DRAG
    novoCard.addEventListener("dragstart", function(){
        variavelCardArrastado = novoCard;
    });

    // EDITAR (AGORA SÓ NO CONTEÚDO)
    conteudo.addEventListener("dblclick", function(){

        const textoAtual = spanTexto.textContent;
        const novoTexto = prompt("Editar a Tarefa:", textoAtual);

        if(novoTexto !== null){

            const textoTratado = novoTexto.trim();

            if(textoTratado !== ""){
                spanTexto.textContent = textoTratado;

                tarefa.texto = textoTratado;
                salvarTarefas();
            }
        }
    });

    // MONTAGEM
    novoCard.appendChild(conteudo);
    novoCard.appendChild(botaoExcluir);

    // INSERÇÃO
    if(tarefa.coluna === "a-fazer"){
        aFazer.appendChild(novoCard);
    } else if(tarefa.coluna === "fazendo"){
        fazendo.appendChild(novoCard);
    } else {
        concluido.appendChild(novoCard);
    }
}

// ================= CRIAR =================

function criarTarefa(){

    const textoTarefa = inputTarefa.value.trim();

    if(textoTarefa === ""){
        alert("Digite uma Tarefa");
        return;
    }

    const tarefa = {
        texto: textoTarefa,
        coluna: "a-fazer"
    };

    tarefas.push(tarefa);
    salvarTarefas();

    criarCard(tarefa);

    inputTarefa.value = "";
    inputTarefa.focus();
}

btnCriar.addEventListener("click", criarTarefa);

// ================= INIT =================

carregarTarefas();

tarefas.forEach(function(tarefa){
    criarCard(tarefa);
});