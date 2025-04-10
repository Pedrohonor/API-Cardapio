import React, { useState, useEffect } from "react";

export default function ReceitasPorCategoria() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [receitas, setReceitas] = useState([]);

  // Buscar categorias
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => res.json())
      .then((data) => {
        const nomes = data.meals.map((item) => item.strCategory);
        setCategorias(nomes);
      });
  }, []);

  // Buscar receitas ao selecionar categoria
  useEffect(() => {
    if (!categoriaSelecionada) return;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoriaSelecionada}`)
      .then((res) => res.json())
      .then((data) => {
        setReceitas(data.meals);
      });
  }, [categoriaSelecionada]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>🍽️ Receitas por Categoria</h2>

      {/* Dropdown estilizado */}
      <select
        onChange={(e) => setCategoriaSelecionada(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "30px",
          minWidth: "250px",
        }}
      >
        <option value="">Selecione uma categoria</option>
        {categorias.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Cards de receita */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {receitas.map((receita) => (
          <div
            key={receita.idMeal}
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              background: "#fff",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={receita.strMealThumb}
              alt={receita.strMeal}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <div style={{ padding: "12px" }}>
              <h4 style={{ fontSize: "18px", margin: "0 0 10px" }}>{receita.strMeal}</h4>
              <a
                href={`https://www.themealdb.com/meal.php?c=${receita.idMeal}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "8px",
                  fontSize: "14px",
                  color: "#ffffff",
                  background: "#28a745",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  textDecoration: "none",
                }}
              >
                Ver Receita
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
