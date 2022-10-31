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
let li;
let ul;

botaoLogar.addEventListener('click', async () =>{
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
                li = document.createElement('li');
                li.innerHTML = advice[i].advice;
                ul.appendChild(li);
            }
        });
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
    ul = document.createElement('ul');
    container.appendChild(ul);
    dialogSearch.showModal();
})

fechar.addEventListener('click', () => {
    dialogLogin.close();
})
fechar2.addEventListener('click', () => {
    dialogSearch.close();
    container.removeChild(ul);
})
