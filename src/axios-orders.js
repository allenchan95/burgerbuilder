import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-e577c.firebaseio.com/'
});

export default instance;