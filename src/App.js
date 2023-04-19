import React, {useState, useEffect} from 'react';
import Cards from './components/Cards';
const App = ()=> {
  const [merchants, setMerchants] = useState([]);
  useEffect(() => {
    getMerchant();
  }, []);
    
  async function getMerchant() {
    let response = await fetch('http://localhost:3001');
    if (response.ok) {
      let data = await response.json();
      setMerchants(data);
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  };
  
  async function createMerchant() {
    let name = prompt('Enter merchant name');
    let email = prompt('Enter merchant email');
    let response = await fetch('http://localhost:3001/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email}),
    });
    if (response.ok) {
      let returning = await response.text();
      alert(returning);
      getMerchant();
    } else {
      alert("Ошибка добавления: " + response.status);
    }
  };
  
  async function deleteMerchant() {
    let id = prompt('Enter merchant id');
    let response = await fetch(`http://localhost:3001/merchants/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      let returning = await response.text();
      alert(returning);
      getMerchant();
    } else {
      alert("Ошибка Удаления: " + response.status);
    }
  };
  
  return (
    <div>
      {<Cards post={merchants}/>}
      <button onClick={createMerchant}>Add</button>
      <br />
      <button onClick={deleteMerchant}>Delete</button>
    </div>
  );
}

export default App;