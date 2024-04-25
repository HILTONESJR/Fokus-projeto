
// VARIAVEIS PARA INTERAÇÃO COM O DOCUMENTO HTML
const html = document.querySelector('html')

//VARIAVEIS DE BOTOES DA PAGINA
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')


//VARIAVEIS DE TEXTOS E IMAGENS DA PAGINA HTML
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const botaoInciar = document.querySelector('.app__card-primary-button')
const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const iconPlayPause = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')


//VARIAVEIS DE MUSICAS PARA O PROJETO
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const playBt = new Audio('./sons/play.wav')
const pauseBt = new Audio('./sons/pause.mp3')
const finish = new Audio('./sons/beep.mp3')


//VARIAVEL PARA QUANDO A MUSICA FOR ATIVADA REPITA UM LOOP INFINITO ATE ATINGIR O LIMITE DO TEMPORIZADOR
musica.loop = true


// VARIAVEL PARA CRIAR A FUNÇÃO DE TEMPO DECRESCENTE
let tempoDecorridoEmSegundos = 1500
let intervaloId = null

// CRIA UMA FUNÇÃO QUE AO MOVER O BOTAO INCIA E DESLIGA A MUSICA.
musicaFocoInput.addEventListener('change', ()=> {
    if(musica.paused) {
        musica.play()
    }else {
        musica.pause()
    }
})

// CRIA UMA FUNÇÃO PARA O BOTAO FOCO ALTERNE ENTRE O TEMA ACIONE UMA CLASSE E DEFINE O TEMPO PARA ABA FOCO
focoBt.addEventListener('click', ()=> {
   tempoDecorridoEmSegundos = 1500
   alterarContexto('foco')
   focoBt.classList.add('active')
})
// CRIA UMA FUNÇÃO PARA O BOTAO FOCO ALTERNE ENTRE O TEMA ACIONE UMA CLASSE E DEFINE O TEMPO PARA ABA DESCANSO CURTO
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})
// CRIA UMA FUNÇÃO PARA O BOTAO FOCO ALTERNE ENTRE O TEMA ACIONE UMA CLASSE E DEFINE O TEMPO PARA ABA DESCANSO LONGO
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})
// NESTA FUNÇÃO ALTERNA O CONTEXTO DE FUNDO, TEMAS CORES E IMAGENS, TITLE, CONOMETRO REMOVE CLASSES 
function alterarContexto(contexto){
    mostraTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
        titulo.innerHTML = `
        Otimize sua produtividade,<br>
        <strong class="app__title-strong">Mergulhe no que importa.</strong>`
            
            break;

            case "descanso-curto":
            titulo.innerHTML = `
            Que tal da uma respirada?,<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
        
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar a superficie.,<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
    
        default:
            break;
    }
}
// CRIA UMA FUNÇÃO PARA CONTAGENTE REGRESSIVA ADICIONA SOM AO TEMPORIZADOR ATINGIR O TEMPO LIMITE E ZERA O CRONOMETRO
const contagemRegressiva = ()=>{
    if (tempoDecorridoEmSegundos <= 0){
        finish.play()
        alert('Tempo Finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostraTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)
// CRIA A FUNÇÃO QUE AO CLICAR NO BOTAO INICIA O CONTADOR E TAMBEM A QUE PAUSA O CONTADOR ALTERNANDO O TEXTO DO BOTAO E SOMS EMITIDOS AO CLICAR
function iniciarOuPausar() {
    if(intervaloId){
        
        pauseBt.play()
        zerar()
        return
    }
    playBt.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iconPlayPause.setAttribute('src', './imagens/pause.png')
}
//CRIA A FUNÇÃO QUE ZERA O CRONOMETRO E ALTERA O TEXTO DO BOTAO INICIAR E ICONE AO PAUSAR
function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Iniciar"
    iconPlayPause.setAttribute('src', './imagens/play_arrow.png')
    intervaloId = null
}
//CRIA A FUNÇÃO QUE DEFINE O FORMATO DO CONTADOR EXIBIDO NA TELA.
function mostraTempo (){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
//CHAMA A FUNÇÃO NO ESCOPO GLOBAL.
mostraTempo()