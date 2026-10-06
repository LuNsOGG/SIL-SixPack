"use strict";

// Contrato único de variables para las entradas manuales y, más adelante, para la comunicación serial.
window.SixPackState = (() => {
  const limits = Object.freeze({
    airspeed: [0, 240],
    pitch: [-45, 45],
    roll: [-60, 60],
    altitude: [-2000, 60000],
    heading: [0, 359],
    turnRate: [-6, 6],
    verticalSpeed: [-4000, 4000],
    slip: [-1, 1]
  });

  function parseValue(raw, key) {
    const [min, max] = limits[key];
    if (String(raw).trim() === "") return { valid: false, value: null, error: "Falta un valor" };
    const value = Number(raw);
    if (!Number.isFinite(value)) return { valid: false, value: null, error: "Número inválido" };
    if (key === "heading" && !Number.isInteger(value)) {
      return { valid: false, value: null, error: "Use grados enteros" };
    }
    if (value < min || value > max) {
      return { valid: false, value: null, error: `Rango: ${min} a ${max}` };
    }
    return { valid: true, value, error: "" };
  }

  function readManual(form) {
    const fields = {};
    for (const key of Object.keys(limits)) {
      fields[key] = parseValue(form.elements.namedItem(key).value, key);
    }
    return { source: "manual", receivedAt: Date.now(), fields };
  }

  return { limits, parseValue, readManual };
})();
