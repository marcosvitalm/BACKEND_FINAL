// Função para enviar os dados para o servidor
async function enviarResultado(nome, acertos) {
    const response = await fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, acertos })
    });
  
    const result = await response.json();
    alert(result.message);
  }
  