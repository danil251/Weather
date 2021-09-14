import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://6075786f0baf7c0017fa64ce.mockapi.io/'
})


export const cardsAPI = {
    getCards() {
        return instance.get('products');
    }
}

