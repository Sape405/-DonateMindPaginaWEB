// Configura tu Firebase con tus datos reales
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  databaseURL: "https://TU_DOMINIO.firebaseio.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_BUCKET.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#donate form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const nombre = form.nombre.value.trim();
      const monto = parseFloat(form.monto.value);

      if (nombre && !isNaN(monto)) {
        db.ref("donaciones").push({
          nombre,
          monto,
          fecha: new Date().toISOString()
        }).then(() => {
          alert("¡Gracias por tu donación!");
          form.reset();
        }).catch(err => {
          console.error(err);
          alert("Error al registrar la donación.");
        });
      } else {
        alert("Por favor, llena todos los campos correctamente.");
      }
    });
  }
});
