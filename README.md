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
