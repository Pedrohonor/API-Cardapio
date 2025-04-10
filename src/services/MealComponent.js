import React, { useEffect, useState } from 'react';
import api from '../api.js';
import './App.css';

const MealComponent = () => {
  const [meals, setMeals] = useState([]); // Estado para armazenar várias receitas
  const [loading, setLoading] = useState(true); // Estado para controlar o loading
  const [error, setError] = useState(null); // Estado para controlar erros

  const [activeTab, setActiveTab] = useState(0); // Mover o hook de aba para cima, antes da lógica de renderização

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const requests = Array(8).fill(null).map(() =>
          api.get('https://www.themealdb.com/api/json/v1/1/random.php') // 6 requisições para obter 5 receitas aleatórias
        );
        
        const responses = await Promise.all(requests); // Espera todas as requisições terminarem
        const mealsData = responses.map((response) => response.data.meals[0]); // Extrai as receitas das respostas
        setMeals(mealsData); // Atualiza o estado com as receitas
      } catch (err) {
        setError(err); // Se der erro, armazena o erro
      } finally {
        setLoading(false); // Atualiza o estado de loading
      }
    };

    fetchMeals(); // Chama a função para buscar as receitas
  }, []); // O array vazio garante que a requisição será feita apenas uma vez

  if (loading) return <div className="loading">Loading...</div>; // Exibe "Loading..." enquanto espera a resposta
  if (error) return <div className="error">Error: {error.message}</div>; // Exibe erro, caso aconteça

  // Função para alternar entre as abas
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="meal-container">
      <h1>Meal Details</h1>

      {/* As abas */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => handleTabClick(0)}
        >
          All Meals
        </button>
        <button
          className={`tab-button ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => handleTabClick(1)}
        >
          Recipes by Category
        </button>
      </div>

      {/* Conteúdo das abas */}
      <div className="tab-content">
        {activeTab === 0 && (
          <div className="meal-list">
            {meals.length > 0 ? (
              meals.map((m, index) => (
                <div key={index} className="meal-card">
                  <h2>{m.strMeal}</h2>
                  <img src={m.strMealThumb} alt={m.strMeal} />
                  <p>{m.strInstructions}</p>
                </div>
              ))
            ) : (
              <p>No meals found</p>
            )}
          </div>
        )}

        {activeTab === 1 && (
          <div className="meal-list">
            <p>Here you can display recipes by category.</p>
            {/* Adicione a lógica para exibir receitas por categoria se necessário */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MealComponent;
