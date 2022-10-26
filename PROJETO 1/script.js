
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


