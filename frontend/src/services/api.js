import axios from 'axios';

const api = axios.create({
    baseURL: 'https://loja-fullstack-6cpj.vercel.app/api'
})

export default api;
