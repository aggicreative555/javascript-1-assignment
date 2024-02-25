import { gamesApiUrl } from "./scripts/const.mjs";
import { addToCart, clearCart } from './scripts/utils/cart.mjs';
import { doFetch } from "./scripts/utils/doFetch.mjs";

function generateGameHtml(game) {

    const gameWrapper = document.createElement('a');
    gameWrapper.classList.add('product-wrapper');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    const gameImage = document.createElement('img');
    gameImage.classList.add('game-image');
    gameImage.src = game.image.url;
    gameImage.alt = game.image.alt;
    
    const gameContent = document.createElement('div');
    gameContent.classList.add('product-content');

    const gameTitle = document.createElement('h3');
    gameTitle.classList.add('product-title');
    gameTitle.textContent = game.title;

    const gameTags = document.createElement('h4');
    gameTags.classList.add('product-tags');
    gameTags.textContent = game.genre;

    const gamePriceContainer = document.createElement('div');
    gamePriceContainer.classList.add('product-price');

    const gamePrice = document.createElement('h4');
    gamePrice.classList.add('original');
    gamePrice.textContent = game.price;

    const gameDiscountedPrice = document.createElement('h4');
    gameDiscountedPrice.classList.add('sale');
    gameDiscountedPrice.textContent = game.discountedPrice;

    const addToCartBtn = document.createElement('button');
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.classList.add('add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        addToCart(game);
    });
    
    gameWrapper.append(imageContainer, gameTitle, gameTags, gamePriceContainer,gameContent, addToCartBtn);
    imageContainer.append(gameImage)
    gameContent.append(gameTitle, gameTags, gamePriceContainer);
    gamePriceContainer.append(gamePrice, gameDiscountedPrice);


    return gameWrapper;
}

async function main() {
    const responseData = await doFetch(gamesApiUrl);
    const games = responseData.data;
    displayGames(games);
    createCart();

    return games;
}

main();

function displayGames(games) {
    const displayContainer = document.querySelector('#display-container');
    displayContainer.textContent = "";

    const gameListContainer = document.createElement('div');
    gameListContainer.classList.add('game-list-container');

    displayContainer.append(gameListContainer);

    
    games.forEach((game) => {
        const gameHtml = generateGameHtml(game);
        gameListContainer.appendChild(gameHtml);
    });

    displayContainer.appendChild(gameListContainer);
}

const filterList = document.querySelector('.filter-buttons');
const games = document.querySelectorAll('.product-container');


if (filterList) {
    const filterButtons = filterList.querySelectorAll('.filter-btn');

    filterButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const filter = e.target.getAttribute('data-filter');

            updateActiveButton(e.target);
            filterGames(filter);
        });
    });
} else {
    console.log('filterList is null. No filter buttons found.');
}


async function filterGames(genre) {
    try {
        const games = await main(); 
        let filteredGames = [];

        if (genre === 'All') {
            filteredGames = games;
        } else if (['Action', 'Horror', 'Sports', 'Adventure'].includes(genre)) {
            filteredGames = games.filter(game => game.genre === genre);
        }
        console.log('Filtered Games:', filteredGames);

        displayFilteredGames(filteredGames);
    } catch (error) {
        console.error('Error filtering games:', error);
    }
}

function displayFilteredGames(filteredGames) {
    const displayContainer = document.querySelector('#display-container');
    displayContainer.innerHTML = '';
    filteredGames.forEach((game) => {
        const gameHtml = generateGameHtml(game);
        displayContainer.appendChild(gameHtml);
    });
}

function updateActiveButton(newButton) {
    const activeButton = filterList.querySelector('.active');
    if (activeButton) {
        activeButton.classList.remove('active');
    }
    newButton.classList.add('active');
}

const clearCartButton = document.getElementById('clear-cart');
if (clearCartButton) {
  clearCartButton.addEventListener('click', () => {
    clearCart();
  });
} else {
  console.log("Clear cart button not found.");
}


function createCart() {
    const cart = localStorage.getItem('cart');
    if (!cart) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
}