# Campo Minado

![index](https://github.com/filipeassad/campominado/blob/master/img/telainicial.png)


### O Projeto
Campo minado é um projeto feito, em HTML, CSS e JavaScript, para recriar o famoso jogo "Campo minando" que vinha junto com o Windows XP.

### Como funciona o jogo

Existe uma matríz de 10 por 15 posições e dentro dessa matríz estão escondidas, de forma aleatoria, bombas. O jogador tem que descobrir onde estão essas bombas e selecionar todas as posições que não estão com bombas. Para ajudar o jogador, a cada posição selecionada, se a mesma não estiver com a bomba, o jogo informa o numero de bombas em volta desta posição. Caso selecionar uma posição com bomba, o jogador perde a partida.

### Layout

O layout apresenta um tabuleiro de 10x15 onde o jogador poderá escolher em qual posição irá selecionar. Existem também um cronometro que conta quanto tempo vai durar o jogo. O cronometro é iniciado assim que a primeira posição é selecionada. Logo a baixo do cronometro tem um botão que reinicia o jogo zerando o cronometro e gerando novas bombas.

### Ferramentas Utilizadas

* HTML
* CSS
* JavaScript
* Bootstrap
* GoogleFonts

### Desenvolvimento

O tabuleiro é totalmente dinamico, ele é inserido atravez de javascript assim que a pagina html é carregada, logo em seguida o sistema gera alietoriamente as posições de cada bomba. Cada campo é carregado com uma função "onClick()" para que possa ser reconhecido posteriormente. Depois que o tabuleiro for carregado, a aplicação fica esperando a ação de clique. Cada vez que o jogar selecionar uma posição, a aplicação irá verificar se aquela posição é uma bomba. Caso a posição for uma bomba, a aplicação revela todas as bombas e informa ao jogador que ele perdeu. Caso a posição selecionada não for uma bomba, a aplicação verifica quantas bombas tem envolta para informar ao jogador. Se por um acaso não existir bombas em volta, a aplicação vai revelando as posições próximas que também não tem bombas em volta. Se existir alguma bom próxima a posição, o sistema informa a quantidade de bombas e verifica se o jogador já selecionou todas as posições livre de bombas. Selecionando todas as posições vazias o sistema para o cronometro e informa ao jogar que ele venceu.

### Estrutura do projeto

| Campo Minado  
|----|-- css  
|--------|-- index.css  
|----|-- img  
|--------|-- flag.png  
|--------|-- mine.png  
|--------|-- timeCapivara.png  
|----|-- page  
|--------|-- index.html  
|----|-- scripts  
|--------|-- cronometro.js  
|--------|-- index.js  


#### Sabendo disso, segue a explicação de alguns metodos do index.js:

#### criaTabuleiro()

```js
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
			campo.innerHTML += 
			'<div class="quadrado bg-amarelo inline-top" '+ 
				'id="campo' + nome +'" '+
				'onclick="clicaCampo(\''+nome+'\')" ></div>';	
		}
		campo.innerHTML += '</br>';
	}

	reinicio ();

}
```
Esse método inicializa todo o jogo. O método estancia as listas presentes no projeto e deixa as variaveis globais no seu modo default. Após a inicialização, a função chama a "geraBombas()" que popula a lista de bombas com as posições das bombas geradas. Em seguida é percorrido o tamanho da matriz adcionando cada campo do tabuleiro. Os campos são representados por uma "div" com o identificado feito através de sua posição, também é setado uma função "clicaCampo()" dentro do metodo "onclick". A função "clicaCampo()" espera como parametro uma String com a posição do campo para o mesmo ser identificado posteriormente. Por fim o metodo gera o cronometro.

#### geraBombas()

```js
function geraBombas(){
	for(i=0; i < (Math.floor((Math.random() * 10)) + 1 ) + 4; i++){
		var busca = true;
		while(busca){
			var resultado = Math.floor((Math.random() * 10)) + 
					"-" + Math.floor((Math.random() * 15));
			if(!buscaLista(resultado, bombas)){
				bombas[i] = resultado;
				busca = false;
			}
		}
	}
}
```

Essa função gera aleatóriamente as posições onde as bombas serão escondidas. Ela retorna uma lista com essas posições, a mesma pode ter nom máximo 15 posições e no mínimo 5.

#### clicaCampo(numero)

```js
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
```

De longe esse é a função que faz o jogo funcinar. Ela recebe o parametro "numero" que representa a posição que foi clicada. Antes de tudo, o metodo verifica se o jogo já não está perdido, caso esteja o metodo não executa suas funcionalidades. Se o jogador não perdeu o jogo o metodo verifica se o cronometro está ligado, caso estaja desligado, o metodo o liga com a função "inicio()". Em seguida verifica se a posição selecionada está dentro da lista de posições das bombas. Se for uma posição de bomba a função revela as posições das bombas com a função "revelarBombas()", coloca como verdadeiro a variavel "perdeu" para o sistema saber que o jogo está perdido,  imprime uma mensagem de derrota e para o cronometro. Se a posição não for uma bomba, a função conta quantas bombas tem envolta. Se a quantidade for maior que zero, a função mostra a quantidade de bombas dentro da posição e verifica se essa posição já foi clicada antes verificando na lista de selecionados e verifica se o jogador ganhou a partida. Se a quantidade de bombas for igual a zero, a função "verificaZeros()" é chamada para revelar as posições que não tem bombas em volta próximos a posição selecionada.

#### verificaZeros(valor)

```js
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
```
Essa é uma função recusiva que vai percorrendo as posições do tabuleiro, revelando os espaços em branco que não tem bombas em volta. Cada posição percorrida é adcionada na lista "selecionados" para representar como se o jogador tivesse clicado nela. 

### Observação

Para desenvolver o cronometro, foi usado como base o código do link abaixo:

https://codepen.io/Romlonix/pen/Fwsza

### Contato

**Email:** filipeassad@gmail.com

**Skype:** filipe.assad

### Minhas redes sociais

[![Face](https://github.com/filipeassad/portifolio/blob/master/Imagens/facebook.png)](https://www.facebook.com/filipe.assad "Perfil do Facebook") [![Twitter](https://github.com/filipeassad/portifolio/blob/master/Imagens/twitter.png)](https://twitter.com/lipeassad "Perfil do Twitter")

