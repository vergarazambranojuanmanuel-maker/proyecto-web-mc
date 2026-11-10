"use strict";

/* Acordeón de preguntas frecuentes (guia.html) */
function iniciarAcordeon() {
  var botones = document.querySelectorAll(".pregunta");
  botones.forEach(function (boton) {
    var panel = document.getElementById(boton.getAttribute("aria-controls"));
    cambiar(boton, panel, false);
    boton.addEventListener("click", function () {
      var abierto = boton.getAttribute("aria-expanded") === "true";
      cambiar(boton, panel, !abierto);
    });
  });
}

function cambiar(boton, panel, abrir) {
  boton.setAttribute("aria-expanded", String(abrir));
  panel.hidden = !abrir;
}

/* Validación del formulario (contacto.html) */
function iniciarFormulario() {
  var form = document.getElementById("form-contacto");
  var resumen = document.getElementById("resumen");
  var exito = document.getElementById("exito");

  form.setAttribute("novalidate", "");

  var reglas = [
    { id: "nombre", mensaje: "Escribe tu nombre completo.", valido: function (v) { return v.trim().length > 1; } },
    { id: "correo", mensaje: "Escribe un correo válido, por ejemplo nombre@dominio.com.", valido: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); } },
    { id: "mensaje", mensaje: "Escribe tu mensaje (mínimo 10 caracteres).", valido: function (v) { return v.trim().length >= 10; } }
  ];

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    exito.hidden = true;
    var errores = [];

    reglas.forEach(function (regla) {
      var campo = document.getElementById(regla.id);
      var texto = document.getElementById("e-" + regla.id);
      if (regla.valido(campo.value)) {
        campo.removeAttribute("aria-invalid");
        texto.textContent = "";
      } else {
        campo.setAttribute("aria-invalid", "true");
        texto.textContent = regla.mensaje;
        errores.push(regla);
      }
    });

    if (errores.length > 0) {
      resumen.hidden = false;
      resumen.textContent = "El formulario tiene " + errores.length + (errores.length === 1 ? " error. " : " errores. ") + "Corrígelos e inténtalo de nuevo.";
      document.getElementById(errores[0].id).focus();
      return;
    }

    resumen.hidden = true;
    resumen.textContent = "";
    form.reset();
    exito.textContent = "Mensaje enviado correctamente. ¡Gracias por escribirnos!";
    exito.hidden = false;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".pregunta")) { iniciarAcordeon(); }
  if (document.getElementById("form-contacto")) { iniciarFormulario(); }
});
