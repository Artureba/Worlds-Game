  const apiKey = "83f4072b1dc5426a92e38f3de273059f";
 var creators;
 let txtSearch = document.getElementById('txtSearch')
 let btnSearch = document.getElementById('btnSearch')
 let gamesPlace = document.getElementById('gamesPlace')
 
 function doSearch () {
   let textoPesquisa = txtSearch.value
   let url = `https://api.rawg.io/api/games?key=${apiKey}&search=${textoPesquisa}`
   
   fetch (url)
    .then(res => res.json())
    .then(data => {
      let saida = ''
      for (let i = 0; i < data.results.length; i++) {
        let game = data.results[i]
        saida += `
        <div class="card col-4" style="width: 18rem;">
          <img src="${game.background_image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${game.name}</h5>
            <a href="https://rawg.io/games/${game.slug}" class="btn btn-primary">Detalhes</a>
          </div>
        </div>
        `
      }
      gamesPlace.innerHTML = saida
    })
   
   //alert (`O texto a ser pesquisado é ${textoPesquisa}`)
 }
 
 document.body.onload = () => {
   btnSearch.addEventListener ('click', doSearch)
 }






 loadCreators();
 
 function fazGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
 }

 function criaCard(jogo) {
    card = document.createElement("div");
    card.classList.add('card');
    card.classList.add('col-md-4');
    img = document.createElement("img");
    cardBody = document.createElement("div");
    cardBody.classList.add('card-body');
    nome = document.createElement("h5");
    nome.classList.add('card-title');
    data = document.createElement("p");
    data.classList.add('card-text');
    rate = document.createElement("p");
    rate.classList.add('card-text');
    botao = document.createElement("button");
    botao.classList.add('card-button'); 
    img.src = jogo.background_image
    nome.innerHTML = jogo.name
    data.innerHTML = "-Data de Lançamento: " + jogo.released
    rate.innerHTML = "-Rating: " + jogo.rating
    botao.innerHTML = `<a href="https://rawg.io/games/${jogo.slug}">Detalhes</a>`

    card.appendChild(img);
    card.appendChild(nome);
    card.appendChild(data);
    card.appendChild(rate);
    card.appendChild(botao);

    //botao = onclick.location.href='detalhes.html';
    return card;

 }

function main() {
    let data = fazGet(`https://api.rawg.io/api/games?key=${apiKey}`)
    let jogos = JSON.parse(data);
    let tela = document.getElementById("tela")
    jogos.results.forEach(element => {
        let card = criaCard(element);
        tela.appendChild(card);
    });
}

main()




const getPlataforms = async () => {
  const response = await fetch(`https://api.rawg.io/api/platforms?key=${apiKey}`);
  const plataforms = await response.json()
  plataforms.results.slice(-5).forEach((plataform) => {
      const plataformContainer = document.createElement("div");
      plataformContainer.classList.add('plataform');
      plataformContainer.innerHTML = `
      <div  class="card col-4" style="width: 18rem;">
      <h3>${plataform.name}</h3>
      <img class="card-img-top" src="${plataform.image_background}" />
      <div class="card-body">
          <strong>
              Número de jogos:
          </strong>
          <span>
              ${plataform.games_count}
          </span>
          </div>
          <a class="more-details" href="#">
              Mais detalhes...
          </a>
          </div>
      `

      const plataformsWrap = document.querySelector(".platforms-container");
      plataformsWrap.appendChild(plataformContainer)
  })
}

getPlataforms()







async function loadCreators() {
  try {
    const result = await fetch(`https://api.rawg.io/api/creators?key=${apiKey}`);
    const data = await result.json();
    creators = data.results;

    setCreatorsSection();
  } catch (error) {

    throw new Error("Não foi possível obter os dados")
  }
}



function setCreatorsSection() {
  let card = "";

  creators.forEach(creator => {
    card += `
      <div  class="card col-4" style="width: 18rem;">
        <h3>${creator.name}</h3>
        <div class="card-body">
          <img src="${creator.image}" class="card-img-top" alt="${creator.name}">
          <p>Jogos criados: ${creator.games_count}</p>
        </div>
      </div>
    `
  })

  document.querySelector('.creators-container').innerHTML = card;
}