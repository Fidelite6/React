import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-aaf89.firebaseio.com'
});

export default instance;
