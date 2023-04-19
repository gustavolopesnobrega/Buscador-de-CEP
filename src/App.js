import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css'
import { Component } from 'react';
import api from './services/api'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});
  
  const backgroundJp = {
    backgroundImage: `url("https://solutudo-cdn.s3-sa-east-1.amazonaws.com/prod/adv_files/57f6703b-95e0-49db-8455-5e61ac1f1344/1f22e18f-1764-4edc-b59d-546ac1716111.jpg")` 
  }
  const backgroundGeneral = {
    background: 'linear-gradient(#121212, #212b46)'
  }


  async function handleSearch() {
    if (input === "" ) {
      alert("preencha algum cep")
      return;
    }
    
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")
      console.log(response.data.erro)
      if(response.data.erro == true) {
        alert("Por favor digite um cep valido")
      }

    } catch {
      
      alert("erro ao buscar cep");
      
      setInput("")
    }
    
 
  }

  return (
    <div className="container" >
      <h1 >Buscador de CEP</h1>

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
