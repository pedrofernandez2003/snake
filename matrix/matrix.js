var idBala = 0;
const velocidadBalas = 1000;

var moverBalas = setInterval(movimientoBala, velocidadBalas);

function generarMapa() {  
	var sentenciasHTML = "<div id='parte-balas'>";
	for (var i = 0; i < 20; i++) {
		var idCamino = "camino" + i;
		sentenciasHTML = sentenciasHTML.concat("<div class='camino-bala' id='" + idCamino + "'></div>");
	}
	sentenciasHTML = sentenciasHTML.concat("</div>");
	$("#principal").append(sentenciasHTML);
}
function generarBalaRandom() {
	var posRandom =  Math.floor(Math.random() * 21);
	//console.log(posRandom);
	$("#camino" + posRandom).append("<div class='bala' id='bala" + idBala + "'><div>");
	idBala++;
	console.log(idBala);
}
function movimientoBala(){//la linea 20 y 21 no se si son necesarias pero no las toco x si acaso, ty stackOverflow
	var element = document.getElementById('bala1'),//esto consigue el margen right
    style = window.getComputedStyle(element),
    margenDerecho = style.getPropertyValue('margin-right');//hacer esto util por bala

    margenDerecho = Number(obtenerSoloNumero(margenDerecho)) + 1;
	
	$(".bala").css('margin-right',margenDerecho + 'px');
}
function obtenerSoloNumero(cadena){// le saco el px al parametro
	var soloNumero = "";
	for (var i = 0; i < cadena.length && cadena[i] != 'p' ; i++) {
		soloNumero = soloNumero + cadena[i];
	}
	return soloNumero;}