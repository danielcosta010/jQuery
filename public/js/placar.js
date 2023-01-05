$('#esconde-placar').click(escondePlacar);
$('#salva-placar').click(salvaPlacar);

function inserePlacar() {
  let usuario = $('#usuarios').val();
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

function escondePlacar()  {
  $('.placar').stop().slideToggle(600);
  scrollPlacar();
}

function salvaPlacar() {
  let placar = [];
  let linhas = $('tbody>tr');

  linhas.each(function() {
    let usuario = $(this).find('td:nth-child(1)').text();
    let palavras = $(this).find('td:nth-child(2)').text();

    let score = {
      usuario: usuario,
      pontos: palavras
    }

    placar.push(score);
  });

  let dados = {
    placar: placar
  }

  $.post('http://localhost:3000/placar', dados, function(e) {
    $('#mensagem-placar').text('Placar salvo com sucesso!').css('color', '#6aa412')
    console.log('Salvou no servidor');
  }).fail(function() {
    $('#mensagem-placar').text('Erro ao salvar o placar, tente novemente!').css('color', '#ff0000')
  }).always(function() {
    setTimeout(function() {
      $('#mensagem-placar').hide()
    }, 1800)
  })
}

function pegaPlacar() {
  $.get('http://localhost:3000/placar', function(data) {
    
    $(data).each(function() {
      let linha = novaLinha(this.usuario, this.pontos);
      $('tbody').append(linha);
      linha.find('.remover').click(removeLinha);
    })
  })
}