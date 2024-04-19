//definimos variables que usaremos como "banderas" para el funcionamiento del memorama

let tarjetasDestapadas = 0;

let tarjeta1 = null;
let tarjeta2 = null;

let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let tiempoElegido = 50;
let timer = tiempoElegido;
let timerInicial = timer;
let tiempoRegresivoId = null;

let temporizadorPausa = false;
let contadorActivo = false;

//sonidos

let winAudio = new Audio('sounds/win.wav');
let loseAudio = new Audio('sounds/lose.wav');
let wrongAudio = new Audio('sounds/wrong.wav');
let clickAudio = new Audio('sounds/click.wav');
let rigthAudio = new Audio('sounds/rigth.wav');
let restartAudio = new Audio('sounds/restart.wav');

//seleccion de elementos html a usar

let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');
let segundos = document.querySelector('.segundos');
let botonRepetir = document.querySelector('.boton-repetir');
let textoRepetir = document.querySelector('.texto-repetir');
let cartaModalPoker = document.querySelector('.carta-modal-poker');
let cartaModalFruta = document.querySelector('.carta-modal-fruta');
let cartaModalNumero = document.querySelector('.carta-modal-numero');

//logica del memorama

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});



segundos.innerHTML = timer;

let imagenInicioCarta = document.querySelectorAll('.imagen-inicio-carta');

let cartaElegida = "poker";

cartaModalPoker.addEventListener('click', ()=>{
    clearInterval(tiempoRegresivoId);
    cartaElegida = "poker";
    repetir();
    retirarModalCartas();
    imagenInicioCarta.forEach(cartas => {
        cartas.style.backgroundImage = 'url(cartas-inicio/carta-poker.png)';
    });
});

cartaModalFruta.addEventListener('click', ()=>{
    clearInterval(tiempoRegresivoId);
    cartaElegida = "fruta";
    repetir();
    retirarModalCartas();
    imagenInicioCarta.forEach(cartas => {
        cartas.style.backgroundImage = 'url(cartas-inicio/carta-fruta.png)';
    });
});

cartaModalNumero.addEventListener('click', ()=>{
    clearInterval(tiempoRegresivoId);
    cartaElegida = "numero";
    repetir();
    retirarModalCartas();
    imagenInicioCarta.forEach(cartas => {
        cartas.style.backgroundImage = 'url(cartas-inicio/carta-numero.png)';
    });
});

let opcionesTiempo = document.querySelector('.opciones-tiempo');
let modalTiempo = document.querySelector('.modal-tiempo');

let tiempoModal30 = document.querySelector('.tiempo-modal-30');
let tiempoModal40 = document.querySelector('.tiempo-modal-40');
let tiempoModal50 = document.querySelector('.tiempo-modal-50');


function actualizarTiempoElegido(valorTiempo) {
    tiempoElegido = valorTiempo;
    timer = tiempoElegido;
    segundos.innerHTML = timer;
}

tiempoModal30.addEventListener('click', ()=>{
    actualizarTiempoElegido(30);
    retirarModalTiempo();
    clearInterval(tiempoRegresivoId);
    repetir();
});

tiempoModal40.addEventListener('click', ()=>{
    actualizarTiempoElegido(40);
    retirarModalTiempo();
    clearInterval(tiempoRegresivoId);
    repetir();
});

tiempoModal50.addEventListener('click', ()=>{
    actualizarTiempoElegido(50);
    retirarModalTiempo();
    clearInterval(tiempoRegresivoId);
    repetir();
});

opcionesTiempo.addEventListener('click', () => {
    
    if(!modalTiempo.classList.contains('modal-bajar-activado')){
        modalTiempo.classList.add('modal-bajar-activado');
        bloqueadorModal.classList.add('bloqueador-modal-activado');
    }

    bloqueadorModal.addEventListener('click', ()=>{

        if(modalTiempo.classList.contains('modal-bajar-activado')){
            retirarModalTiempo();
        }
    });

});


function retirarModalTiempo() {
    modalTiempo.classList.remove('modal-bajar-activado');
    bloqueadorModal.classList.remove('bloqueador-modal-activado');
}




function contartiempo(){

    clearInterval(tiempoRegresivoId);
    
    tiempoRegresivoId = setInterval(() => {
        
        if(temporizadorPausa == true){
            timer  --;
            mostrarTiempo.innerHTML = `Tiempo: ${timer} Segundos`;
           
        }

        tiempoSeAcabo();
        
    }, 1000);
}

