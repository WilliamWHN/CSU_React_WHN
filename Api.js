import axios from 'axios';

export default axios.create({
  baseURL: `http://localhost:80/`,
  headers: {
    Authorization: {
      toString () {
        return `Bearer ${localStorage.getItem('token')}`
      }
    }
  }
});
