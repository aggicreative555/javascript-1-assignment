import { gamesApiUrl } from "./scripts/const.mjs";
import { doFetch } from "./scripts/utils/doFetch.mjs";


function generateGameHtml(game) {
    const gameContainer = document.createElement('div');
    gameContainer.classList.add('product-container');

    const gameTitle = document.createElement('h3');
    gameTitle.classList.add('product-title');
    gameTitle.textContent = game.title;

    const gamePriceContainer = document.createElement('div');
    gamePriceContainer.classList.add('product-price');

    const gamePrice = document.createElement('h4');
    gamePrice.classList.add('original');
    gamePrice.textContent = game.price;

    const gameDiscountedPrice = document.createElement('h4');
    gameDiscountedPrice.classList.add('sale');
    gameDiscountedPrice.textContent = game.discountedPrice;
    
    gameContainer.append(gameTitle, gamePrice, gameDiscountedPrice);

    return gameContainer;
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