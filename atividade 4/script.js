function buscarCEP() {
    let cep = document.getElementById('cep').value;
    
    // Remove caracteres não numéricos
    cep = cep.replace(/\D/g, '');
    
    // Limpa resultados anteriores
    limparResultados();
    
    // Valida se o CEP tem 8 dígitos
    if (cep.length !== 8) {
        mostrarErro('CEP deve conter 8 dígitos');
        return;
    }
    
    // Mostra loading
    document.getElementById('endereco').textContent = 'Buscando...';
    
    // Consulta a API ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                mostrarErro('CEP não encontrado');
                limparResultados();
                return;
            }
            
            // Preenche os campos com os dados retornados
            document.getElementById('cepResultado').textContent = cep;
            document.getElementById('endereco').textContent = data.logradouro || 'Não disponível';
            document.getElementById('bairro').textContent = data.bairro || 'Não disponível';
            document.getElementById('cidade').textContent = data.localidade || 'Não disponível';
            document.getElementById('estado').textContent = data.uf || 'Não disponível';
            
            // Esconde mensagem de erro se existir
            document.getElementById('erro').style.display = 'none';
        })
        .catch(error => {
            console.error('Erro:', error);
            mostrarErro('Erro ao buscar CEP. Tente novamente.');
            limparResultados();
        });
}

function limparResultados() {
    document.getElementById('cepResultado').textContent = '-';
    document.getElementById('endereco').textContent = '-';
    document.getElementById('bairro').textContent = '-';
    document.getElementById('cidade').textContent = '-';
    document.getElementById('estado').textContent = '-';
}

function mostrarErro(mensagem) {
    const erroDiv = document.getElementById('erro');
    erroDiv.textContent = mensagem;
    erroDiv.style.display = 'block';
}

// Formata o CEP enquanto o usuário digita
document.getElementById('cep').addEventListener('input', function(e) {
    let cep = e.target.value.replace(/\D/g, '');
    
    if (cep.length > 5) {
        cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    
    e.target.value = cep;
});

// Permite buscar pressionando Enter
document.getElementById('cep').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarCEP();
    }
});