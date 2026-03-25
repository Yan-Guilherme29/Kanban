// ==========================================
// VARIÁVEIS
// ==========================================
const inputTarefa = document.getElementById("input-tarefa");
const btnCriar = document.getElementById("btn-criar");

const aFazer = document.getElementById("a-fazer");
const fazendo = document.getElementById("fazendo");
const concluido = document.getElementById("concluido");

let variavelCardArrastado = null;
let tarefas = [];


// ==========================================
// STORAGE
// ==========================================
function salvarTarefas(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas(){
    const dados = localStorage.getItem("tarefas");

    if(dados){
        tarefas = JSON.parse(dados);
    }
}


// ==========================================
// DRAG AND DROP
// ==========================================
function permitirDrop(event) {
    event.preventDefault();
}

function configurarColuna(coluna){
    coluna.addEventListener("dragover", permitirDrop);

    coluna.addEventListener("drop", function(){

        if (variavelCardArrastado) {

            coluna.appendChild(variavelCardArrastado);

            const texto = variavelCardArrastado.textContent
                .replace("❌", "")
                .trim();

            const novaColuna = coluna.id;

            const tarefa = tarefas.find(function(t){
                return t.texto === texto;
            });

            if (tarefa) {
                tarefa.coluna = novaColuna;
                salvarTarefas();
            }

            variavelCardArrastado = null;
        }

    });
}

configurarColuna(aFazer);
configurarColuna(fazendo);
configurarColuna(concluido);


// ==========================================
// FUNÇÃO PRINCIPAL DE CRIAR CARD
// ==========================================
function criarCard(texto, colunaId){

    const novoCard = document.createElement("div");
    novoCard.classList.add("card");
    novoCard.setAttribute("draggable", "true");

    // DRAG
    novoCard.addEventListener("dragstart", function(){
        variavelCardArrastado = novoCard;
    });

    // EDITAR
    novoCard.addEventListener("dblclick", function(){

        const textoAtual = texto;
        const novoTexto = prompt("Editar a Tarefa:", textoAtual);

        if(novoTexto !== null){
            const textoTratado = novoTexto.trim();

            if(textoTratado !== ""){

                // Atualiza visual
                spanTexto.textContent = textoTratado + " ";

                // Atualiza no array
                const tarefa = tarefas.find(t => t.texto === texto);
                if(tarefa){
                    tarefa.texto = textoTratado;
                    salvarTarefas();
                }
            }
        }
    });

    // TEXTO
    const spanTexto = document.createElement("span");
    spanTexto.textContent = texto + " ";

    // BOTÃO EXCLUIR
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "❌";

    botaoExcluir.addEventListener("click", function(){

        const confirmar = confirm("Deseja excluir esta tarefa?");

        if(confirmar){

            // Remove do array
            tarefas = tarefas.filter(function(t){
                return t.texto !== texto;
            });

            salvarTarefas();

            // Remove da tela
            novoCard.remove();
        }
    });

    // MONTAGEM
    novoCard.appendChild(spanTexto);
    novoCard.appendChild(botaoExcluir);

    // ADICIONA NA COLUNA
    document.getElementById(colunaId).appendChild(novoCard);
}


// ==========================================
// CRIAR TAREFA
// ==========================================
function criarTarefa() {

    const textoTarefa = inputTarefa.value.trim();

    if(textoTarefa === "") {
        alert("Digite uma Tarefa");
        return;
    }

    const tarefa = {
        texto: textoTarefa,
        coluna: "a-fazer"
    };

    tarefas.push(tarefa);
    salvarTarefas();

    criarCard(textoTarefa, "a-fazer");

    inputTarefa.value = "";
    inputTarefa.focus();
}


// ==========================================
// CARREGAR AO INICIAR
// ==========================================
carregarTarefas();

tarefas.forEach(function(tarefa){
    criarCard(tarefa.texto, tarefa.coluna);
});


// ==========================================
// EVENTO BOTÃO
// ==========================================
btnCriar.addEventListener("click", criarTarefa);