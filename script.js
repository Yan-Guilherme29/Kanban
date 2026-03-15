// ==========================================
// Quadro Kanban - Projeto Web I
// Funcionalidades:
// - Criar tarefas
// - Arrastar tarefas entre colunas
// - Editar tarefas com duplo clique
// ==========================================

// Campo de entrada onde o usuário digita a tarefa
const inputTarefa = document.getElementById("input-tarefa");

// botão que cria novas tarefas
const btnCriar = document.getElementById("btn-criar");

// Colunas do Quadro Kanban
const aFazer = document.getElementById("a-fazer");
const fazendo = document.getElementById("fazendo")
const concluido = document.getElementById("concluido")

// Armazena temporariamente o card que está sendo arrastado
let variavelCardArrastado = null

//Permite que um elemento seja solto em uma coluna
function permitirDrop(event) {
    event.preventDefault();
}

// Configura os eventos de drag and drop para uma coluna
function configurarColuna(coluna){

    // Permite que o card seja arrastado
    coluna.addEventListener("dragover", permitirDrop)

    // Quando o card for solto em uma coluna
    coluna.addEventListener("drop", function(){

    // Move o card para coluna atual
    coluna.appendChild(variavelCardArrastado)

    //Limpa a variável do card
    variavelCardArrastado = null

    })
}

// Aplica as configurações para cada coluna
configurarColuna(aFazer);
configurarColuna(fazendo);
configurarColuna(concluido);

// Função que cria um novo card no quadro
function criarTarefa() {

    // Remove espaços extras do texto digitado
    const textoTarefa = inputTarefa.value.trim();

    // Verifica se o campo está vazio
    if(textoTarefa === "") {
        alert("Digite uma Tarefa ")
        return
    }

    // Cria um novo elemento div que representará o card
    const novoCard = document.createElement("div");

    // Adiciona classe CSS do card
    novoCard.classList.add("card");

    // Permite que o card seja arrastado
    novoCard.setAttribute("draggable", "true");

    // Evento disparado quando o card começa a ser arrastado
    novoCard.addEventListener("dragstart", function() {

    // Guarda o card que está sendo arrastado
    variavelCardArrastado = novoCard

    })

    // Permite editar o texto do card com duplo clique
    novoCard.addEventListener("dblclick", function(){

    // Texto atual do card
    const textoAtual = novoCard.textContent

    // Abre prompt permitindo editar o texto
    const novoTexto = prompt("Editar a Tarefa: ", textoAtual)

    // Verifica se o usuário não cancelou o prompt
    if(novoTexto !== null){

         // Remove espaços extras do texto digitado
        const textoTratado = novoTexto.trim()

         // Atualiza o card apenas se o texto não estiver vazio
        if(textoTratado !== ""){
            novoCard.textContent = textoTratado
        }
    }
})

    // Define o texto inicial do card
    novoCard.textContent = textoTarefa

    // Adiciona o card na coluna "A Fazer"
    aFazer.appendChild(novoCard)

    // Limpa o campo de entrada
    inputTarefa.value = ""

    // Retorna o foco para o campo de texto
    inputTarefa.focus()

}

// Ao clicar no botão, cria uma nova tarefa
btnCriar.addEventListener("click", criarTarefa);