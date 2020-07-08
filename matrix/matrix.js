var idBala = 0;
var velocidadBalas = 10;
var intervaloDisparoBala = 1000;
var balasVolando = {};//un diccionario q guarda el idBala y su fila
var posJugador = 9; //esto es para tener mas a mano la posicion del jugador (aunque la puedo calcular)
var anchoMatrix = 0;// la uso para calcular el margen porcentual de las balas;
var puntuacion = 0;
var dispararBalas;
var verificarEstadoPartida;

function generarMapa() {  
	var sentenciasHTML = "<div id='parte-balas'>";
	var jugadorHTML = "<div id='jugador'></div>";
	for (var i = 0; i < 20; i++) {
		var idCamino = "camino" + i;
		
		sentenciasHTML = sentenciasHTML.concat("<div class='camino-bala' id='" + idCamino + "'> <div class='jugador' id='jugador" + i + "'  ></div>  </div>");
	}
	sentenciasHTML = sentenciasHTML.concat("</div>");
	$("#principal").append(sentenciasHTML);
	$("#jugador9").css('display','inline-block');
}
function generarBalaRandom() {
	var posRandom =  Math.floor(Math.random() * 21);
	//console.log(posRandom);
	$("#camino" + posRandom).append("<div class='bala' id='bala" + idBala + "'><div>");

	balasVolando['bala' + idBala] = posRandom;

	idBala++;
}
function movimientoBala(balaActual){//la linea 20 y 21 no se si son necesarias pero no las toco x si acaso, ty stackOverflow
	var element = document.getElementById(balaActual),//esto consigue el margen right
    style = window.getComputedStyle(element),
    margenDerecho = style.getPropertyValue('margin-right');//hacer esto util por bala

    margenDerecho = Number(obtenerSoloNumero(margenDerecho)) + 1;
	
	$('#'+balaActual).css('margin-right',margenDerecho + 'px');
}
function obtenerSoloNumero(cadena){// le saco el px al parametro
	var soloNumero = "";// esto se puede reemplazar por un cadena.slice(0, cadena.length -2) o substr q hace lo mismo
	for (var i = 0; i < cadena.length && cadena[i] != 'p' ; i++) {
		soloNumero = soloNumero + cadena[i];
	}
	return soloNumero;
}
function moverJugador(donde) {
	if (donde == "arriba" && posJugador > 0) {
		$("#jugador" + posJugador).css('display','none');
		posJugador --;
		$("#jugador" + posJugador).css('display','inline-block');
	}
	else if (donde == "abajo" && posJugador < 19) {
		$("#jugador" + posJugador).css('display','none');
		posJugador ++;
		$("#jugador" + posJugador).css('display','inline-block');
	}
}
function arrancarJuego() {
	generarBalaRandom();
	anchoMatrix = hallarAnchoMatrix();
	dispararBalas = setInterval(generarBalaRandom, intervaloDisparoBala);
	verificarEstadoPartida = setInterval(estadoPartida, velocidadBalas);//le pongo velocidad balas, xq quiero ver su estado por cada movimiento
}
function estadoPartida() {
	for(var id in balasVolando){
		if (obtenerDisplay(id) != "none") {
			movimientoBala(id);
			perder(id, balasVolando[id]);
		}
	}
}
function obtenerDisplay(balaActual) {//como no se como sacar valores del diccionario, los hago display none y su display para operar con ellos
	var element = document.getElementById(balaActual),//esto consigue el margen right
    style = window.getComputedStyle(element),
    display = style.getPropertyValue('display');
 
    return display;
}
function aumentarPuntaje(balaActual) {
	var element = document.getElementById(balaActual),//esto consigue el margen right
    style = window.getComputedStyle(element),
    margenDerecho = style.getPropertyValue('margin-right');

    margenDerecho = obtenerSoloNumero(margenDerecho);

    margenDerechoPorc = (margenDerecho * 100) / anchoMatrix;
	
	if(margenDerechoPorc >= 95){
		puntuacion++;
		document.getElementById('puntos').innerHTML='PUNTUACION: '+ puntuacion;
		$('#'+balaActual).css('display','none');
	}
}
function perder(balaActual, fila) {//recibe una bala y se fija si esta al 90% de la matriz y si el jugador esta en la misma fila, osea si hay colision
	var element = document.getElementById(balaActual),//esto consigue el margen right
    style = window.getComputedStyle(element),
    margenDerecho = style.getPropertyValue('margin-right');

    margenDerecho = obtenerSoloNumero(margenDerecho);

    margenDerechoPorc = (margenDerecho * 100) / anchoMatrix;
	
	if(margenDerechoPorc >= 85 && posJugador == fila){//pongo 85 xq si bien el jugador esta a 90, el ancho de la bala es de 5%
		$('#'+balaActual).css('display','none');
		document.getElementById('puntos').innerHTML='PERDISTE, PUNTOS:' + puntuacion;
		clearInterval(dispararBalas);
		clearInterval(verificarEstadoPartida);
	}
	else{
		aumentarPuntaje(balaActual);
	}
}
function hallarAnchoMatrix() {
	var element = document.getElementById('principal'),
    style = window.getComputedStyle(element),
    ancho = style.getPropertyValue('width');

    ancho = obtenerSoloNumero(ancho);
    return ancho;}