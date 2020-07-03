var posFruta;
var posSerpiente;

function obtenerDataFruta(fruta) {
	posFruta = fruta;
}
function obtenerDataSerpiente(vivora, direc) {
	posSerpiente = vivora;
	direccion = direc;
	console.log(vivora);
}
function eleccionRandom(posActual) {
	if (posActual == "arriba") {
		var direccion = ["arriba","derecha","izquierda"];
		var ran = Math.floor(Math.random() * 3)
		return direccion[ran];
	}
	else if(posActual == "derecha"){
		var direccion = ["arriba","derecha","abajo"];
		var ran = Math.floor(Math.random() * 3)
		return direccion[ran];
	}
	else if(posActual == "izquierda"){
		var direccion = ["arriba","abajo","izquierda"];
		var ran = Math.floor(Math.random() * 3)
		return direccion[ran];
	}
	else{
		var direccion = ["abajo","derecha","izquierda"];
		var ran = Math.floor(Math.random() * 3)
		return direccion[ran];
	}	
}
function rebotar(vivora){
	console.log("rebota");//cambiar vivora.length a el largo q tenga vertical o horizontal donde corresponda
	if(vivora[0][0] > 16){
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