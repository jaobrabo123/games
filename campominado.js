var casasID = []
var gerarBombas = true
var botarBandeira = false
var totBombs = 0
var flags
var valores = []

document.addEventListener("DOMContentLoaded", function () {
    const areaCampo = document.querySelector("#areaCampo")
    const campo = document.querySelector("#campo")
    areaCampo.appendChild(campo)
    campo.style.gridTemplateColumns = `repeat(16, 30px)`;
    campo.style.gridTemplateRows = `repeat(16, 30px)`;
    for (let i = 0; i < 256; i++) {
        const novaDiv = document.createElement("div")
        novaDiv.className = 'casas'
        novaDiv.id = `casa${i}` 
        campo.appendChild(novaDiv)
        novaDiv.addEventListener('click', () => bombas(256,novaDiv.id))
        novaDiv.addEventListener('contextmenu', (alec) => {
            alec.preventDefault(); // Previne o menu padrão
            bandeira(novaDiv);
        });
        casasID.push(novaDiv.id)
    }
});

function verificaOpcao(select){
    const areaCampo = document.querySelector("#areaCampo")
    const campo = document.querySelector("#campo")
    const contador = document.querySelector("#contador")
    campo.remove()
    const newCampo = document.createElement("div")
    newCampo.id = "campo"
    areaCampo.appendChild(newCampo)
    const dif = Number(select.value)
    var numCasas = 0
    botarBandeira = false
    switch (dif) {
        case 1:
            numCasas = 81
            newCampo.style.gridTemplateColumns = `repeat(9, 30px)`
            newCampo.style.gridTemplateRows = `repeat(9, 30px)`
            contador.textContent = `Bombas: 10`
            break;
        case 2:
            numCasas = 256
            newCampo.style.gridTemplateColumns = `repeat(16, 30px)`;
            newCampo.style.gridTemplateRows = `repeat(16, 30px)`;
            contador.textContent = `Bombas: 40`
            break;
        case 3:
            numCasas = 480
            newCampo.style.gridTemplateColumns = `repeat(30, 30px)`;
            newCampo.style.gridTemplateRows = `repeat(16, 30px)`;
            contador.textContent = `Bombas: 99`
            break;
    }
    
    casasID = []
    gerarBombas = true
    for (let i = 0; i < numCasas; i++) {
        const novaDiv = document.createElement("div")
        novaDiv.className = 'casas'
        novaDiv.id = `casa${i}` 
        newCampo.appendChild(novaDiv)
        novaDiv.addEventListener('click', () => bombas(numCasas,novaDiv.id))
        novaDiv.addEventListener('contextmenu', (alec) => {
            alec.preventDefault(); // Previne o menu padrão
            bandeira(novaDiv);
        });
        casasID.push(novaDiv.id)
    }
}

function reset(){
    verificaOpcao(document.querySelector("#dificuldade"))
}

function bandeira(casa){
    if(!botarBandeira){
        return
    }
    const contador = document.querySelector("#contador")
    if (casa.innerHTML == `<i class="fa-solid fa-flag"></i>`) {
        casa.innerHTML = "";
        flags++
        contador.textContent = `Bombas: ${flags}`
    } else if (casa.innerHTML == ""){
        flags--
        if (flags<0){
            flags++
            return;
        }
        casa.innerHTML = `<i class="fa-solid fa-flag"></i>`;
        contador.textContent = `Bombas: ${flags}`
    }
}

function bombas(numCasas, casablock){
    if(!gerarBombas){
        tentativa(casablock)
        return
    }
    gerarBombas = false
    botarBandeira = true
    const casas = document.querySelectorAll(".casas")
    var emvolta = []
    totBombs = 0
    valores = Array(casasID.length).fill(0);
    switch (numCasas) {
        case 81:
            totBombs = 10
            emvolta = [-10,-9,-8,-1,1,8,9,10] //Casas em volta pra verificar quantas bombas tem perto
            break;
        case 256:
            totBombs = 40
            emvolta = [-17,-16,-15,-1,1,15,16,17] //Casas em volta pra verificar quantas bombas tem perto
            break;
        case 480:
            totBombs = 99
            emvolta = [-31,-30,-29,-1,1,29,30,31] //Casas em volta pra verificar quantas bombas tem perto
            break;
    }
    flags = totBombs
    nums = []
    for (let i = 0; i < totBombs; i++) {
        let numaleatorio = casasID[Math.floor(Math.random() * numCasas)];
        while (nums.includes(numaleatorio)||numaleatorio==casablock){
            numaleatorio = casasID[Math.floor(Math.random() * numCasas)]
        }
        nums.push(numaleatorio)
    }
    nums.forEach(casaId => {
        const index = casasID.indexOf(casaId);
        valores[index] = 10; // Marca como bomba
    })
    
    for(let i = 0; i<casas.length; i++){
        if (valores[i]!==10){
            var bombasEmVolta = 0
            emvolta.forEach(element => {
                if(valores[i+element]==10){
                    bombasEmVolta++
                }
            })
            valores[i] = bombasEmVolta
        }
    }
    console.log(valores)
}

function tentativa(casa){
    var revelar = casasID.indexOf(casa)
    document.querySelector(`#${casa}`).innerHTML = valores[revelar]
}