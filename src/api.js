import axios from 'axios';

// Criação de uma instância do axios com a URL base
const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Categoria'
});

export default api;
