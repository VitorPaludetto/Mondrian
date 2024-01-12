/*
  Criador de arte semelhante aos famosos quadros de Piet Mondrian.
  Versão simplificada que divide os espaços sempre pela metade e 
  pinta alguns espaços aleatoriamente.

  Baseado no site https://mondrianandme.com/

  Vitor Paludetto. 2024
**/

// TODO: adicionar responsividade para permitir redimensionar sem estragar a simetria

const body = document.querySelector('body');
const parentDiv = document.querySelector('div');
const messageWrapper = document.querySelector('.invite-wrapper');
const btn = document.querySelector('.btn');

const red = 'rgb(190, 50, 33)';
const blue = 'rgb(34, 84, 140)';
const yellow = 'rgb(226, 205, 109)';
const white = 'rgb(256, 256, 256)';
const black = 'rgb(0, 0, 0)';

const maxWidth = '100vw';
const maxHeight = '100vh';
const thickness = '8px';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// função que define se div deve ser pintada e com qual cor
function paintDiv() {
  if (getRandomIntInclusive(0, 5) == 1) {
    switch (getRandomIntInclusive(0, 2)) {
      case 0:
        return red;
      case 1:
        return blue;
      case 2:
        return yellow;
    }
  }
  return white;
}

function createDiv(event) {
  // window.addEventListener('mousemove', (event) => {
  //   const localX = event.clientX - event.target.offsetLeft;
  //   const localY = event.clientY - event.target.offsetTop;
  //   console.log(localX, localY);
  // });

  // Após início da criação das divs filhas adiciona listener de evento de clique no botão de reset
  btn.addEventListener('click', reset);
  // Deixa mensagem inicial "invisível" quando criação da arte começa
  messageWrapper.style.display = 'none';

  // event representa o elemento clicado. getBoundingClientRect() retorna posição e tamanho do elemento
  const { height, width } = event.currentTarget.getBoundingClientRect();
  const halfHeight = height / 2;
  const halfWidth = width / 2;

  // variável para definir se divido horizontal ou verticalmente
  let divideHorizontally = true;

  // se o elemento atual for flex, isso significa que suas div filhas devem ser divididas verticalmente
  if (event.currentTarget.style.display == 'flex') {
    divideHorizontally = false;
  }

  // cria divider entre as divs
  const divider = document.createElement('div');
  divider.style.width = divideHorizontally ? maxWidth : thickness;
  divider.style.height = divideHorizontally ? thickness : maxHeight;
  divider.style.backgroundColor = black;
  divider.style.overflow = 'hidden';

  // cria as duas divs filhas
  for (let i = 0; i < 2; i++) {
    const child = document.createElement('div');
    child.style.display = divideHorizontally ? 'flex' : '';
    child.style.height = divideHorizontally ? `${halfHeight}px` : '100%';
    child.style.width = divideHorizontally ? '100%' : `${halfWidth}px`;
    child.style.backgroundColor = paintDiv();
    child.style.overflow = 'hidden';

    // adiciona cada div filha ao pai e o event listener de click a cada uma delas
    event.currentTarget.appendChild(child);
    child.addEventListener('click', createDiv, { once: true });

    // se estivermos na primeira volta do loop adicionamos o divider entre as divs
    if (i == 0) event.currentTarget.appendChild(divider);
  }
}

// Função de reset da arte. Remove listener do botão, remove todos os filhos da div pai
// Para que a mensagem inicial seja mostrada novamente, adicionamos ela à div pai e mudamos o display pra flex.
// Por último, readicionamos o listener de click na div pai para reiniciar a criação da arte
function reset() {
  btn.removeEventListener('click', reset);
  while (parentDiv.hasChildNodes()) parentDiv.removeChild(parentDiv.lastChild);
  parentDiv.appendChild(messageWrapper);
  messageWrapper.style.display = 'flex';
  parentDiv.addEventListener('click', createDiv, { once: true });
}

parentDiv.addEventListener('click', createDiv, { once: true });
