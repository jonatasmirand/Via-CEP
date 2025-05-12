document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepUsuario = elemento.value;

    if(!(cepUsuario.length === 8))
        return;

    fetch (`https://viacep.com.br/ws/${cepUsuario}/json/`)
        .then(response => response.json())
        .then(data =>{
            if(!data.erro){
                document.getElementById("logradouro").value = data.logradouro;
                document.getElementById("bairro").value = data.bairro;
                document.getElementById("cidade").value = data.localidade;
                document.getElementById("estado").value = data.uf;
                document.getElementById("nuemro").value = data.numero;
                
                cadastrar();
            }else{
                alert("CEP não encontrado")
            }
        })
        .catch(error => console.error("Erro ao Buscar o CEP: ", error));
})

function cadastrar(){
    const enderecoSalvo = {
        cep : document.getElementById("cep").value,
        logradouro : document.getElementById("logradouro").value,  
        bairro : document.getElementById("bairro").value,  
        cidade : document.getElementById("cidade").value,   
        estado : document.getElementById("estado").value,
        numero : document.getElementById("numero").value,
    }
    localStorage.setItem("enderecoSalvo", JSON.stringify(enderecoSalvo));
}

window.onload = function() {
    const enderecoSalvo = JSON.parse(localStorage.getItem("enderecoSalvo"));
        document.getElementById("cep").value = enderecoSalvo.cep;
        document.getElementById("logradouro").value = enderecoSalvo.logradouro;
        document.getElementById("bairro").value = enderecoSalvo.bairro;
        document.getElementById("cidade").value = enderecoSalvo.cidade;
        document.getElementById("estado").value = enderecoSalvo.estado;
        document.getElementById("numero").value = enderecoSalvo.numero;
    }

