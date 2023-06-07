   ////////////////////////////
//// ESTUDANDO DE JAVASCRIPT ////
  ////////////////////////////

/* Matrizes e operações com matrizes */


//var soma = notas[0]+notas[1]+notas[2]+notas[3]

//console.log(soma/4)


var notas = [7,9,10,9]

function media(){
  var s = 0;
  for(var i = 0; i < notas.length; i++){
    s += notas[i]/4
  }
  console.log(s)
}

media();

//--------------------- aula 13 -- 
/////////// variáveis: local ou global //// p5DOM /// declaração switch

var input,heading,heading2,frase,botaoOK


function setup(){
  heading = createElement('h1', 'Digite um número de 1 a 8');
  heading.position(100,200);

  input = createInput();
  input.position(200,300);
  input.attribute("placeholder","Dica")

  botaoOK = createButton("OK");
  botaoOK.position(200,350);
  botaoOK.mouseClicked(bolaMagica);

}

function bolaMagica(){
 var valor = input.value()

 switch(valor){
  case '1':
    frase = 'Talvez'
    frases(frase);
    input.value(" ")
    break
  case '2':
    console.log('Sim');
    break
  case '3':
    console.log('Não');
    break
  case '4':
    console.log('Talvez');
    break
  case '5':
    console.log('Talvez');
    break
  case '5':
    console.log('Talvez');
    break
  case '6':
    console.log('Talvez');
    break
  case '7':
    console.log('Talvez');
    break
  case '8':
    console.log('Talvez');
    break
  default:
    console.log('Digite um nº de 1 a 8');
 }
 
}


function frases(frase){
  heading = createElement('h3', frase);
  heading.position(100,380);
}