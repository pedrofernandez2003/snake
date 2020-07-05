function Crear_Juego(){
	
	var vivora = [[8,9],[8,8],[8,7]];
	var prox_direccion = "derecha";
	var posicion_manzana;
	const speed = 1;
	//document.addEventListener('keydown', DetectarMovimiento);

	var matrizHTML = "";
	/*i = ancho | j = */
	for (var i = 0; i < 17 ;i++) {

		matrizHTML = matrizHTML + "<div>";

		for (var j = 0; j < 17; j++) {
			matrizHTML = matrizHTML + "<div class='cuadrado' id='f"+i+"c"+j+"'></div>"
		}

		matrizHTML = matrizHTML + "</div>";
	}

	$("#matriz").append(matrizHTML);

	function getRandomInt(min, max) {
 		return Math.floor(Math.random() * (max - min)) + min;
	}

	function Actualizar_Casillas(){
		for (var i = 0; i < 17 ;i++) {
			for (var j = 0; j < 17; j++) {
				if (i%2 == 0 && j%2 ==0) {
					$("#f"+i+"c"+j).css("background-color","#011F26");	
				}
				else if (i%2 == 1 && j%2 ==1) {
					$("#f"+i+"c"+j).css("background-color","#011F26");	
				}
				else {
					$("#f"+i+"c"+j).css("background-color","#011F26");	
				}
			}
		}

		for (var i = 0; i < 17 ; i++) {
			for (var j = 0; j < 17; j++) {
				if(posicion_manzana[0] == i && posicion_manzana[1] == j){
					$("#f"+i+"c"+j).css("background-color","#03A696");
				}
			}
		}

		for (var pieza = 0; pieza < vivora.length; pieza++) {
			for (var i = 0; i < 17 ;i++) {
				for (var j = 0; j < 17; j++) {
					if(vivora[pieza][0] == i && vivora[pieza][1] == j && pieza == 0){
						$("#f"+i+"c"+j).css("background-color","#ABBF0F");
					}
					else if(vivora[pieza][0] == i && vivora[pieza][1] == j){
						$("#f"+i+"c"+j).css("background-color","#ABBF0F");
					}
				}
			}
		}
	}

	function Generar_Manzana(){
		colisionan = true;
		while(colisionan){
			colisionan = false;
			posicion_manzana = [getRandomInt(0,17),getRandomInt(0,17)];
			obtenerDataFruta(posicion_manzana);//mando la data al js de la ia
			for(var i = 0; i < vivora.length && !colisionan; i++){
				if(vivora[i][0] != posicion_manzana [0] || vivora[i][1] != posicion_manzana [1]){
					colisionan = false;
				}	
				else{
					colisionan = true;	
				}
			}
		}	
		
	}

	/*function DetectarMovimiento(evento){
		if(!((prox_direccion[prox_direccion.length-1] == "arriba" && String.fromCharCode(evento.keyCode) == 'S') || (prox_direccion[prox_direccion.length-1] == "abajo" && String.fromCharCode(evento.keyCode) == 'W') || ((prox_direccion[prox_direccion.length-1] == "derecha" || prox_direccion[prox_direccion.length-1] == "") && String.fromCharCode(evento.keyCode) == 'A') || (prox_direccion[prox_direccion.length-1] == "izquierda" && String.fromCharCode(evento.keyCode) == 'D'))){
			switch(String.fromCharCode(evento.keyCode)){
				case 'W': prox_direccion.push("arriba"); break;
				case 'A': prox_direccion.push("izquierda"); break;
				case 'S': prox_direccion.push("abajo"); break;
				case 'D': prox_direccion.push("derecha"); break;
			}
		}
	}*/

	function Movernos(){
		prox_direccion = eleccionRandom(prox_direccion);
		
		for ( var i = vivora.length - 1 ; i > 0 && prox_direccion != ""; i--) {
			vivora[i][0] = vivora [i-1][0];
			vivora[i][1] = vivora [i-1][1];
		}
		switch(prox_direccion){
			case "arriba": vivora[0][0] = vivora[0][0] - 1 ; break;
			case "izquierda": vivora[0][1] = vivora[0][1] - 1; break;
			case "abajo": vivora[0][0] = vivora[0][0] + 1; break;
			case "derecha": vivora[0][1] = vivora[0][1] + 1; break;
		}
		if(vivora[0][0] == posicion_manzana[0] && vivora[0][1] == posicion_manzana[1]){
			vivora.push([vivora[vivora.length-1][0],vivora[vivora.length-1][1]]);
			Generar_Manzana();
		}
		obtenerDataSerpiente(vivora);//mando la data al js de la ia
		//mostrar data:
		document.getElementById('cant-manzanas').innerHTML='Manzanas comidas: '+ (vivora.length - 3);
		document.getElementById('tiempo-transcurrido').innerHTML='Tiempo: ';
		document.getElementById('largo-valor').innerHTML='Largo: ' + vivora.length + ' unidades';
		var porc = (100*vivora.length)/289 ;
		document.getElementById('largo-porc').innerHTML='Largo: ' + porc.toFixed(2) +'%';
	}

	function Derrota(){
		if(vivora[0][0] > 16 || vivora[0][0] < 0 || vivora[0][1] > 16 || vivora[0][1] < 0){
			/*clearInterval(Actualizar_Pantalla);
			clearInterval(Actualizar_Movimiento);
			clearInterval(Chequear_Derrota);
			$("#boton-reiniciar").css('display','block');*/
			vivora = rebotarRandom(vivora);
		}
		/*for (var i = 1; i < vivora.length; i++) {
			if(vivora[0][0] == vivora[i][0] && vivora[0][1] == vivora[i][1]){
				clearInterval(Actualizar_Pantalla);
				clearInterval(Actualizar_Movimiento);
				clearInterval(Chequear_Derrota);
				clearInterval(Chequear_Victoria);
				$("#boton-reiniciar").css('display','block');
			}
		}*/
	}

	function Victoria(){
		if(vivora.length == 288){
			clearInterval(Actualizar_Pantalla);
			clearInterval(Actualizar_Movimiento);
			clearInterval(Chequear_Derrota);
			clearInterval(Chequear_Victoria);
			$("#boton-reiniciar").css('display','block');
		}
		
	}

	Generar_Manzana();
	var Actualizar_Pantalla = setInterval(Actualizar_Casillas, speed);
	var Actualizar_Movimiento = setInterval(Movernos, speed);
	var Chequear_Derrota = setInterval(Derrota, speed);
	var Chequear_Victoria = setInterval(Victoria, speed);


}