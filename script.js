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
                
                cadastrar();
            }else{
                alert("CEP não encontrado")
            }
        })
        .catch(error => console.error("Erro ao Buscar o CEP: ", error));
})

function cadastrar(){
    const endereçoSalvo = {
        cep : document.getElementById("cep").value,
        logradouro : document.getElementById("logradouro").value,    
        cidade : document.getElementById("cidade").value,   
        estado : document.getElementById("estado").value   
    }
    localStorage.setItem("endereçoSalvo", JSON.stringify(endereçoSalvo));
}

window.onload = function() {
    const endereçoSalvo = JSON.parse(localStorage.getItem("endereçoSalvo"));
        document.getElementById("cep").value = endereçoSalvo.cep;
        document.getElementById("logradouro").value = endereçoSalvo.logradouro;
        document.getElementById("bairro").value = endereçoSalvo.bairro;
        document.getElementById("cidade").value = endereçoSalvo.cidade;
        document.getElementById("estado").value = endereçoSalvo.estado;
    }

