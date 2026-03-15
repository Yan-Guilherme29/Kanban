const inputTarefa = document.getElementById("input-tarefa");

const btnCriar = document.getElementById("btn-criar");

const aFazer = document.getElementById("a-fazer");

btnCriar.addEventListener("click", criarTarefa);



function criarTarefa() {

    const textoTarefa = inputTarefa.value.trim();

    if(textoTarefa === "") {
        alert("Digite uma Tarefa ")
        return
    }

    const novoCard = document.createElement("div");

    novoCard.classList.add("card")

    novoCard.textContent = textoTarefa

    aFazer.appendChild(novoCard)

    inputTarefa.value = ""

    inputTarefa.focus()

}