function tiempoSeAcabo(){
            
    if(timer < 0){
        
        clearInterval(tiempoRegresivoId);
        mostrarTiempo.innerHTML = `!Se acabo el Tiempo¡ No lograstes terminar`;
        
        bloquearTarjetas();

        temporizadorPausa = false;
        
        loseAudio.play();
        
        botonRepetir.style.animationName = 'animacion-boton-repetir';
        textoRepetir.style.animationName = 'x';

        setTimeout(() => {
            textoRepetir.style.animationName = 'presionar-boton';
        }, 3000);

        if (tarjeta2 !== null) {
            setTimeout(() => {
              if (tarjeta2.disabled = true) {
                bloquearTarjetas();
              }
            }, 1005);
        }

    }

}



function bloquearTarjetas(){
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.style.backgroundImage = `url('cartas/${numeros[i]}-${cartaElegida}.png')`;
        tarjetaBloqueada.disabled = true;
    }
}



function repetir() {


    restartAudio.play();

    tarjetasDestapadas = 0;
        
    tarjeta1 = null;
    tarjeta2 = null;

    primerResultado = null;
    segundoResultado = null;
    movimientos = 0;
    aciertos = 0;
    temporizador = false;
    timer = tiempoElegido;
    timerInicial = timer;
    tiempoRegresivoId = null;
        
    temporizadorPausa = false;

    if(temporizadorPausa == false){
        let tocar = document.querySelector('.tocar');
        tocar.style.opacity = '1';
        tocar.style.animationName = 'presionar-boton';
    }
       

    numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
    numeros = numeros.sort(()=>{return Math.random()-0.5});
        
        

    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} Segundos`;

    clearInterval(tiempoRegresivoId);

    
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.style.backgroundImage = `url('cartas-inicio/carta-${cartaElegida}.png')`;
        tarjetaBloqueada.disabled = false;
    }

    let textoCartaReiniciadas = document.querySelector('.texto-cartas-reiniciadas');

    textoCartaReiniciadas.style.animationName = 'animacion-texto-reiniciadas';

    setTimeout(() => {
        textoCartaReiniciadas.style.animationName = 'x';
    }, 2000);
    
}



botonRepetir.addEventListener('click', ()=>{
    clearInterval(tiempoRegresivoId);
    repetir();
});
    




function destapar(id) {

    if(temporizador == false){
        contartiempo();
        temporizador = true;
    }

    temporizadorPausa = true;

    tarjetasDestapadas++;
   
    
    if(tarjetasDestapadas == 1){
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.style.backgroundImage = `url('cartas/${primerResultado}-${cartaElegida}.png')`;
        clickAudio.play();

        tarjeta1.disabled = true;


        let tocar = document.querySelector('.tocar');
        tocar.style.opacity = '0';
        tocar.style.animationName = 'x';
        
        

    }else if(tarjetasDestapadas == 2){
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.style.backgroundImage = `url('cartas/${segundoResultado}-${cartaElegida}.png')`;

        tarjeta2.disabled = true;

        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            tarjetasDestapadas = 0;

            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            rigthAudio.play();

            let uno = document.querySelector('.uno');
            
            uno.style.animationName = 'correcto-error';

            setTimeout(() => {
                uno.style.animationName = '';
            }, 1001);

            if(aciertos == 8){
                winAudio.play();
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}  <img src="diseños/check-estadisticas.png" alt="" class="imagen-check"; >`;
                mostrarTiempo.innerHTML = `!Que Bien¡ solo tardastes ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}  <img src="diseños/check-estadisticas.png" alt="" class="imagen-check"; >`;

                let check = document.querySelector('.check');
            
                check.style.animationName = 'correcto-error';

                setTimeout(() => {
                    check.style.animationName = '';
                }, 1001);
            }

        }else{
            wrongAudio.play();
            setTimeout(() => {
                tarjeta1.style.backgroundImage = `url('cartas-inicio/carta-${cartaElegida}.png')`;
                tarjeta2.style.backgroundImage = `url('cartas-inicio/carta-${cartaElegida}.png')`;
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
                
            }, 1000);

            let error = document.querySelector('.error');
            
            error.style.animationName = 'correcto-error';

            setTimeout(() => {
                error.style.animationName = '';
            }, 1001);
        }
    }
}


