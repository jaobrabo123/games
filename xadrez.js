var casasId = []
var casasPeca = []

document.addEventListener("DOMContentLoaded", function () {
    const tabuleiro = document.querySelector("#tabuleiro")
    for (let i = 0; i < 64; i++) {
        const novaDiv = document.createElement("div")
        let u = i
        novaDiv.className = 'casas'
        novaDiv.id = `casa${i}` 
        tabuleiro.appendChild(novaDiv)
        if (Math.floor(i / 8)==1||Math.floor(i / 8)==3||Math.floor(i / 8)==5||Math.floor(i / 8)==7){
            u++
        }
        if (u%2!=0){
            novaDiv.style.background = 'rgb(0, 128, 167)'
        }else{
            novaDiv.style.background = 'white'
        }
        novaDiv.addEventListener('click', () => jogada(novaDiv.id))
        novaDiv.addEventListener('contextmenu', (alec) => {
            alec.preventDefault();
            alert("click2")
        });
        casasId.push(novaDiv.id)
    }
    const casas = document.querySelectorAll(".casas")
    casas.forEach((azevedo, index) => {
        if(Math.floor(index/8)==1){
            azevedo.innerHTML = '<i class="fa-solid fa-chess-pawn" style="color: black;"></i>' //peões pretos
            casasPeca[index] = 2
        } else if(Math.floor(index/8)==6){
            azevedo.innerHTML = '<i class="fa-solid fa-chess-pawn" style="color:rgb(177, 177, 177);"></i>' //peões brancos
            casasPeca[index] = 1
        } else if([0, 7].includes(index)){
            azevedo.innerHTML = '<i class="fa-solid fa-chess-rook" style="color: black;"></i>' //torres pretas
            casasPeca[index] = 4
        } else if([56, 63].includes(index)){
            azevedo.innerHTML = '<i class="fa-solid fa-chess-rook" style="color: rgb(177, 177, 177);"></i>' //torres brancas
            casasPeca[index] = 3
        } else if([2, 5].includes(index)){
            azevedo.innerHTML = '<i class="fa-solid fa-chess-knight" style="color: black;"></i>' //cavalos pretos
            casasPeca[index] = 6
        } else if([58, 61].includes(index)){
            azevedo.innerHTML = '<i class="fa-solid fa-chess-knight" style="color: rgb(177, 177, 177);";"></i>'  //cavalos brancos
            casasPeca[index] = 5
        } else if([1, 6].includes(index)){
            azevedo.innerHTML = '<i class="fa-solid fa-chess-bishop" style="color: black;"></i>' //bispos pretos
            casasPeca[index] = 8
        } else if([57, 62].includes(index)){
            azevedo.innerHTML = '<i class="fa-solid fa-chess-bishop" style="color: rgb(177, 177, 177);"></i>' //bispos brancos
            casasPeca[index] = 7
        } else if(index==4){
            azevedo.innerHTML = '<i class="fa-solid fa-chess-king" style="color: black;"></i>'  //rei preto
            casasPeca[index] = 10
        } else if(index==60){
            azevedo.innerHTML = '<i class="fa-solid fa-chess-king" style="color: rgb(177, 177, 177);"></i>'  //rei branco
            casasPeca[index] = 9
        } else if(index==3){
            azevedo.innerHTML = '<i class="fa-solid fa-chess-queen" style="color: black;"></i>'  //dama preta
            casasPeca[index] = 12
        } else if(index==59){
            azevedo.innerHTML = '<i class="fa-solid fa-chess-queen" style="color: rgb(177, 177, 177);"></i>'  //dama branca
            casasPeca[index] = 11
        }
    })
})

function jogada(casa) {
    if(document.querySelector(`#${casa}`).innerHTML==''){
        return
    }
    const indexCasa = casasId.indexOf(casa)
    var pecaCasa = casasPeca[indexCasa]
    console.log(indexCasa,pecaCasa)
}