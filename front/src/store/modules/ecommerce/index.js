/**
 * Ecommerce Module
 */
 import Vue from 'vue'

const state = {
    cart: localStorage.getItem('cart') != null ? JSON.parse(localStorage.getItem('cart')) : [],
}

// getters
const getters = {
    cart: state => {
        return state.cart;
    },
}

// actions
const actions = {
    addProductToCart(context, payload) {
        context.commit('onAddProductToCart', payload);
    },
    onDeleteProductFromCart(context, payload) {
        context.commit("onDeleteProductFromCart", payload);
    },
    changeQuantityHandler(context, payload) {
        context.commit('onChangeQuantityHandler', payload);
    },
    updateCart(context, payload) {
        context.commit("updateCart", payload);
    }
}

// mutations
const mutations = {
    onAddProductToCart(state, payload) {
        let newProduct = {
            id: payload.id,
            quantity: payload.quantity,
        }
        state.cart.push(newProduct);
        localStorage.setItem('cart', JSON.stringify(state.cart))

        Vue.notify({
            group: 'center',
            type: 'success',
            text: 'Item added to wishlist successfully'
        });
    },
    onDeleteProductFromCart(state, payload) {
        let index = state.cart.indexOf(payload);
        state.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(state.cart))
        Vue.notify({
            group: 'center',
            type: 'success',
            text: 'Item removed from wishlist successfully'
        });
    },
    onChangeQuantityHandler(state, payload) {
        let product = payload.product;
        let quantity = payload.quantity;

        state.cart.forEach(cart => {
            if (cart.id == product.id) {
                cart.quantity = product.quantity + quantity
            }
        });
        // state.cart[indexOfItem].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    updateCart(state, payload) {
        state.cart = payload
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
