const dialogLogin = document.querySelector('.dialogLogin');
const buttonLogin = document.querySelector('.login');

function clear(element){
    if(element){
        while(element.firstChild){
            element.removeChild(element.firstChild)
        }
    }
};

buttonLogin.addEventListener('click', () => {
    dialogLogin.showModal();
});

const tituloEmail = document.querySelector('.emailText');
let validaEmail = false;
const email = document.querySelector('.loginEmail');

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

const tituloSenha = document.querySelector('.senhaText');
let validaSenha = false;
const password = document.querySelector('.loginSenha');

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

const fechar = document.querySelector('.fechar');

fechar.addEventListener('click', () => {
    dialogLogin.close();
    email.value = '';
    password.value = '';
});

const login = {
    email: 'eve.holt@reqres.in',
    password: 'whatever'
};
const botaoEntrar = document.querySelector('.sendLogar');
const buttonSearch = document.querySelector('.search');
const mensagem = document.querySelector('.mensagem');

botaoEntrar.addEventListener('click', async () =>{
    if(validaEmail && validaSenha){
    let users = {
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
        clear(mensagem);
        let mensagemErro = document.createElement('p');
        mensagemErro.innerHTML = 'Preencha os campos corretamente!';
        mensagem.appendChild(mensagemErro);
    }
    });

const botaoDeslogar = document.querySelector('.logout');

botaoDeslogar.addEventListener('click', () => {
    buttonSearch.className = 'search';
    localStorage.removeItem('token');
    });

const dialogSearch = document.querySelector('.dialogSearch');
let ul;
const container = document.querySelector('.containerAdvice');

buttonSearch.addEventListener('click', () => {
    dialogSearch.showModal();
    ul = document.createElement('ul');
    container.appendChild(ul);
    });


let li;
const botaoBuscar = document.querySelector('.sendBuscar');
let palavra = document.querySelector('.palavraChave');

botaoBuscar.addEventListener('click', () => {
    if(localStorage.token == '"QpwL5tke4Pnpja7X4"'){
        fetch(`https://api.adviceslip.com/advice/search/${palavra.value}`)
        .then(resp => {
            return resp.json();
        })
        .then(dataAdvice => {
            console.log(dataAdvice);
            let advice = dataAdvice.slips;
            clear(ul);
            for(let i = 0; i<advice.length;i++){
                    li = document.createElement('li');
                    li.innerHTML = `${i+1}º conselho contendo '${dataAdvice.query}': "${advice[i].advice}" `;
                    li.className = 'conselhos';
                    ul.appendChild(li);
                }
        })
        .catch((e) => {
            console.log(e);
            li = document.createElement('li');
            li.innerHTML = `erro : No advice slips found matching that search term.`;
            ul.appendChild(li);
        });
    }else{
        clear(ul);
        li = document.createElement('li');
        li.innerHTML = 'Usuário Deslogado';
        ul.appendChild(li);
    };
    palavra.value = '';
    palavra.focus();
});

const fechar2 = document.querySelector('.fechar2');

fechar2.addEventListener('click', () => {
    dialogSearch.close();
    container.removeChild(ul);
    palavra.value = '';
})
