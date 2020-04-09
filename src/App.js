import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
        .then(response => {
          console.log(response)
          setRepositories(response.data)
        })
  }, []);

  async function handleAddRepository() {
    await api.post('repositories', {
      title: "Novo Desafio",
      url: "teste",
      techs: ["ReactJS"]
    }).then(response => {
      setRepositories([...repositories, response.data]);
    })


  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          <p>{repository.title}</p>

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;