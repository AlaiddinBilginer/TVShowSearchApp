const form = document.querySelector('form');
const tvShows = document.querySelector('#tv-shows');

const getTVShows = async () => {
  const title = form.elements.query.value;
  const config = { params: { q: title } };
  const res = await axios.get('https://api.tvmaze.com/search/shows', config);
  return res.data;
};

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  clearCards();
  const results = await getTVShows();
  for (let result of results) {
    if (result.show.image) {
      addCard(result);
    }
  }
  form.elements.query.value = '';
});

const addCard = (result) => {
  const newCard = document.createElement('div');
  newCard.setAttribute('class', 'card');

  const newAnchor = document.createElement('a');
  newAnchor.href = result.show.url;
  newAnchor.target = '_blank';

  const newImg = document.createElement('img');
  newImg.src = result.show.image.original;

  const newH2 = document.createElement('h2');
  newH2.innerText = result.show.name;

  newAnchor.append(newImg);
  newCard.append(newAnchor);
  newCard.append(newH2);

  tvShows.append(newCard);
};

const clearCards = () => {
  const cards = document.querySelectorAll('.card');
  for (let card of cards) {
    card.remove();
  }
};
