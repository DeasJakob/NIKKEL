//modal ** fecha automaticamente**

const myModal= new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");


checkLogged();

//logar no sistema 
document.getElementById("login-form").addEventListener("submit",function(e){
   e.preventDefault();
   
   const email= document.getElementById("email-input").value;
   const senha= document.getElementById("senha-input").value;
   const checksession =  document.getElementById("session-check").checked;


   const account = getAccount(email);

   if(!account){
    alert("verifiquecar usuario ou senha.");
    return;

}

if(account){
    if(account.senha !== senha){
        alert("verifiquecar usuario ou senha.");
    return;
    }

    saveSassion(email, checksession);
    
    window.location.href = "home.html"

}

});

//criar conta 

document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email= document.getElementById("email-create-input").value;
    const senha= document.getElementById("password-create-input").value;

    if(email.length<5){
        alert("preencha com email valido");
        return;
    }

    if(senha.length<4){
        alert("senha no minimo com 4 digitos")
        return;
    }

    salvarConta({
        login: email,
        senha: senha,
        trasactions:[]
    });

    myModal.hide();

    alert("conta criada com sucesso");

});

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged =session;


    }

    if(logged){
        saveSassion(logged, session);
        window.location.href ="home.html";
    }

}




function salvarConta(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSassion(data, saveSassion){
    if(saveSassion){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key){
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account);
    }

    return "";
}