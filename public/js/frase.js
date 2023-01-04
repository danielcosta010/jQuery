$('#botao-frase').click(fraseAleatoria);
$('#pesquisa-frase').click(pesquisaFrase);

function fraseAleatoria(){
  $('.spiner').toggle()

  $.get('http://localhost:3000/frases', trocaFraseAleatoria)
  .fail(() => {
    $('.erro').show();
    setTimeout(() => {
      $('.erro').hide()
    }, 3000)
  })
  .always(() => $('.spiner').toggle())
}
function trocaFraseAleatoria(data) {
  let frase = $('#frase');
  let idAleatorio = Math.floor(Math.random() * data.length);
  console.log(idAleatorio);
  frase.text(data[idAleatorio].texto);
  contafrase();
  atualizaTempoInicial(data[idAleatorio].tempo)

  console.log(data);
}

function pesquisaFrase() {
  $('.spiner').toggle()
  let idPesquisa = $('#input-pesquisa').val();
  let dados = {id: idPesquisa}
  console.log(dados);
  $.get('http://localhost:3000/frases', dados, retornaFrase)
  .fail(() => {
    $('.erro').show();
    setTimeout(() => {
      $('.erro').hide()
    }, 3000)
  })
  .always(() => $('.spiner').toggle())
}

function retornaFrase(data) {
  let frase = $('#frase');
  frase.text(data.texto);
  contafrase();
  atualizaTempoInicial(data.tempo)
  console.log(data);
}
