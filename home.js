import { gamesApiUrl } from "./scripts/const.mjs";
import { doFetch } from "./scripts/utils/doFetch.mjs";


{/* <div class="product-wrapper">
  <div class="product-container">
    <div class="game-image"></div>
    <div class="product-content">
      <h3 class="product-title"></h3>
      <h4 class="product-tags"></h4>
      <div class="product-price">
        <h4 class="sale"></h4>
        <h4 class="original"></h4>
      </div>
    </div>
  </div>
</div> */}

function generateGameHtml(game) {
    const gameWrapper = document.createElement('div');
    gameWrapper.classList.add('product-wrapper');

    const gameContainer = document.createElement('div');
    gameContainer.classList.add('product-container');

    const gameImage = document.createElement('div');
    gameImage.classList.add('game-image');
    gameImage.style.backgroundImage = game.image.url;
    
    const gameContent = document.createElement('div');
    gameContent.classList.add('product-content');

    const gameTitle = document.createElement('h3');
    gameTitle.classList.add('product-title');
    gameTitle.textContent = game.title;

    const gameTags = document.createElement('h4');
    gameTags.classList.add('product-tags');
    gameTags.textContent = game.tags;

    const gamePriceContainer = document.createElement('div');
    gamePriceContainer.classList.add('product-price');

    const gamePrice = document.createElement('h4');
    gamePrice.classList.add('original');
    gamePrice.textContent = game.price;

    const gameDiscountedPrice = document.createElement('h4');
    gameDiscountedPrice.classList.add('sale');
    gameDiscountedPrice.textContent = game.discountedPrice;
    
    gameWrapper.appendChild(gameContainer);
    gameContainer.append(gameImage, gameContent);
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