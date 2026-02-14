// Escucha el evento cuando el usuario intenta enviar el formulario
document.getElementById("registroForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Evita que la página se recargue

    // Se obtienen todos los valores del formulario
    let nombre = document.getElementById("nombre").value;
    let usuario = document.getElementById("usuario").value;
    let correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value;
    let direccion = document.getElementById("direccion").value;
    let tarjeta = document.getElementById("tarjeta").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (!nombre || !usuario || !correo || !telefono || !direccion || !tarjeta || !password || !confirmPassword) {
        document.getElementById("mensajeError").innerText = "Error en el formulario";
        return;
    }


    if (password !== confirmPassword) {
        document.getElementById("mensajeError").innerText = "Error en el formulario";
        return;
    }

    alert("Registro exitoso");
});
