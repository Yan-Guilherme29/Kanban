// ==========================================
// Quadro Kanban - Projeto Web I
// Funcionalidades:
// - Criar tarefas
// - Arrastar tarefas entre colunas
// - Editar tarefas com duplo clique
// - Persistência com LocalStorage
// ==========================================

// Campo de entrada onde o usuário digita a tarefa
const inputTarefa = document.getElementById("input-tarefa");

// Botão que cria novas tarefas
const btnCriar = document.getElementById("btn-criar");

// Colunas do Quadro Kanban
const aFazer = document.getElementById("a-fazer");
const fazendo = document.getElementById("fazendo");
const concluido = document.getElementById("concluido");

// Armazena temporariamente o card que está sendo arrastado
let variavelCardArrastado = null;

// Array que armazena as tarefas
let tarefas = [];

// ==========================================
// LOCAL STORAGE
// ==========================================

// Salva as tarefas no navegador
function salvarTarefas(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Carrega as tarefas salvas
function carregarTarefas(){
    const dados = localStorage.getItem("tarefas");

    if(dados){
        tarefas = JSON.parse(dados);
    }
}

// ==========================================
// DRAG AND DROP
// ==========================================

// Permite que um elemento seja solto em uma coluna
function permitirDrop(event) {
    event.preventDefault();
}

// Configura os eventos de drag and drop para uma coluna
function configurarColuna(coluna){

    // Permite arrastar sobre a coluna
    coluna.addEventListener("dragover", permitirDrop);

    // Quando soltar o card na coluna
    coluna.addEventListener("drop", function(){

        coluna.appendChild(variavelCardArrastado);

        // Atualiza a coluna no array
        const texto = variavelCardArrastado.textContent;

        const tarefa = tarefas.find(t => t.texto === texto);

        if(tarefa){
            tarefa.coluna = coluna.id;
            salvarTarefas();
        }

        // Limpa variável
        variavelCardArrastado = null;
    });
}

// Aplica para todas as colunas
configurarColuna(aFazer);
configurarColuna(fazendo);
configurarColuna(concluido);

// ==========================================
// CRIAÇÃO DE CARDS
// ==========================================

// Cria um card baseado na tarefa
function criarCard(tarefa){

    const novoCard = document.createElement("div");

    novoCard.classList.add("card");
    novoCard.setAttribute("draggable", "true");

    novoCard.textContent = tarefa.texto;

    // Evento de arrastar
    novoCard.addEventListener("dragstart", function(){
        variavelCardArrastado = novoCard;
    });

    // Evento de editar (duplo clique)
    novoCard.addEventListener("dblclick", function(){

        const textoAtual = novoCard.textContent;
        const novoTexto = prompt("Editar a Tarefa: ", textoAtual);

        if(novoTexto !== null){

            const textoTratado = novoTexto.trim();

            if(textoTratado !== ""){
                novoCard.textContent = textoTratado;

                // Atualiza no array
                tarefa.texto = textoTratado;
                salvarTarefas();
            }
        }
    });

    // Adiciona na coluna correta
    if(tarefa.coluna === "a-fazer"){
        aFazer.appendChild(novoCard);
    } else if(tarefa.coluna === "fazendo"){
        fazendo.appendChild(novoCard);
    } else {
        concluido.appendChild(novoCard);
    }
}

// ==========================================
// CRIAR NOVA TAREFA
// ==========================================

function criarTarefa() {

    const textoTarefa = inputTarefa.value.trim();

    if(textoTarefa === "") {
        alert("Digite uma Tarefa ");
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

// Evento do botão
btnCriar.addEventListener("click", criarTarefa);

// ==========================================
// INICIALIZAÇÃO
// ==========================================

// Carrega tarefas salvas ao abrir a página
carregarTarefas();

// Renderiza todas as tarefas salvas
tarefas.forEach(function(tarefa){
    criarCard(tarefa);
});