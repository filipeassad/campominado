var i, j;
var bombas = [];
var percorrido = [];
var selecionados = [];
var perdeu = false;
var iniciou = false;

function criaTabuleiro() {

	i = 0, j = 0;
	bombas = [];
	percorrido = [];
	selecionados = [];
	perdeu = false;
	iniciou = false;

	var campo = document.getElementById("campo");
	var posicaoBombas = document.getElementById("posicao-bomba");
	document.getElementById("resultado").innerHTML = "";
	geraBombas();	

	campo.innerHTML = "";

	for(i = 0; i < 10; i++){
		for(j = 0; j < 15; j++){
			var nome = i + "-" +  j;
			campo.innerHTML += '<div class="quadrado bg-amarelo inline-top" '+ 
									'id="campo' + nome +'" '+
									'onclick="clicaCampo(\''+nome+'\')" ></div>';	
		}
		campo.innerHTML += '</br>';
	}

	reinicio ();

}

function geraBombas(){
	for(i=0; i < (Math.floor((Math.random() * 10)) + 1 ) + 4; i++){
		var busca = true;
		while(busca){
			var resultado = Math.floor((Math.random() * 10)) + "-" + Math.floor((Math.random() * 15));
			if(!buscaLista(resultado, bombas)){
				bombas[i] = resultado;
				busca = false;
			}
		}
	}
}

function clicaCampo(numero){
	console.log('numero selecionado '+ numero);

	if(!perdeu){

		if(!iniciou){
			inicio();
			iniciou = true;
		}
		
		
		if(buscaLista(numero, bombas)){
			revelarBombas();
			perdeu = true;
			document.getElementById("resultado").innerHTML = "Você perdeu!";
			parar();
		}else{
			if(verificaEnvolta(numero) > 0){			
				document.getElementById("campo" + numero).className = "quadrado inline-top bg-amarelo-claro";
				document.getElementById("campo" + numero).innerHTML = verificaEnvolta(numero);
				buscaLista(numero, selecionados) ? "" : selecionados.push(numero);
				if(verificaVitoria()){
					perdeu = true;
					parar ();
					document.getElementById("resultado").innerHTML = "Você venceu!";
					revelarBandeiras();
				}
			}else{				
				verificaZeros(numero);
			}
		}
	}
	
}

function buscaLista(valor, lista){
	var a;
	for(a = 0; a < lista.length; a++){
		if(lista[a] == valor){
			return true;
		}
	}

	return false;
}

function verificaEnvolta(valor){

	var vetor = valor.split("-");

	var x  = parseInt(vetor[0]);
	var y  = parseInt(vetor[1]);

	var contador = 0;

	buscaLista(x+"-"+ (y + 1), bombas) ? contador++ : contador;
	buscaLista((x - 1 ) +"-"+ (y + 1), bombas) ? contador++ : contador;
	buscaLista((x - 1 ) +"-"+ y, bombas) ? contador++ : contador;
	buscaLista((x - 1 ) +"-"+ (y - 1), bombas) ? contador++ : contador;
	buscaLista(x+"-"+ (y - 1), bombas) ? contador++ : contador;
	buscaLista((x + 1 )+"-"+(y - 1), bombas) ? contador++ : contador;
	buscaLista((x + 1 )+"-"+ y, bombas) ? contador++ : contador;
	buscaLista((x + 1 )+"-"+(y + 1), bombas) ? contador++ : contador;

	return contador;
}

function verificaZeros(valor){
	var vetor = valor.split("-");
	var x  = parseInt(vetor[0]);
	var y  = parseInt(vetor[1]);

	if(verificaEnvolta(valor) == 0 
		&& x >= 0 && x <= 9 
		&& y >= 0 && y <= 14 ){
		document.getElementById("campo" + valor).className = "quadrado inline-top bg-amarelo-claro";
		percorrido.push(valor);
		buscaLista(valor,selecionados) ? "" : selecionados.push(valor);

		buscaLista((x - 1 ) +"-"+(y - 1), percorrido) ? "" : verificaZeros((x - 1 ) +"-"+(y - 1));
		buscaLista((x - 1 ) +"-"+ y, percorrido) ? "" : verificaZeros((x - 1 ) +"-"+ y);
		buscaLista((x - 1 ) +"-"+ (y + 1), percorrido ) ? "" : verificaZeros((x - 1 ) +"-"+ (y + 1));
		
		buscaLista(x+"-"+ (y + 1), percorrido) ? "" : verificaZeros( x+"-"+ (y + 1) );
		
		buscaLista((x + 1 )+"-"+(y - 1), percorrido) ? "" : verificaZeros((x + 1 )+"-"+(y - 1));
		buscaLista((x + 1 )+"-"+ y, percorrido) ? "" : verificaZeros((x + 1 )+"-"+y);
		buscaLista((x + 1 )+"-"+(y + 1), percorrido) ? "" : verificaZeros((x + 1 )+"-"+(y + 1));
		
		buscaLista(x+"-"+ (y - 1), percorrido) ? "" : verificaZeros(x+"-"+ (y - 1));
	}else{
		percorrido.push(valor);
	}

	return valor;

}

function revelarBombas(){
	var a = 0;
	for(a = 0; a < bombas.length; a++){		
		document.getElementById("campo" + bombas[a]).className = "quadrado inline-top bg-vermelho";
		document.getElementById("campo" + bombas[a]).innerHTML += '<img src="../img/mine.png" height="80%">';		
	}
	return;
}

function revelarBandeiras(){
	var a = 0;
	for(a = 0; a < bombas.length; a++){		
		document.getElementById("campo" + bombas[a]).className = "quadrado inline-top bg-amarelo";
		document.getElementById("campo" + bombas[a]).innerHTML += '<img src="../img/flag.png" height="70%">';		
	}
	return;
}

function verificaVitoria(){
	//document.getElementById("resultado").innerHTML = "Nº bombas: " + bombas.length + "</br>Nº Selecionados: " + selecionados.length +  "</br> bombas/150: " +  (bombas.length - 150);
	return  150 - bombas.length  == selecionados.length;
}

/*var a;
	for(a = 0; a < bombas.length; a++){
		bombas[a]
		posicaoBombas.innerHTML += '<div>'+ bombas[a] +'</div>';
}*/