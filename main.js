// Formulario: arma un mensaje con los datos y abre WhatsApp. No se envía nada a ningún servidor.
(function () {
  'use strict';
  var WA_NUMBER = 'PENDIENTE'; // PENDIENTE WHATSAPP: código país + 9 + área + número, sin espacios ni signos (ej. 5492911234567)

  var form = document.getElementById('form');
  var done = document.getElementById('done');
  var error = document.getElementById('form-error');
  var retry = document.getElementById('wa-retry');
  var reset = document.getElementById('reset');
  if (!form) return;

  var LABELS = [
    ['nombre', 'Nombre'],
    ['tel', 'WhatsApp'],
    ['auto', 'Vehículo'],
    ['patente', 'Patente'],
    ['aseguradora', 'Aseguradora'],
    ['siniestro', 'N.º de siniestro'],
    ['tipo', 'Tipo de reclamo'],
    ['descripcion', 'Qué pasó']
  ];

  function clean(value, max) {
    // Quita caracteres de control y recorta; encodeURIComponent se encarga del resto.
    return String(value || '').replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '').trim().slice(0, max);
  }

  function showError(msg, field) {
    error.textContent = msg;
    error.hidden = false;
    if (field) field.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    error.hidden = true;

    // Honeypot: un bot que complete el campo oculto no genera nada.
    if (form.elements.web.value) return;

    var nombre = form.elements.nombre;
    var tel = form.elements.tel;
    if (!clean(nombre.value, 80)) return showError('Completá tu nombre y apellido.', nombre);
    if (!tel.checkValidity() || clean(tel.value, 25).replace(/\D/g, '').length < 8) {
      return showError('Revisá el número de WhatsApp (solo números, mínimo 8 dígitos).', tel);
    }

    var lines = ['Hola, quiero pedir un presupuesto para el seguro.', ''];
    LABELS.forEach(function (pair) {
      var v = clean(form.elements[pair[0]].value, pair[0] === 'descripcion' ? 1000 : 80);
      if (pair[0] === 'patente') v = v.toUpperCase();
      if (v) lines.push(pair[1] + ': ' + v);
    });

    var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
    retry.href = url;

    var win = window.open(url, '_blank');
    if (win) win.opener = null;
    form.hidden = true;
    done.hidden = false;
    done.focus();
    if (!win) window.location.href = url;
  });

  reset.addEventListener('click', function () {
    form.reset();
    done.hidden = true;
    form.hidden = false;
    form.elements.nombre.focus();
  });
})();
