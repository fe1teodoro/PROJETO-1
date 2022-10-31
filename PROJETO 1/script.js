const botaoBuscar = document.querySelector('.sendBuscar');
const botaoLogar = document.querySelector('.sendLogar');
const botaoDeslogar = document.querySelector('.logout');
const email = document.querySelector('.loginEmail');
const tituloEmail = document.querySelector('.emailText');
const tituloSenha = document.querySelector('.senhaText');
const password = document.querySelector('.loginSenha');
const container = document.querySelector('.containerAdvice');
let palavra = document.querySelector('.palavraChave');
let validaEmail = false;
let validaSenha = false;


const login = {
    email: 'eve.holt@reqres.in',
    password: 'whatever'
}
let users;
let li;
let ul;

botaoLogar.addEventListener('click', async () =>{
if(validaEmail && validaSenha){
users = {
    email: email.value,
    password: password.value,
    token: ''
    }
    
let data = await (fetch('https://reqres.in/api/login', {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(login)
})
.then((response) => response.json()))
users['token'] = JSON.stringify(data['token']);
console.log(users)
localStorage.token = users['token'];
buttonSearch.className = 'green';
dialogLogin.close()
}else{
    alert('Preencha os campos corretamente!');
}
});

botaoBuscar.addEventListener('click', () => {
    if(localStorage.token == '"QpwL5tke4Pnpja7X4"'){
        fetch(`https://api.adviceslip.com/advice/search/${palavra.value}`)
        .then(resp => {
            return resp.json();
        })
        .then(dataAdvice => {
            let advice = dataAdvice.slips;
            for(let i = 0; i<advice.length;i++){
                li = document.createElement('li');
                li.innerHTML = advice[i].advice;
                ul.appendChild(li);
            }
        });
        palavra.value = '';
    }else{
        li = document.createElement('li');
        li.innerHTML = 'Usuário Deslogado';
        ul.appendChild(li);
    };
});

botaoDeslogar.addEventListener('click', () => {
    buttonSearch.className = 'search';
    localStorage.removeItem('token');
})

email.addEventListener('keyup', () => {
    if(email.value.length <= 2){
        tituloEmail.setAttribute('style', 'color: red');
        tituloEmail.innerHTML = '<strong>Email (Insira no mínimo 3 caracteres)<strong>';
        validaEmail = false;
    }else{
        tituloEmail.setAttribute('style', 'color:black');
        tituloEmail.innerHTML = 'Email';
        validaEmail = true;
    }
});
password.addEventListener('keyup', () => {
    if(password.value.length <= 2){
        tituloSenha.setAttribute('style', 'color: red');
        tituloSenha.innerHTML = '<strong>Senha (Insira no mínimo 3 caracteres)<strong>';
        validaSenha = false;
    }else{
        tituloSenha.setAttribute('style', 'color:black');
        tituloSenha.innerHTML = 'Senha';
        validaSenha = true;
    }
});


const buttonLogin = document.querySelector('.login');
const buttonSearch = document.querySelector('.search');
const dialogLogin = document.querySelector('.dialogLogin');
const dialogSearch = document.querySelector('.dialogSearch');
const fechar = document.querySelector('.fechar');
const fechar2 = document.querySelector('.fechar2');

buttonLogin.addEventListener('click', () => {
    dialogLogin.showModal();
})

buttonSearch.addEventListener('click', () => {
    dialogSearch.showModal();
    ul = document.createElement('ul');
    container.appendChild(ul);
})

fechar.addEventListener('click', () => {
    dialogLogin.close();
    email.value = '';
    password.value = '';
})
fechar2.addEventListener('click', () => {
    dialogSearch.close();
    container.removeChild(ul);
    palavra.value = '';
})


