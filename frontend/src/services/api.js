import axios from 'axios';

const api = axios.create({
    baseURL: 'https://loja-fullstack-6cpj.vercel.app/'
})

export default api;
