 function login(){
            let user = document.getElementById("user").value;
            let pass = document.getElementById("pass").value;

            if(user == "admin" && pass == "1234"){
            alert("Bienvenido");
            location.href = "../Principal.html";
            }else{
                alert("Datos incorrectos");
            }

            return false; 
            }
