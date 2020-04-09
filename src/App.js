import React, { useState } from "react";
import "./styles.css";
import api from "../src/services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"]
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const newRepo = repositories.filter(repository => repository.id !== id);
    setRepositories(newRepo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          <ul>
            {repositories.map(repository => (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
              </li>
            ))}
          </ul>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
