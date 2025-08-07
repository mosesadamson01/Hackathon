const catBtn = document.getElementById('cat');
const dogBtn = document.getElementById('dog');
const startBtn = document.getElementById('start')
const stopBtn = document.getElementById('stop')
const favBtn = document.getElementById('favorites'); 
const image = document.getElementById('animal-image');
const favoritesList = document.getElementById('favorites-list'); 
const clearBtn = document.getElementById('clear')

let favorites = JSON.parse(localStorage.getItem('animalFavorites')) || [];
let slideshowInterval

const saveFavorites = () => {
  localStorage.setItem('animalFavorites', JSON.stringify(favorites));
  displayFavorites(); 
};


const displayFavorites = () => {
  favoritesList.innerHTML = ''; 
  favorites.forEach(favUrl => {
    const favImg = document.createElement('img');
    favImg.src = favUrl;
    favImg.style.width = '100px'; 
    favImg.style.margin = '5px';
    favoritesList.appendChild(favImg);
  });
};

displayFavorites();

catBtn.addEventListener('click', async () => {
  const response = await fetch('https://api.thecatapi.com/v1/images/search');
  const data = await response.json();
  image.src = data[0].url;
});

dogBtn.addEventListener('click', async () => {
  const response = await fetch('https://dog.ceo/api/breeds/image/random');
  const data = await response.json();
  image.src = data.message;
});

const startSlideshow = () => {
if (favorites.length === 0) {
alert("Add some favorites first!");
return;
}
let i = 0;
slideshowInterval = setInterval(() => {
image.src = favorites[i];
i = (i + 1) % favorites.length; 
}, 2000); 
};


const stopSlideshow = () => {
clearInterval(slideshowInterval);
};

startBtn.addEventListener('click', startSlideshow);
stopBtn.addEventListener('click', stopSlideshow);

favBtn.addEventListener('click', () => {
  const currentImageUrl = image.src;
  if (currentImageUrl && !favorites.includes(currentImageUrl)) {
    favorites.push(currentImageUrl);
    saveFavorites();
  }
});


clearBtn.addEventListener('click', () => {
localStorage.removeItem('animalFavorites'); 
favorites = []; 
displayFavorites(); 
});

