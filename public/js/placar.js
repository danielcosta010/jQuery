$('#remove-placar').click(removePlacar);

function inserePlacar() {
  let usuario = 'Daniel';
  let corpoTabela = $('.placar').find('tbody');
  let numPalavras = $('#contador-palavras').text();
  
  let linha = novaLinha(usuario, numPalavras);
  linha.find('.remover').click(removeLinha);

  corpoTabela.append(linha);
  $('.placar').slideDown(400)
  scrollPlacar();
}

function scrollPlacar() {
  // let posicaoPlacar = $('.placar').offset().top;
  // $('html, body').animate(
  //   {
  //     scrollTop: `${posicaoPlacar}px`
  //   }, 1000);

  $("html, body").animate(
    {
      scrollTop: $('html, body').get(0).scrollHeight
    }, 2000);
}

function novaLinha(usuario, palavras) {
  let linha = $('<tr>');
  let colunaUsuario = $('<td>').text(usuario);
  let colunaPalavras = $('<td>').text(palavras);
  let colunaRemover = $('<td>')

  let link = $('<a>').addClass('remover').attr('href', '#');
  let icone = $('<i>').addClass('material-icons').text('delete');

  link.append(icone);
  colunaRemover.append(link);

  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha

}

function removeLinha(e) {
  e.preventDefault();
  let linha = $(this).parent().parent();
  linha.fadeOut(2000);
  setTimeout(function() {
    linha.remove()
  }, 2000);
}

function removePlacar()  {
  $('.placar').stop().slideToggle(600)
}
