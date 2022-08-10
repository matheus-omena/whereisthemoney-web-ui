import axios from 'axios';

const _ApiBase = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default _ApiBase;