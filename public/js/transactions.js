const myModal= new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {transactions:[]};

document.getElementById("button-logout").addEventListener("click", logout);

//add lançamento 
document.getElementById("transation-form").addEventListener("submit",function(e){
    e.preventDefault();

    const value= parseFloat(document.getAnimations("value-input").value);
    const description =document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({value: value, type: type, descripton: description, date: date});
    
   saveData(data);
    e.target.reset();
    myModal.hide();
    getTransations();
   
   alert("lançamento add");
});

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href="index.html";
}


checkLogged();

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged =session;
    }

    if(!logged){
        window.location.href ="home.html";
        return;
    }
    const dadaUser= localStorage.getItem(logged);
    if(dataUser){
        data = JSON.parse(dataUser);
    }
    getTransations();
}

function getTransations(){
    const transactions =data.transactions;
    let transactionsHtml = ``;

    if(transactions.length){
        transactions.forEach((item)=> {
            let type ="entrada";
            if(item.type==="2"){
                type="saída";
            }
            transactionsHtml +=`
            <tr>
            <th scope="row"> ${item.date}</th>
            <td>${item.value.toFixed(2)} </th>
            <td>${item.type} </th>
            <td>${item.description} </th>
            </tr>
            `
        });
        document.getElementById("transactions-list").innerHTML=transactions;

    }
}

function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}