let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = null;
let cart = [];

function saveUsers(){
    localStorage.setItem("users", JSON.stringify(users));
}

function showRegister(){
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("registerScreen").style.display = "block";
    clearMessages();
}

function showLogin(){
    document.getElementById("registerScreen").style.display = "none";
    document.getElementById("catalogScreen").style.display = "none";
    document.getElementById("cartScreen").style.display = "none";
    document.getElementById("loginScreen").style.display = "block";
    clearMessages();
}

function showCatalog(){
    document.getElementById("cartScreen").style.display = "none";
    document.getElementById("catalogScreen").style.display = "block";
    clearMessages();
}

function showCart(){
    document.getElementById("catalogScreen").style.display = "none";
    document.getElementById("cartScreen").style.display = "block";
    renderCart();
    clearMessages();
}

function register(){
    let name = document.getElementById("regName").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let pass = document.getElementById("regPass").value.trim();

    if(!name || !email || !pass){
        document.getElementById("registerMessage").innerText = "Completa todos los campos";
        return;
    }

    if(!email.includes("@")){
        document.getElementById("registerMessage").innerText = "Correo inválido";
        return;
    }

    let exists = users.find(u => u.email === email);
    if(exists){
        document.getElementById("registerMessage").innerText = "Correo ya registrado";
        return;
    }

    users.push({name, email, pass});
    saveUsers();

    document.getElementById("registerMessage").innerText = "Cuenta creada ✔";

    document.getElementById("regName").value = "";
    document.getElementById("regEmail").value = "";
    document.getElementById("regPass").value = "";
}

function login(){
    let email = document.getElementById("loginEmail").value.trim();
    let pass = document.getElementById("loginPass").value.trim();

    let found = users.find(u => u.email === email && u.pass === pass);

    if(found){
        currentUser = found;
        cart = [];
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("catalogScreen").style.display = "block";
        document.getElementById("loginError").innerText = "";
    } else {
        document.getElementById("loginError").innerText = "Correo o contraseña incorrectos";
    }
}

function logout(){
    currentUser = null;
    cart = [];

    document.getElementById("catalogScreen").style.display = "none";
    document.getElementById("cartScreen").style.display = "none";
    document.getElementById("loginScreen").style.display = "block";

    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPass").value = "";

    clearPaymentForm();
    renderCart();
}

function addToCart(name, price){
    cart.push({name, price});
    renderCart(); 
    alert("Agregado al carrito 🎮");
}

function renderCart(){
    let list = document.getElementById("cartList");
    let totalElement = document.getElementById("total");

    if(!list || !totalElement) return;

    list.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item.name + " - $" + item.price;
        list.appendChild(li);
        total += item.price;
    });

    totalElement.innerText = total;
}

function pay(){
    if(cart.length === 0){
        document.getElementById("paymentMessage").innerText = "Carrito vacío";
        return;
    }

    let cardNumber = document.getElementById("cardNumber").value.trim();
    let cardName = document.getElementById("cardName").value.trim();
    let cardType = document.getElementById("cardType").value.trim().toLowerCase();
    let cvv = document.getElementById("cvv").value.trim();

    if(!cardNumber || cardNumber.length !== 16 || isNaN(cardNumber)){
        document.getElementById("paymentMessage").innerText = "Número de tarjeta inválido";
        return;
    }

    if(!cardName){
        document.getElementById("paymentMessage").innerText = "Ingresa el nombre en la tarjeta";
        return;
    }

    if(!cvv || cvv.length !== 3 || isNaN(cvv)){
        document.getElementById("paymentMessage").innerText = "CVV inválido";
        return;
    }

    if(cardType !== "credito" && cardType !== "débito" && cardType !== "debito"){
        document.getElementById("paymentMessage").innerText = "Tipo de tarjeta inválido";
        return;
    }

    document.getElementById("paymentMessage").innerText = "Pago exitoso 🎉";

    cart = [];
    renderCart();
    clearPaymentForm();
}

function clearPaymentForm(){
    document.getElementById("cardNumber").value = "";
    document.getElementById("cardName").value = "";
    document.getElementById("cardType").value = "";
    document.getElementById("cvv").value = "";
}

function clearMessages(){
    document.getElementById("loginError").innerText = "";
    document.getElementById("registerMessage").innerText = "";
    document.getElementById("paymentMessage").innerText = "";
}
