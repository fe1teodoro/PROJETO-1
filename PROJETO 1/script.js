const botaoBuscar = document.querySelector('.sendBuscar');
const botaoLogar = document.querySelector('.sendLogar');
const botaoDeslogar = document.querySelector('.logout');
const email = document.querySelector('.loginEmail');
const password = document.querySelector('.loginSenha');
const container = document.querySelector('.containerAdvice');


const login = {
    email: 'eve.holt@reqres.in',
    password: 'whatever'
}
let users;
let li = document.createElement('li');

botaoLogar.addEventListener('click', () =>{
users = {
    email: email.value,
    password: password.value,
    token: ''
    }
    
fetch('https://reqres.in/api/login', {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(login)
})
.then((response) => response.json())
.then(function(data){
    users['token'] = JSON.stringify(data['token']);
    console.log(users);
    localStorage.token = users['token'];
})
});

botaoBuscar.addEventListener('click', () => {
    if(localStorage.token == '"QpwL5tke4Pnpja7X4"'){
        let palavra = document.querySelector('.palavraChave');
        fetch(`https://api.adviceslip.com/advice/search/${palavra.value}`)
        .then(resp => {
            return resp.json();
        })
        .then(dataAdvice => {
            let advice = dataAdvice.slips;
            for(let i = 0; i<advice.length;i++){
                li.innerHTML = advice[i].advice;
                container.appendChild(li);
            }
        });
    }else{
        li.innerHTML = 'Usuário Deslogado';
        container.appendChild(li);
    };
});

botaoDeslogar.addEventListener('click', () => {
    localStorage.removeItem('token');
})


const buttonLogin = document.querySelector('.login');
const buttonRegistrar = document.querySelector('.cadastro');
const dialogLogin = document.querySelector('.dialogLogin');
const dialogRegistrar = document.querySelector('.dialogRegistrar');
const fechar = document.querySelector('.fechar');
const fechar2 = document.querySelector('.fechar2');

buttonLogin.addEventListener('click', () => {
    dialogLogin.showModal()
})

buttonRegistrar.addEventListener('click', () => {
    dialogRegistrar.showModal();
})

fechar.addEventListener('click', () => {
    dialogLogin.close()
})
fechar2.addEventListener('click', () => {
    dialogRegistrar.close()
})


