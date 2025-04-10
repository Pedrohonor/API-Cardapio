const express = require('express');
const router = express.Router();
const receitaController = require('../controllers/receitaController');

// Roteamento
router.get('/', receitaController.buscarReceita);  // Buscar receitas
router.post('/', receitaController.criarReceita);  // Criar uma nova receita
router.put('/:id', receitaController.atualizarReceita);  // Atualizar receita
router.delete('/:id', receitaController.deletarReceita);  // Deletar receita

module.exports = router;

// Simulação de banco de dados
let receitas = [
  { nome: 'Spaghetti Arrabiata', id: 1 },
  { nome: 'Lasagna', id: 2 },
  { nome: 'Chicken Parmesan', id: 3 }
];

// Buscar receitas
exports.buscarReceita = (req, res) => {
  const searchTerm = req.query.s;
  if (!searchTerm) {
    return res.status(400).json({ error: 'Parâmetro "s" não fornecido' });
  }

  const resultado = receitas.filter(r => r.nome.toLowerCase().includes(searchTerm.toLowerCase()));

  if (resultado.length > 0) {
    return res.json({ meals: resultado });
  } else {
    return res.status(404).json({ message: 'Nenhuma receita encontrada' });
  }
};

// Criar nova receita
exports.criarReceita = (req, res) => {
  const novaReceita = req.body;

  if (!novaReceita.nome) {
    return res.status(400).json({ error: 'O nome da receita é obrigatório' });
  }

  novaReceita.id = receitas.length + 1;
  receitas.push(novaReceita);

  res.status(201).json(novaReceita);
};
