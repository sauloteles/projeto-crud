const elemets = {
    btn_cadastrar: document.querySelector('.btn-cadastrar'),
    tabela: document.querySelector('tbody'),
    modal: document.querySelector('.modal'),
    nome_modal: document.querySelectorAll('.modal-field')[0],
    email_modal: document.querySelectorAll('.modal-field')[1],
    celular_modal: document.querySelectorAll('.modal-field')[2],
    cidade_modal: document.querySelectorAll('.modal-field')[3],
    btn_salvar: document.querySelector('.btn-salvar'),
    btn_cancelar: document.querySelector('.btn-cancelar'),
    btn_excluir: document.querySelector('.btn-salvar')

}
console.log(elemets.cidade_modal)
let lista_clientes = []
let id = 0
let editar = false
let index = 0
function getLocalStorage(){
    JSON.parse(localStorage.getItem('lista_clientes')) ?? []
}

function setLocalStorage(lista_clientes){
    localStorage.setItem("lista_clientes", JSON.stringify(lista_clientes))
}

if(localStorage.hasOwnProperty("lista_clientes")){
    listaNotas = JSON.parse(localStorage.getItem("lista_clientes"));

    for(let i = 0; i < lista_clientes.length;++i){
        
    };
    index = parseInt(lista_clientes[lista_clientes.length-1].id)+1

}

class Cliente{
    constructor(nome,email,celular,cidade,id,linhaHTML){
        this.nome = nome
        this.email = email
        this.celular = celular
        this.cidade = cidade
        this.linhaHTML = linhaHTML
        this.id = id
    }
}

function criar_linha(cliente){
    const linha = document.createElement('tr')

    linha.innerHTML = 
    `
    <td>${cliente.nome}</td>
    <td>${cliente.email}</td>
    <td>${cliente.celular}</td>
    <td>${cliente.cidade}</td>
    <td>
        <button type="button" class="${cliente.id} btn-editar">editar</button>
        <button type="button" class="${cliente.id} btn-excluir">excluir</button>
    </td>
    `
    cliente.linhaHTML = linha
    document.querySelector('tbody').appendChild(linha)
    ++id
}
function limpar_input(){
    elemets.nome_modal.value=''
    elemets.email_modal.value=''
    elemets.celular_modal.value=''
    elemets.cidade_modal.value = ''

}
function add_cliente(){
    if(!editar){
        const nome = elemets.nome_modal.value
        const email = elemets.email_modal.value
        const celular = elemets.celular_modal.value
        const cidade = elemets.cidade_modal.value
    
        const cliente = new Cliente(nome,email,celular,cidade,id)
        lista_clientes.push(cliente)
        criar_linha(cliente)
        console.log(lista_clientes)
        
    }else{
        lista_clientes[index].nome =elemets.nome_modal.value
        lista_clientes[index].email=elemets.email_modal.value
        lista_clientes[index].celular=elemets.celular_modal.value
        lista_clientes[index].cidade=elemets.cidade_modal.value 
        
        lista_clientes[index].linhaHTML.querySelectorAll('td')[0].innerHTML = lista_clientes[index].nome 
        lista_clientes[index].linhaHTML.querySelectorAll('td')[1].innerHTML = lista_clientes[index].email
        lista_clientes[index].linhaHTML.querySelectorAll('td')[2].innerHTML = lista_clientes[index].celular
        lista_clientes[index].linhaHTML.querySelectorAll('td')[3].innerHTML = lista_clientes[index].cidade
        
        editar = false
    }
    toggle_modal()
    setLocalStorage()
}
function editar_cliente(e){
    for(let i = 0; i < lista_clientes.length;++i ){
        if(lista_clientes[i].id == e.target.classList[0]){
            console.log('editar')
            toggle_modal()
            editar = true
            index = i
            elemets.nome_modal.value= lista_clientes[i].nome
            elemets.email_modal.value= lista_clientes[i].email
            elemets.celular_modal.value= lista_clientes[i].celular
            elemets.cidade_modal.value = lista_clientes[i].cidade
            break
        }
    }
}
function excluir_cliente(e){
    for(let i = 0; i < lista_clientes.length;++i ){
        if(lista_clientes[i].id == e.target.classList[0]){
            console.log('excluiu')
            elemets.tabela.removeChild(lista_clientes[i].linhaHTML)
            lista_clientes.splice(i,1)
            setLocalStorage()
            break
        }
    }
}
function toggle_modal(){
    elemets.modal.classList.toggle('active')
    limpar_input()
}
elemets.btn_salvar.addEventListener('click',()=>{
    add_cliente()
})
elemets.btn_cadastrar.addEventListener('click',toggle_modal)
elemets.btn_cancelar.addEventListener('click',toggle_modal)
document.addEventListener('click',(e)=>{
    console.log(e.target.classList[1])
    if(e.target.classList[1] == 'btn-excluir'){
        excluir_cliente(e)
    }if(e.target.classList[1] == 'btn-editar'){
        editar_cliente(e)
    }
})

