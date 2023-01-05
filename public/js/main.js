var campo = $('#campo-digitacao');
var tempoInicial = $("#tempo-restante").text();
var reinicia = $('#reinicia-jogo');

// A funçao de inicialização abaixo foi abreviada de $(document).ready(function(){})

$(() => {
   contafrase();
   contaPalavrasECaracteres();
   iniciaTempo();
   inicializaMarcadores();
   reinicia.click(reiniciaJogo);
   pegaPlacar();
   $('#usuarios').selectize({
      create: true,
      sortField: 'text'
  });
})

function atualizaTempoInicial(tempo) {
   tempoInicial = tempo;
   $('#tempo-restante').text(tempo);
}

function contafrase() {
   let frase = $('#frase').text();
   let numeroDePalavras = frase.split(' ').length;
   let tamanhoFrase = $('#tamanho-frase');
   tamanhoFrase.text(numeroDePalavras);
}

function contaPalavrasECaracteres() {
   campo.on('input', function () {
      let conteudo = campo.val();
      let quantidadeDePalavras = conteudo.split(/\S+/).length - 1;
      let contadorDePalavras = $('#contador-palavras');
      let quantidedaDeCracteres = $('#contador-caracteres');

      quantidedaDeCracteres.text(conteudo.length);
      contadorDePalavras.text(quantidadeDePalavras);
   });
}

function iniciaTempo() {
   campo.one('focus', function () {
      let tempoRestante = $('#tempo-restante').text();
      reinicia.attr('disabled', true);
      let intervalId = setInterval(function () {
         tempoRestante--;
         $('#tempo-restante').text(tempoRestante);
         if (tempoRestante < 1) {
            clearInterval(intervalId);
            fimJogo();
            inserePlacar();
         }
      }, 1000);
   });
}

function fimJogo() {
   campo.attr('disabled', true);
   reinicia.attr('disabled', false);
   campo.toggleClass('campo-desativado');
}

function inicializaMarcadores() {
   campo.on("input", function() {
      let frase = $('#frase').text();
      let digitado = campo.val();
      //  let comparavel = frase.substr(0 , digitado.length);
   
      //  if(digitado == comparavel) {
      //      campo.addClass("certo");
      //      campo.removeClass("errado");
      //  } else {
      //      campo.addClass("errado");
      //      campo.removeClass("certo");
      //  }
   
      if( frase.startsWith(digitado)) {
         campo.addClass('certo');
         campo.removeClass('errado');
        } else {
         campo.addClass('errado');
         campo.removeClass('certo')
        }
   });
}


function reiniciaJogo() {
   campo.attr("disabled", false);
   campo.val('');
   $('#contador-caracteres').text('0');
   $('#contador-palavras').text('0');
   $('#tempo-restante').text(tempoInicial);
   campo.toggleClass('campo-desativado');
   campo.removeClass("errado");
   campo.removeClass("certo");
   iniciaTempo()
}

