const casas = document.querySelectorAll(".casas")
const vez = document.querySelector("#vez")
const casa1 = document.querySelector("#casa1")
const casa2 = document.querySelector("#casa2")
const casa3 = document.querySelector("#casa3")
const casa4 = document.querySelector("#casa4")
const casa5 = document.querySelector("#casa5")
const casa6 = document.querySelector("#casa6")
const casa7 = document.querySelector("#casa7")
const casa8 = document.querySelector("#casa8")
const casa9 = document.querySelector("#casa9")
const resultado = document.querySelector("#resultado")
var pontuacaoX = 0
var pontuacaoO = 0
var jogoAtivo = true

function jogar(casa) {
    if (!jogoAtivo) return;

    if (casas[casa].textContent !== ""){
        return;
    }
    
    var vezvalor = vez.textContent
    if (vezvalor === "Vez do X"){
        casas[casa].innerHTML = "X"
        vez.innerHTML = "Vez do O"
    } else{
        casas[casa].innerHTML = "O"
        vez.innerHTML = "Vez do X"
    }
    resultado.style.display = 'none'

    const poss1 = [casa1.textContent, casa2.textContent, casa3.textContent]
    const poss2 = [casa4.textContent, casa5.textContent, casa6.textContent]
    const poss3 = [casa7.textContent, casa8.textContent, casa9.textContent]
    const poss4 = [casa1.textContent, casa4.textContent, casa7.textContent]
    const poss5 = [casa2.textContent, casa5.textContent, casa8.textContent]
    const poss6 = [casa3.textContent, casa6.textContent, casa9.textContent]
    const poss7 = [casa1.textContent, casa5.textContent, casa9.textContent]
    const poss8 = [casa3.textContent, casa5.textContent, casa7.textContent]

    if(poss1[0] !== "" && Array.from(poss1).every(guis => guis === poss1[0])){
        jogoAtivo = false
        setTimeout(vitoria,700)
    } else if(poss2[0] !== "" && Array.from(poss2).every(casinha => casinha === poss2[0])){
        jogoAtivo = false
        setTimeout(vitoria,700)
    } else if (poss3[0] !== "" && Array.from(poss3).every(casinha => casinha === poss3[0])){
        jogoAtivo = false
        setTimeout(vitoria,700)
    } else if (poss4[0] !== "" && Array.from(poss4).every(casinha => casinha === poss4[0])){
        jogoAtivo = false
        setTimeout(vitoria,700)
    } else if (poss5[0] !== "" && Array.from(poss5).every(casinha => casinha === poss5[0])){
        jogoAtivo = false
        setTimeout(vitoria,700)
    } else if (poss6[0] !== "" && Array.from(poss6).every(casinha => casinha === poss6[0])){
        jogoAtivo = false
        setTimeout(vitoria,700)
    } else if (poss7[0] !== "" && Array.from(poss7).every(casinha => casinha === poss7[0])){
        jogoAtivo = false
        setTimeout(vitoria,700)
    } else if (poss8[0] !== "" && Array.from(poss8).every(casinha => casinha === poss8[0])){
        jogoAtivo = false
        setTimeout(vitoria,700)
    } else if (Array.from(casas).every(casa => casa.textContent !== "")){
        jogoAtivo = false
        setTimeout(()=>{
            casas.forEach(element => {
            element.innerHTML = ''
            })
            vez.innerHTML = "Vez do X"
            resultado.style.display = 'flex'
            resultado.innerHTML = "Deu velha!"
            jogoAtivo = true
            return;
        },700)
    }
}

function vitoria(){
    var vezvalor = vez.textContent
    var ganhador = vezvalor == "Vez do O" ? "X" : "O";
    if(vezvalor == "Vez do O"){
        pontuacaoX++
    } else{
        pontuacaoO++
    }
    document.querySelector("#placar").innerHTML = `Placar: ${pontuacaoX} x ${pontuacaoO}`
    casas.forEach(guis => {
    guis.innerHTML = ''
    })
    vez.innerHTML = "Vez do X"
    resultado.style.display = 'flex'
    resultado.innerHTML = `"${ganhador}" ganhou!`
    jogoAtivo = true
}