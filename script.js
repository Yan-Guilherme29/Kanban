// ==========================================
// Quadro Kanban - Projeto Web I
// ==========================================

// Campo de entrada
const inputTarefa = document.getElementById("input-tarefa");

// Botão de criar tarefa
const btnCriar = document.getElementById("btn-criar");

// Colunas
const aFazer = document.getElementById("a-fazer");
const fazendo = document.getElementById("fazendo");
const concluido = document.getElementById("concluido");

// Armazena o card sendo arrastado
let variavelCardArrastado = null;


// Permite soltar o card
function permitirDrop(event) {
    event.preventDefault();
}


// Configura drag and drop para cada coluna
function configurarColuna(coluna){

    coluna.addEventListener("dragover", permitirDrop);

    coluna.addEventListener("drop", function(){

        if (variavelCardArrastado) {
            coluna.appendChild(variavelCardArrastado);
            variavelCardArrastado = null;
        }

    });
}

// Aplica configuração nas colunas
configurarColuna(aFazer);
configurarColuna(fazendo);
configurarColuna(concluido);


// Função para criar tarefas
function criarTarefa() {

    const textoTarefa = inputTarefa.value.trim();

    if(textoTarefa === "") {
        alert("Digite uma Tarefa");
        return;
    }

    // Cria o card
    const novoCard = document.createElement("div");
    novoCard.classList.add("card");
    novoCard.setAttribute("draggable", "true");

    // Evento de arrastar
    novoCard.addEventListener("dragstart", function() {
        variavelCardArrastado = novoCard;
    });

    // Evento de editar com duplo clique
    novoCard.addEventListener("dblclick", function(){

        const textoAtual = novoCard.textContent.replace("❌", "").trim();
        const novoTexto = prompt("Editar a Tarefa: ", textoAtual);

        if(novoTexto !== null){

            const textoTratado = novoTexto.trim();

            if(textoTratado !== ""){
                novoCard.firstChild.textContent = textoTratado + " ";
            }
        }
    });

    // Texto do card
    const spanTexto = document.createElement("span");
    spanTexto.textContent = textoTarefa + " ";

    // Botão de excluir
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "❌";

    botaoExcluir.addEventListener("click", function(){

    const confirmar = confirm("Deseja excluir esta tarefa?")

    if (confirmar) {
        novoCard.remove();
    }

});

    // Montagem do card
    novoCard.appendChild(spanTexto);
    novoCard.appendChild(botaoExcluir);

    // Adiciona na coluna A Fazer
    aFazer.appendChild(novoCard);

    // Limpa input
    inputTarefa.value = "";
    inputTarefa.focus();
}


// Evento do botão criar
btnCriar.addEventListener("click", criarTarefa);