// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// Event listeners
eventListeners();

function eventListeners() {

    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento este listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || [];
        
        console.log('tweets');
        crearHTML();
    })
}


// Funciones

function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el usuario escribe

    const tweet = document.querySelector('#tweet').value;

    // Validacion
    if (tweet === '') {
        mostrarError('Su tweet esta vacio')
        return; // evita que se sigan ejecutando mas lineas de codigo
        //   el return funciona siempre y cuando el if este dentro de una funcion
    }

    const tweetObjs = {
        id: Date.now(),
        tweet: tweet
    }

    tweets = [...tweets, tweetObjs];
    

    // Una vez agregado el tw creamos el HTML
    crearHTML();
    // Reiniciar el formulario
    formulario.reset();



}

// Mostrar mensjae de error

function mostrarError(error) {
    const mensajeError = document.createElement('p')
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertamos en el Contenido

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta desde de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}

// Muestra un listado de los tweets
function crearHTML() {

    limparHMTL();
    
    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            // crear el HTML
            // Crear el boton para eliminar tw
            const btnEliminar = document.createElement('a');
            btnEliminar.textContent = 'X'
            btnEliminar.classList.add('borrar-tweet');

            // Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');

            // Añadir el texto 
            li.innerText = tweet.tweet;

            // Asignamos el boton de eliminar al html
            li.appendChild(btnEliminar);

            // agregamos en el html

            listaTweets.appendChild(li);

        })
    }

    sincronizaStorage();
}

// Borrar tweet
function borrarTweet(id) {
   tweets = tweets.filter(tweet => tweet.id !== id);

   crearHTML();
}

// Agregar los tweets actuales a Localstorage
function sincronizaStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Limpamos el HTML
 function limparHMTL () {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
 }