function fazGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
 }

 function criaCard(jogo) {
    card = document.createElement("div");
    img = document.createElement("img");
    nome = document.createElement("h5");
    data = document.createElement("p");
    rate = document.createElement("p");
    dels = document.createElement("p");

    img.src = jogo.background_image
    nome.innerHTML = jogo.name
    data.innerHTML = "-Data de Lançamento: " + jogo.released
    rate.innerHTML = "-Rating: " + jogo.rating
    dels.innerHTML = jogo.reddit_description


    card.appendChild(img);
    card.appendChild(nome);
    card.appendChild(data);
    card.appendChild(rate);

//console.log(jogo)
    //botao = onclick.location.href='detalhes.html';
    return card;

 }

function main() {
    let data = fazGet("https://api.rawg.io/api/games/{id}?key=d90c8587a0ab44bda8e8659697afd528")
    let jogos = JSON.parse(data);
    let tela = document.getElementById("detals")
    jogos.results.forEach(element => {
        let card = criaCard(element);
        tela.appendChild(card);
    });
}

main()