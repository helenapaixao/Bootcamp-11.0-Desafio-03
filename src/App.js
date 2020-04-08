import React, { useState } from "react";

import "./styles.css";
import { useEffect } from "react";
import api from "./services/api";

function App() {
  const [title, setTitle] = useState([]);
  const [url, setUrl] = useState([]);
  const [techs, setTechs] = useState([]);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data);
    });
  });
  async function handleAddRepository(e) {
    e.preventDefault();
    try {
      const response = await api.post("repositories", {
        title,
        url,
        techs,
      });
      console.log(response.data);
      setRepositories([...repositories,response.data]);
      setTitle("");
      setUrl("");
      setTechs("");

    } catch (err) {
      alert("Erro ao adicionar um repositorio, tente novamente");
    }
  }

  async function handleRemoveRepository(id) {
    try {

    await api.delete(`repositories/${id}`); 
  
      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch (err) {
      alert("Erro ao deletar caso, tente novamente");
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          <ul>
            {repositories.map(repository => (
              <li key={repository.id}>{repository.title}</li>
            ))}
            <button onClick={() => handleRemoveRepository(1)}>Remover</button>
          </ul>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
