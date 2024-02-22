import { gamesApiUrl } from "./scripts/const.mjs";
import { doFetch } from "./scripts/utils/doFetch.mjs";




function generateGameHtml(game) {
    const gameWrapper = document.createElement('div');
    gameWrapper.classList.add('product-wrapper');

    const gameContainer = document.createElement('div');
    gameContainer.classList.add('product-container');

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
    
    gameWrapper.appendChild(gameContainer);
    gameContainer.append(imageContainer, gameContent);
    imageContainer.appendChild(gameImage);
    gameContent.append(gameTitle, gameTags, gamePriceContainer);
    gamePriceContainer.append(gamePrice, gameDiscountedPrice);

    return gameWrapper;
}

function displayGames(games) {
    const displayContainer = document.querySelector('#display-container');
    displayContainer.textContent = "";
    games.forEach((game) => {
        const gameHtml = generateGameHtml(game);
        console.log(gameHtml);
        displayContainer.appendChild(gameHtml);
    });
}


async function main() {
    const responseData = await doFetch(gamesApiUrl);
    const games = responseData.data;
    displayGames(games);
}

main();


/* <div class="filter-buttons">
    <div class="button-wrapper">
        <button class="genre"></button>
    </div>
    <div class="button-wrapper">
        <button class="age"></button>
    </div>
    <div class="button-wrapper">
        <button class="sale"></button>
    </div>
</div> */

// Filter 

const filterList = document.querySelector('.filter-buttons');
const filterButtons = filterList.querySelectorAll('.filter-btn');
const games = document.querySelectorAll('.product-container');

filterButtons.forEach((button) => {
    button.addEventListener('click' , (e) => {
        const filter = e.target.getAttribute('data-filter');

        updateActiveButton(e.target);
        filterGames(filter);
    });
});

function updateActiveButton(newButton) {
    const activeButton = filterList.querySelector('.active');
    if (activeButton) {
        activeButton.classList.remove('active');
    }
    newButton.classList.add('active');
}
