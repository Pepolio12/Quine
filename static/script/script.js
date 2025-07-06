const Minterminos = [];
const DontCare = [];

document.getElementById("Minterminos").addEventListener("keypress",(event) =>{
  if (event.key === 'Enter'){
    const Cantidad = event.target.value;
    if (Cantidad != ""){
      Minterminos.push(Cantidad);

      const boton = document.createElement("button");
      boton.value = String(Cantidad);
      boton.innerText = String(Cantidad);
      boton.id = "BotonesDontCare";

      boton.addEventListener("click", function () {
        const Value = boton.value;
        for (let i = 0; i < Minterminos.length; i++) {
          if (Minterminos[i] === Value) {
            Minterminos.splice(i, 1);
            break;
          }
        }
        boton.remove();
      });

      document.getElementById("Minter").appendChild(boton);
    }    
    event.target.value = '';
    event.target.focus();
  }
})

document.getElementById("DontCare").addEventListener("keypress",(event) =>{
  if (event.key === 'Enter'){
    const Cantidad1 = event.target.value;
    if (Cantidad1 != ""){
      DontCare.push(Cantidad1);

      const boton = document.createElement("button");
      boton.value = String(Cantidad1);
      boton.innerText = String(Cantidad1);
      boton.id = "BotonesDontCare";

      boton.addEventListener("click", function () {
        const Value = boton.value;
        for (let i = 0; i < DontCare.length; i++) {
          if (DontCare[i] === Value) {
            DontCare.splice(i, 1);
            break;
          }
        }
        boton.remove();
      });

      document.getElementById("Dont").appendChild(boton);
    }    
    event.target.value = '';
    event.target.focus();
  }
})

document.getElementById("Limpiar").addEventListener("click",()=>{
  Minterminos.length = 0;
  DontCare.length = 0;
  location.reload();
})

document.getElementById("Comenzar").addEventListener("click",()=>{
    fetch('/enviar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({Minterminos, DontCare})
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      Tablas = data.mensaje;
      
      const Key1 = Object.keys(Tablas); // Obtener las claves de cada una de las Tablas
      
      document.getElementById("EcuacionLogica").innerHTML = "RESULTADO:  " + Tablas.Resultado;

      const Tope = "<table><tr><th>Minterminos</th><th>Binario</th><th>Cantidad de 1s</th></tr>";
      let Plantilla = '';

      Plantilla += Tope;
      const Key2 = Object.keys(Tablas["1"]);
      for (let j = 0; j < Key2.length; j++) {
          Plantilla += "<tr><td>"+ Key2[j] + "</td><td>" + Tablas["1"][Key2[j]][0] + "</td><td>"+ Tablas["1"][Key2[j]][1] +"</td></tr>"
        }
      Plantilla += "</table>";

      for (let i = 2; i < (Key1.length)-1; i++) {
        Plantilla += Tope;
        const Key2 = Object.keys(Tablas[Key1[i]]); // Obtener las claves de cada una de las Tablas
        for (let j = 0; j < Key2.length; j++) {
          Plantilla += "<tr><td>"+ Key2[j] + "</td><td>" + Tablas[Key1[i]][Key2[j]][0] + "</td><td>"+ Tablas[Key1[i]][Key2[j]][1] +"</td></tr>"
        }
        Plantilla += "</table>";
      }
      document.getElementById("Tablas").innerHTML = Plantilla;

      console.log('Claves en Tablas:', Key1);
      console.log(Tablas["1"][0])
    })
})

