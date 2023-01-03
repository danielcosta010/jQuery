$('#remove-placar').click(removePlacar);

function inserePlacar() {
  let usuario = 'Daniel';
  let corpoTabela = $('.placar').find('tbody');
  let numPalavras = $('#contador-palavras').text();
  
  let linha = novaLinha(usuario, numPalavras);
  linha.find('.remover').click(removeLinha);

  corpoTabela.append(linha);
};

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

};

function removeLinha(e) {
  e.preventDefault();
  $(this).parent().parent().remove();
};

function removePlacar()  {
  $('.placar').slideToggle(600)
};
  