const API_URL = 'http://localhost:3001/api/curriculo/gerar-pdf';

const testData = {
  dadosPessoais: {
    nome: 'Teste Engenheiro',
    email: 'test@engineer.com',
    telefone: '(11) 99999-9999',
    cidade: 'São Paulo, SP',
    linkedin: 'linkedin.com/in/test'
  },
  objetivo: 'Testar a aplicação de geração de currículos de forma automatizada e eficiente.',
  formacoes: [
    { id: 1, curso: 'Engenharia de Software', instituicao: 'Faculdade de Tecnologia', inicio: '2015', fim: '2019' }
  ],
  experiencias: [
    { id: 1, empresa: 'Empresa Teste', cargo: 'QA Engineer', inicio: '2020', fim: '2023', descricao: 'Testes automatizados e manuais.' }
  ],
  habilidades: ['JavaScript', 'Testing', 'Node.js']
};

async function runTests() {
  console.log('--- Iniciando Testes de API ---');

  // Teste 1: Dados Válidos
  console.log('Teste 1: Enviando dados válidos...');
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    if (res.ok) {
      console.log('✅ Teste 1 Passou: PDF gerado com sucesso (Status 200)');
      const buffer = await res.arrayBuffer();
      console.log(`Tamanho do PDF: ${buffer.byteLength} bytes`);
    } else {
      console.log(`❌ Teste 1 Falhou: Status ${res.status}`);
      const error = await res.json();
      console.log('Erro:', error);
    }
  } catch (err) {
    console.log('❌ Teste 1 Erro:', err.message);
  }

  // Teste 2: Dados Faltando (Nome)
  console.log('\nTeste 2: Enviando dados sem nome...');
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...testData, dadosPessoais: { ...testData.dadosPessoais, nome: '' } })
    });

    if (res.status === 400) {
      console.log('✅ Teste 2 Passou: Validado erro 400 (Nome obrigatório)');
    } else {
      console.log(`❌ Teste 2 Falhou: Status ${res.status} (Esperava 400)`);
    }
  } catch (err) {
    console.log('❌ Teste 2 Erro:', err.message);
  }

  console.log('\n--- Testes Finalizados ---');
}

runTests();
