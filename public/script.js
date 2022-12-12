const dialogLogin = document.querySelector('.dialogLogin');
const buttonLogin = document.querySelector('.login');
const buttonRegister = document.querySelector('.register');

function clear(element){
    if(element){
        while(element.firstChild){
            element.removeChild(element.firstChild)
        }
    }
};

buttonLogin.addEventListener('click', () => {
    dialogLogin.showModal();
    email.value = '';
    password.value = '';
});

buttonRegister.addEventListener('click', () =>{

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
const mensagem = document.querySelector('.mensagem');

fechar.addEventListener('click', () => {
    dialogLogin.close();
    email.value = '';
    password.value = '';
    mensagem.removeChild(mensagem.firstChild);
    tituloSenha.setAttribute('style', 'color:black');
    tituloSenha.innerHTML = 'Senha';
    tituloEmail.setAttribute('style', 'color:black');
    tituloEmail.innerHTML = 'Email';
});


const botaoEntrar = document.querySelector('.sendLogar');
const buttonSearch = document.querySelector('.search');

botaoEntrar.addEventListener('click', async () =>{
    if(validaEmail && validaSenha){
    let users = {
        email: email.value,
        password: password.value,
        }
        
    let data = await (fetch('http://localhost:3000/login', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(users)
    })
    // .then((response) => response.json()))
    .then((response) => {
        if(response.ok)
            return response.json()  
        return Promise.reject(response)
    })).then((data) => {
        sessionStorage.token = data.token
        sessionStorage.user = users.email
        dialogLogin.close();
    }).catch((error) => {
        error.json().then((json) =>{
            clear(mensagem);
            let mensagemErro = document.createElement('p');
            mensagemErro.innerHTML = `${json.msg}`;
            mensagem.appendChild(mensagemErro);
        })
    })


    buttonSearch.className = 'green';
    mensagem.removeChild (mensagem.firstChild);
    }else{
        clear(mensagem);
        let mensagemErro = document.createElement('p');
        mensagemErro.innerHTML = 'Preencha os campos corretamente!';
        mensagem.appendChild(mensagemErro);
    }
    });

const botaoDeslogar = document.querySelector('.logout');

botaoDeslogar.addEventListener('click', () => {
    buttonSearch.className = 'search blue hover';
    sessionStorage.removeItem('token');
    });

const dialogSearch = document.querySelector('.dialogSearch');
let ul;
const container = document.querySelector('.containerAdvice');

buttonSearch.addEventListener('click', () => {
    if(sessionStorage.token){
    dialogSearch.showModal();
    ul = document.createElement('ul');
    container.appendChild(ul);
    }
    });


let li;
const botaoBuscar = document.querySelector('.sendBuscar');
const keyWord = document.querySelector('.keyWord');

botaoBuscar.addEventListener('click', () => {
    let keyword = keyWord.value
    if(keyword){
    if(sessionStorage.token){
        fetch('http://localhost:3000/conselhos?'+ new URLSearchParams({keyWord: keyword}))
        .then(resp => {
            console.log(resp)
            return resp.json();
        })
        .then(dataAdvice => {
            console.log(dataAdvice);
            let advice = dataAdvice.conselho;
            clear(ul);
            if(advice.length>0){
            for(let i = 0; i<advice.length;i++){
                    li = document.createElement('li');
                    li.innerHTML = `${i+1}º conselho contendo "${keyword}": "${advice[i].conselho}" `;
                    li.className = 'conselhos';
                    ul.appendChild(li);
                }
            }else{
                li = document.createElement('li');
                li.innerHTML = `erro : No advice slips found matching that search term.`;
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
    keyWord.value = '';
    keyWord.focus();
    }else{
        clear(ul);
        li = document.createElement('li');
        li.innerHTML = 'Preencha o campo da palavra-chave';
        ul.appendChild(li);
    }
});

const botaoPostar = document.querySelector('.sendPostar')
const conteudoConselho = document.querySelector('.conselho')
const fechar2 = document.querySelector('.fechar2');

botaoPostar.addEventListener('click', async () =>{

    if(conteudoConselho.value){
    let aviso = {
        conselho: conteudoConselho.value,
        token: sessionStorage.token
        }
    await fetch('http://localhost:3000/conselhos', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(aviso)
    }).then((response) => {
        return response.json()
        }).then((data) => {
            clear(ul);
            li = document.createElement('li');
            li.innerHTML = data.msg;
            ul.appendChild(li);
        })
        conteudoConselho.value=''
        conteudoConselho.focus()
    }
    else{
        clear(ul);
        li = document.createElement('li');
        li.innerHTML = 'Preencha o campo conselho!';
        ul.appendChild(li);
    }
       
    })

fechar2.addEventListener('click', () => {
    dialogSearch.close();
    container.removeChild(ul);
    keyWord.value = '';
})