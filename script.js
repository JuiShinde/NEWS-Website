const API_KEY = "f749bfeeeeaa4285a4509bae64f05216";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload(){
    window.location.reload();
}
async function fetchNews(query){
    const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data); 
    bindData(data.articles);
}
function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const template = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach(article =>{
        if(!article.urlToImage) return;
        const cardClone = template.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone, article){
    const newsImage = cardClone.querySelector('#news-img');
    const title = cardClone.querySelector('#title');
    const source = cardClone.querySelector('#source');
    const desc = cardClone.querySelector('#desc');

    newsImage.src = article.urlToImage;
    title.innerHTML = article.title;
    desc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{timeZone: "Asia/Jakarta"});

    source.innerHTML = `${article.source.name} ▪ ${date}`;
    cardClone.firstElementChild.addEventListener("click", () =>{
        window.open(article.url, "_blank");
    });
}
let selectedNav = null;
function onNavClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    selectedNav?.classList.remove('active');
    selectedNav = navItem;
    selectedNav?.classList.add('active');
}
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click",() =>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    selectedNav?.classList.remove('active');
    selectedNav = null;
})