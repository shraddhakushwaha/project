const API_key = "6a9eec8d334f425787006aa470cbc924";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));
function reload() {
  window.location.reload();
}
async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_key}`);
  const data = await res.json();
  bindData(data.articles);
}
function bindData(articles) {
  const cardscontainer = document.getElementById("cards-container");
  const newscardTemplete = document.getElementById("template-news-card");
  cardscontainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardclone = newscardTemplete.content.cloneNode(true);
    fillDataincard(cardclone, article);
    cardscontainer.appendChild(cardclone);
  });
}
function fillDataincard(cardclone, article) {
  const newsimg = cardclone.querySelector("#news-img");
  const newstitle = cardclone.querySelector("#news-title");
  const newsource = cardclone.querySelector("#news-source");
  const newsdesc = cardclone.querySelector("#news-desc");
  newsimg.src = article.urlToImage;
  newstitle.innerHTML = article.title;
  newsdesc.innerHTML = article.description;
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsource.innerHTML = `${article.source.name} . ${date}`;
  cardclone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "blank");
  });
}
let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("news-input");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
