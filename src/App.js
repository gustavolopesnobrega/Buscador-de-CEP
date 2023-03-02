import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css'

import api from './services/api'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "" ) {
      alert("preencha algum cep")
      return;
    }
    
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    } catch {
      alert("erro ao buscar cep");
      setInput("")
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu cep" value={input} 
        onChange={(e) => setInput(e.target.value)}>
          
        </input>
        <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size={25} color="black" />
        </button>

      </div>

      <main className='main'>
        <h2>CEP: {cep.cep}</h2>
      
        <span>Rua: {cep.logradouro}</span>
        <span>Completemnto: {cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf} </span>
      
      </main>
    </div>
  );
}

export default App;