let botonOpciones = document.querySelector('.boton-opciones');
let barraDeOpciones = document.querySelector('.barra-de-opciones');


botonOpciones.addEventListener('click', ()=>{
    if(!barraDeOpciones.classList.contains('barra-de-opciones-activada')){
        barraDeOpciones.classList.add('barra-de-opciones-activada');
        botonOpciones.classList.add('boton-opciones-activado');
    }else if(barraDeOpciones.classList.contains('barra-de-opciones-activada')){
        barraDeOpciones.classList.remove('barra-de-opciones-activada');
        botonOpciones.classList.remove('boton-opciones-activado');
    }
});


//Opciones de las cartas

const opcionesCartas = document.querySelector('.opciones-cartas');
const modalCartas = document.querySelector('.modal-cartas');
const bloqueadorModal = document.querySelector('.bloqueador-modal');


opcionesCartas.addEventListener('click', () => {
    
    if(!modalCartas.classList.contains('modal-bajar-activado')){
        modalCartas.classList.add('modal-bajar-activado');
        bloqueadorModal.classList.add('bloqueador-modal-activado');
    }

    bloqueadorModal.addEventListener('click', ()=>{

        if(modalCartas.classList.contains('modal-bajar-activado')){
            retirarModalCartas();
        }
    });

});


function retirarModalCartas() {
    modalCartas.classList.remove('modal-bajar-activado');
    bloqueadorModal.classList.remove('bloqueador-modal-activado');
}

//Opciones del fondo

const modalFondos = document.querySelector('.modal-fondos');
const opcionesFondos = document.querySelector('.opciones-fondo');

let fondoModalPoker = document.querySelector('.fondo-modal-poker');
let fondoModalPicnic = document.querySelector('.fondo-modal-picnic');
let fondoModalEspacio = document.querySelector('.fondo-modal-espacio');
let fondoPagina = document.querySelector('.fondo-pagina');

fondoModalPoker.addEventListener('click', ()=>{
    fondoPagina.classList.add('fondo-pagina-poker');
    
    fondoPagina.classList.remove('fondo-pagina-picnic');
    fondoPagina.classList.remove('fondo-pagina-espacio');
    retirarModalFondos();
});

fondoModalPicnic.addEventListener('click', ()=>{
    fondoPagina.classList.add('fondo-pagina-picnic');

    fondoPagina.classList.remove('fondo-pagina-poker');
    fondoPagina.classList.remove('fondo-pagina-espacio');
    retirarModalFondos();
});

fondoModalEspacio.addEventListener('click', ()=>{
    fondoPagina.classList.add('fondo-pagina-espacio');

    fondoPagina.classList.remove('fondo-pagina-picnic');
    fondoPagina.classList.remove('fondo-pagina-poker');
    retirarModalFondos();
});



opcionesFondos.addEventListener('click', () => {
    
    if(!modalFondos.classList.contains('modal-bajar-activado')){
        modalFondos.classList.add('modal-bajar-activado');
        bloqueadorModal.classList.add('bloqueador-modal-activado');
    }

    bloqueadorModal.addEventListener('click', ()=>{

        if(modalFondos.classList.contains('modal-bajar-activado')){
            retirarModalFondos();
        }
    });

});


function retirarModalFondos() {
    modalFondos.classList.remove('modal-bajar-activado');
    bloqueadorModal.classList.remove('bloqueador-modal-activado');
}


let opcionesSonido = document.querySelector('.opciones-sonido');

//Opciones del sonido


opcionesSonido.addEventListener('click', ()=>{

    if (!opcionesSonido.classList.contains('opciones-sonido-desactivado')) {
        opcionesSonido.classList.add('opciones-sonido-desactivado');

        winAudio.muted = true;
        loseAudio.muted = true;
        wrongAudio.muted = true;
        clickAudio.muted = true;
        rigthAudio.muted = true;
        restartAudio.muted = true;
    
    }else if(opcionesSonido.classList.contains('opciones-sonido-desactivado')){
        opcionesSonido.classList.remove('opciones-sonido-desactivado')
        
        winAudio.muted = false;
        loseAudio.muted = false;
        wrongAudio.muted = false;
        clickAudio.muted = false;
        rigthAudio.muted = false;
        restartAudio.muted = false;
        
    }
});




