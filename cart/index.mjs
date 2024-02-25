import {
addToCart,
clearCart,
getTotalNumberOfItemsInCart,
removeFromCart,
} from '../scripts/utils/cart.mjs';
import { formatCurrency } from '../scripts/utils/formatCurrency.mjs';

const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', () => {
    clearCart();
    renderCheckoutPage();
});
  
function generateHtmlForGame(game) {
    const gameWrapper = document.createElement('div');
    gameWrapper.classList.add('cart-product-container');

    const imageContainerSmall = document.createElement('div');
    imageContainerSmall.classList.add('image-container-small'); 

    const gameImage = document.createElement('img');
    gameImage.classList.add('game-image-small');
    gameImage.src = game.image.url;
    gameImage.alt = game.image.alt;

    imageContainerSmall.appendChild(gameImage);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('content-wrapper');

    const gameTitle = document.createElement('h3');
    gameTitle.textContent = game.title;

    const gamePrice = document.createElement('div');
    gamePrice.textContent = 'Price: ' + game.price;

    const gamePriceTotal = document.createElement('div');
    gamePriceTotal.textContent ='Total: ' + formatCurrency(game.price * game.quantity);

    const gameQuantity = document.createElement('div');
    gameQuantity.classList.add('outlined');
    gameQuantity.textContent = game.quantity;

    const incrementButton = document.createElement('button');
    incrementButton.textContent = '+';
    incrementButton.addEventListener('click', () => {
        addToCart(game);
        renderCheckoutPage();
    });
  
    const decrementButton = document.createElement('button');
    decrementButton.textContent = '-';
    decrementButton.addEventListener('click', () => {
        removeFromCart(game);
        renderCheckoutPage();
    });

    const quantityAdjustmentContainer = document.createElement('div');
    quantityAdjustmentContainer.classList.add('button-container-cart');

    quantityAdjustmentContainer.append(incrementButton, gameQuantity, decrementButton);

    gameWrapper.append(contentWrapper, imageContainerSmall);

    contentWrapper.append(gameTitle, gamePrice,quantityAdjustmentContainer, gamePriceTotal);

    return gameWrapper;
}

function displayCartItems() {

    const displayContainer = document.getElementById('cart-items-display');
    displayContainer.textContent = '';
    const cart = JSON.parse(localStorage.getItem('cart'));

    cart.forEach(function (currentItem) {
        const itemHtml = generateHtmlForGame(currentItem);
        displayContainer.appendChild(itemHtml);
    });

    if (!cart) {
        return null;
    }
}

function displayCartCounter() {
    const cartCounterContainer = document.getElementById('cart-counter');
    console.log(cartCounterContainer);
    const totalNumberOfItems = getTotalNumberOfItemsInCart();
    cartCounterContainer.textContent = totalNumberOfItems;
}

function renderCheckoutPage() {
    displayCartItems();
    displayCartCounter();
   
}

function main() {
    renderCheckoutPage();
}

main();