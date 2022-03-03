import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style/style.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    
    if (input === ''){
      alert('Preencha algum CEP.');
      return;
    }

    try {
      const response = await api.get(`${input}/json`)
      //console.log(response.data);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Ops! Algo deu errado. Tente novamente.");
      setInput("");
    }
  }

  return (
   <div className="container">
      <h1 className='title'>Buscador de CEP</h1>

      <div className="container-input">
          <input type="text" placeholder="Insira seu CEP aqui" value={input} onChange={(e)=> setInput(e.target.value)}></input>
          <button className="acao" onClick={handleSearch}>
            <FiSearch size={25} color="#ccc"></FiSearch>
          </button>
      </div>
      {Object.keys(cep).length > 0 && (
          <main className='main'>
            <h2>CEP: {cep.cep}</h2>
    
              <span>{cep.logradouro}</span>
              <span>Complemento: {cep.complemento}</span>
              <span>Bairro:{cep.bairro}</span>
              <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
      
   </div>
  );
}

export default App;
