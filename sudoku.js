const lista = [1,2,3,4,5,6,7,8,9]

const colunas = [
[0,9,18,27,36,45,54,63,72],
[1,10,19,28,37,46,55,64,73],
[2,11,20,29,38,47,56,65,74],
[3,12,21,30,39,48,57,66,75],
[4,13,22,31,40,49,58,67,76],
[5,14,23,32,41,50,59,68,77],
[6,15,24,33,42,51,60,69,78],
[7,16,25,34,43,52,61,70,79],
[8,17,26,35,44,53,62,71,80]
]

const linhas = [
[0,1,2,3,4,5,6,7,8],
[9,10,11,12,13,14,15,16,17],
[18,19,20,21,22,23,24,25,26],
[27,28,29,30,31,32,33,34,35],
[36,37,38,39,40,41,42,43,44],
[45,46,47,48,49,50,51,52,53],
[54,55,56,57,58,59,60,61,62],
[63,64,65,66,67,68,69,70,71],
[72,73,74,75,76,77,78,79,80]
]

const subgrades = [
[0,1,2,9,10,11,18,19,20],
[3,4,5,12,13,14,21,22,23],
[6,7,8,15,16,17,24,25,26],
[27,28,29,36,37,38,45,46,47],
[30,31,32,39,40,41,48,49,50],
[33,34,35,42,43,44,51,52,53],
[54,55,56,63,64,65,72,73,74],
[57,58,59,66,67,68,75,76,77],
[60,61,62,69,70,71,78,79,80]
]

var jogoativo = true

var nums = []
var casais = []
var vidas = 5

function gerarTabuleiro() {
    jogoativo = true
    vidas = 5
    const textin = document.querySelector("#textin")
    const tabuleiro = document.querySelector("#tabuleiro")
    const tab2 = document.querySelector("#tab2")
    const opcao = document.querySelector("#opcao")
    tab2.remove()
    const botao = document.querySelector("#button")
    const newtab2 = document.createElement("div")
    newtab2.id = 'tab2'
    tabuleiro.appendChild(newtab2)
    textin.style.display = 'flex'
    opcao.style.display = 'flex'
    tabuleiro.style.display = 'flex'
    casais = []
    for (let i = 0; i < 81; i++) {
        const novaDiv = document.createElement("div")
        novaDiv.className = 'casas'
        novaDiv.id = `casa${i}`
        newtab2.appendChild(novaDiv)
        novaDiv.addEventListener('click', () => tentativa(novaDiv))
        casais.push(novaDiv.id)
    }
    botao.innerHTML = `Desistir`
    gerarNumeros()
    
}

function tentativa(casa){
    if (jogoativo == false){
        return
    }
    var skibi = document.querySelector('input[name="numSelec"]:checked')
    if (!skibi){
        alert("Selecione uma opção!")
        return
    }

    if (casa.innerHTML != ''){
        return
    }
    const textin = document.querySelector("#textin")
    const botao = document.querySelector("#button")
    const skibiNum = skibi.value
    const casaid = casa.id

    const casinha = document.getElementById(casaid)
    const skibidi = casais.indexOf(casaid)

    if (nums[skibidi] == skibiNum){
        casinha.innerHTML = `${skibiNum}`
        const casinhas = document.querySelectorAll(".casas")
        const ganhouSera = Array.from(casinhas).every(guis => guis.innerHTML !== '')
        if (ganhouSera){
            casinhas.forEach(casa => {
                casa.style.background = "rgb(215, 255, 183)"
            })
            setTimeout(() =>  gerarNumeros(),1000)
            setTimeout(() =>  casinhas.forEach(casa => {
                casa.style.background  = ""
            }),1000)
        }
    } else{
        vidas = vidas-1
        if(vidas==0){
            textin.innerHTML = `Vidas: ${vidas}`
            alert("Você Perdeu todas as vidas! :(")
            botao.innerHTML = "Try again!"
            jogoativo = false
        }
        else{
            textin.innerHTML = `Vidas: ${vidas}`
            alert("Tentativa incorreta")
        }
    }
    console.log(skibidi, skibiNum)
}

function gerarNumeros() {
    var casas = document.querySelectorAll(".casas")
    let tentativas = 0;
    let sucesso = false;

    while (!sucesso && tentativas < 1000) {
        tentativas++;

        var numlinhas = Array.from({length: 9}, () => [...lista])
        var numcolunas = Array.from({length: 9}, () => [...lista])
        var numsubgrades = Array.from({length: 9}, () => [...lista])
        nums = []
        
        sucesso = true

        for (let i = 0; i < 81; i++) {
            let coluna = colunas.findIndex(alec => alec.includes(i));
            let linha = linhas.findIndex(g => g.includes(i));
            let subgrade = subgrades.findIndex(g => g.includes(i));

            let numposslinha = numlinhas[linha];
            let numposscoluna = numcolunas[coluna];
            let numposssubgrade = numsubgrades[subgrade];

            let comuns = numposslinha.filter(
                num => numposscoluna.includes(num) && numposssubgrade.includes(num)
            );

            if (comuns.length === 0) {
                sucesso = false
                break;
            }

            let numaleatorio = comuns[Math.floor(Math.random() * comuns.length)];

            numlinhas[linha].splice(numposslinha.indexOf(numaleatorio), 1);
            numcolunas[coluna].splice(numposscoluna.indexOf(numaleatorio), 1);
            numsubgrades[subgrade].splice(numposssubgrade.indexOf(numaleatorio), 1);
            nums.push(numaleatorio)
            casas[i].innerHTML = numaleatorio.toString();
        }
        
    }
    var casaprasumir = []
    console.log(nums)
    console.log(`Número de tentativas: ${tentativas}`)
    
    for (let i=0; i<39; i++){
        let idAleatorio = casais[Math.floor(Math.random() * casais.length)]
        while (casaprasumir.includes(idAleatorio)){
            idAleatorio = casais[Math.floor(Math.random() * casais.length)]
        }
        casaprasumir.push(idAleatorio)
        const casa = document.getElementById(idAleatorio)
        casa.innerHTML = ''
    }
    console.log(casaprasumir)

    if (!sucesso) {
        alert("Falha ao gerar tabuleiro. Tente novamente.")
        const botao = document.querySelector("#button")
        botao.innerHTML = "Jogar"
        textin.style.display = 'none'
        opcao.style.display = 'none'
        tabuleiro.style.display = 'none'
        return
    }

    
}
