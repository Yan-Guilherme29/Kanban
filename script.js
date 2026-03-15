const inputTarefa = document.getElementById("input-tarefa");

const btnCriar = document.getElementById("btn-criar");

const aFazer = document.getElementById("a-fazer");

const fazendo = document.getElementById("fazendo")

const concluido = document.getElementById("concluido")

let variavelCardArrastado = null

function permitirDrop(event) {
    event.preventDefault();
}

function configurarColuna(coluna){
    coluna.addEventListener("dragover", permitirDrop)

    coluna.addEventListener("drop", function(){

    coluna.appendChild(variavelCardArrastado)
    variavelCardArrastado = null

    })
}

configurarColuna(aFazer);
configurarColuna(fazendo);
configurarColuna(concluido);

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

    novoCard.addEventListener("dblclick", function(){

    const textoAtual = novoCard.textContent
    const novoTexto = prompt("Editar a Tarefa: ", textoAtual)

    if(novoTexto !== null){

        const textoTratado = novoTexto.trim()

        if(textoTratado !== ""){
            novoCard.textContent = textoTratado
        }
    }
})

    novoCard.textContent = textoTarefa

    aFazer.appendChild(novoCard)

    inputTarefa.value = ""

    inputTarefa.focus()

}

btnCriar.addEventListener("click", criarTarefa);
