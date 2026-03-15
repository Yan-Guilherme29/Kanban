const inputTarefa = document.getElementById("input-tarefa");

const btnCriar = document.getElementById("btn-criar");

const aFazer = document.getElementById("a-fazer");

const fazendo = document.getElementById("fazendo")

const concluido = document.getElementById("concluido")

aFazer.addEventListener("dragover", function(event){
    event.preventDefault()
})

fazendo.addEventListener("dragover", function(event){
    event.preventDefault()
})

concluido.addEventListener("dragover", function(event){
    event.preventDefault()
})

btnCriar.addEventListener("click", criarTarefa);

let variavelCardArrastado = null

function criarTarefa() {

    const textoTarefa = inputTarefa.value.trim();

    if(textoTarefa === "") {
        alert("Digite uma Tarefa ")
        return
    }

    const novoCard = document.createElement("div");

    novoCard.classList.add("card");
    novoCard.setAttribute("draggable", "true");

    novoCard.addEventListener("dragstart", function() {

    variavelCardArrastado = novoCard
    console.log("Arrastando: " + variavelCardArrastado)

    })

    novoCard.textContent = textoTarefa

    aFazer.appendChild(novoCard)

    inputTarefa.value = ""

    inputTarefa.focus()

}
