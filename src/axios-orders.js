import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-burger-builder-fb9a9.firebaseio.com/'
});

export default instance;