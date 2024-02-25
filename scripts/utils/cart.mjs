export function getCart() {
const cart = JSON.parse(localStorage.getItem('cart'));
return cart;
}
  
export function addToCart(game) {
    const cart = getCart();
    const itemIndex = cart.findIndex(function (currentGame) {
        if (game.id === currentGame.id) {
        return true;
        }
        return false;
    });
    if (itemIndex === -1) {
        cart.push({ ...game, quantity: 1 });
    } else {
        cart[itemIndex].quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(game) {
    const cart = getCart();
    const gameIdToRemove = game.id;

    const idInCart = cart.findIndex((currentItem) => {
        if (currentItem.id === gameIdToRemove) {
        return true;
        }
        return false;
    });

    if (cart[idInCart].quantity > 1) {
        cart[idInCart].quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        const newCart = cart.filter((_, index) => {
        if (idInCart === index) {
            return false;
        }
        return true;
        });
        localStorage.setItem('cart', JSON.stringify(newCart));
    }
}
  
export function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    console.log('Cart has been cleared');
}
  
export function getTotalNumberOfItemsInCart() {
    const cart = getCart();
    const totalNumberOfItemsInCart = cart.reduce((total, item) => {
        total += item.quantity;
        return total;
    }, 0);
    return totalNumberOfItemsInCart;
}
  