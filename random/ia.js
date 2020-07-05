var posFruta;
var posSerpiente;

function obtenerDataFruta(fruta) {
	posFruta = fruta;
}
function obtenerDataSerpiente(vivora) {
	posSerpiente = vivora;
	//console.log(posSerpiente[0]);
}
function eleccionRandom(posActual) {
	if (posActual == "arriba") {
		var direcciones = ["arriba","derecha","izquierda"];
		var ran = Math.floor(Math.random() * 3);
		//console.log(direcciones[ran]);
		return direcciones[ran];
	}
	else if(posActual == "derecha"){
		var direcciones = ["arriba","derecha","abajo"];
		var ran = Math.floor(Math.random() * 3)
		//console.log(direcciones[ran]);
		return direcciones[ran];
	}
	else if(posActual == "izquierda"){
		var direcciones = ["arriba","abajo","izquierda"];
		var ran = Math.floor(Math.random() * 3);
		//console.log(direcciones[ran]);
		return direcciones[ran];
	}
	else{
		var direcciones = ["abajo","derecha","izquierda"];
		var ran = Math.floor(Math.random() * 3);
		//console.log(direcciones[ran]);
		return direcciones[ran];
	}	
}
function rebotar(vivora){
	console.log("rebota");
	if(vivora[0][0] > 16){//cambiar vivora.length a el largo q tenga vertical o horizontal donde corresponda
		vivora[0][0] = vivora[0][0] - vivora.length;
	}
	if(vivora[0][0] < 0){
		vivora[0][0] = vivora[0][0] + vivora.length;
	}
	if(vivora[0][1] > 16){
		vivora[0][1] = vivora[0][1] - vivora.length;
	}
	if(vivora[0][1] < 0){
		vivora[0][1] = vivora[0][1] + vivora.length;
	}
	return vivora;
}
function rebotarRandom(vivora){
	console.log("rebota");
	if(vivora[0][0] > 16){
		vivora[0][0] = Math.floor(Math.random() * 16);
	}
	if(vivora[0][0] < 0){
		vivora[0][0] = Math.floor(Math.random() * 16);
	}
	if(vivora[0][1] > 16){
		vivora[0][1] = Math.floor(Math.random() * 16);
	}
	if(vivora[0][1] < 0){
		vivora[0][1] = Math.floor(Math.random() * 16);
	}
	return vivora;
}