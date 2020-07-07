var idBala = 0;
var velocidadBalas = 1000;
var intervaloDisparoBala = 10000;
var balasVolando = [];
var posJugador = 9; //esto es para tener mas a mano la posicion del jugador (aunque la puedo calcular)

var dispararBalas = setInterval(generarBalaRandom, intervaloDisparoBala);
var moverBalas = setInterval(movimientoBala, velocidadBalas);

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
	idBala++;
	console.log(idBala);
}
function movimientoBala(){//la linea 20 y 21 no se si son necesarias pero no las toco x si acaso, ty stackOverflow
	var element = document.getElementById('bala0'),//esto consigue el margen right
    style = window.getComputedStyle(element),
    margenDerecho = style.getPropertyValue('margin-right');//hacer esto util por bala

    margenDerecho = Number(obtenerSoloNumero(margenDerecho)) + 1;
	
	$("#bala0").css('margin-right',margenDerecho + 'px');
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