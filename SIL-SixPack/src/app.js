"use strict";

(() => {
  const form = document.getElementById("flight-form");
  const status = document.getElementById("system-status");
  const canvases = {
    asi: document.getElementById("gauge-asi"),
    ai: document.getElementById("gauge-ai"),
    alt: document.getElementById("gauge-alt"),
    tc: document.getElementById("gauge-tc"),
    hi: document.getElementById("gauge-hi"),
    vsi: document.getElementById("gauge-vsi")
  };

  // Esta función es el único punto de entrada de datos para el tablero.
  // En HIL podrá recibir una instantánea creada a partir del puerto serial.
  function renderSnapshot(snapshot) {
    let invalidCount = 0;
    for (const [key, field] of Object.entries(snapshot.fields)) {
      const input = form.elements.namedItem(key);
      const message = input.parentElement.querySelector(".field-error");
      input.setAttribute("aria-invalid", String(!field.valid));
      message.textContent = field.error;
      if (!field.valid) invalidCount += 1;
    }
    status.textContent = invalidCount === 0 ? "DATOS VÁLIDOS" : `${invalidCount} DATO${invalidCount === 1 ? "" : "S"} SIN VALIDEZ`;
    status.classList.toggle("status-error", invalidCount > 0);
    window.SixPackInstruments.renderAll(canvases, snapshot.fields);
  }

  function updateFromManual() {
    renderSnapshot(window.SixPackState.readManual(form));
  }

  form.addEventListener("input", updateFromManual);
  form.addEventListener("reset", () => requestAnimationFrame(updateFromManual));
  window.addEventListener("resize", updateFromManual);
  updateFromManual();
  window.setInterval(updateFromManual, 100);
})();
