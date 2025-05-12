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

window.addEventListener("DOMContentLoaded", () => {
    const enderecoSalvo = localStorage.getItem("enderecoSalvo");

    if(enderecoSalvo){
        const endereco = JSON.parse(enderecoSalvo);
        document.getElementById("cep").value = endereco.cep;
        document.getElementById("logradouro").value = endereco.logradouro;
        document.getElementById("bairro").value = endereco.bairro;
        document.getElementById("cidade").value = endereco.cidade;
        document.getElementById("estado").value = endereco.estado;
    }
});

