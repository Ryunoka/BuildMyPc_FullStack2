/* ==========================================================================
   LÓGICA DEL ARMADOR DE BUILD (EP1)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const selectCpu = document.getElementById("select-cpu");
  const selectPlaca = document.getElementById("select-placa");
  const selectRam = document.getElementById("select-ram");
  const selectGpu = document.getElementById("select-gpu");
  const selectFuente = document.getElementById("select-fuente");

  const txtConsumo = document.getElementById("consumo-watts");
  const txtPrecio = document.getElementById("precio-total");
  const txtEstado = document.getElementById("estado-build");
  const divError = document.getElementById("mensaje-error-build");
  const btnCotizar = document.getElementById("btn-cotizar");
  const btnValidar = document.getElementById("btn-validar");

  if (!selectCpu) return;

  // 1. Cargar las opciones desde data.js
  function cargarOpciones() {
    inventarioComponentes.forEach(item => {
      if (item.descontinuado) return; // No listar descontinuados en el armador

      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = `${item.marca} ${item.modelo} - $${item.precio.toLocaleString("es-CL")}`;

      if (item.tipo === "CPU") selectCpu.appendChild(option);
      if (item.tipo === "Placa") selectPlaca.appendChild(option);
      if (item.tipo === "RAM") selectRam.appendChild(option);
      if (item.tipo === "GPU") selectGpu.appendChild(option);
      if (item.tipo === "Fuente") selectFuente.appendChild(option);
    });
  }

  // 2. Obtener objeto por ID
  function obtenerItem(id) {
    return inventarioComponentes.find(prod => prod.id === id);
  }

  // 3. Calcular consumos y precios
  function actualizarCalculos() {
    const cpu = obtenerItem(selectCpu.value);
    const placa = obtenerItem(selectPlaca.value);
    const ram = obtenerItem(selectRam.value);
    const gpu = obtenerItem(selectGpu.value);
    const fuente = obtenerItem(selectFuente.value);

    // Suma de precios
    let total = 0;
    if (cpu) total += cpu.precio;
    if (placa) total += placa.precio;
    if (ram) total += ram.precio;
    if (gpu) total += gpu.precio;
    if (fuente) total += fuente.precio;

    // Cálculo de Watts (TDP CPU + TDP GPU + 50W base del sistema)
    let wattsConsumo = 50; 
    if (cpu) wattsConsumo += (cpu.tdp || 0);
    if (gpu) wattsConsumo += (gpu.tdp || 0);

    // Actualizar pantalla
    txtPrecio.textContent = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(total);
    txtConsumo.textContent = `${wattsConsumo} W`;

    // Validar reglas técnicas
    evaluarCompatibilidad(cpu, placa, ram, gpu, fuente, wattsConsumo);
  }

  // 4. Reglas de Validación de Compatibilidad (Exigencia del Caso)
 function evaluarCompatibilidad(cpu, placa, ram, gpu, fuente, watts) {

  // Si falta algún componente, todavía es borrador
  if (!cpu || !placa || !ram || !gpu || !fuente) {
    txtEstado.textContent = "Borrador (Incompleto)";
    txtEstado.style.color = "";
    localStorage.removeItem("buildSeleccionada");
    bloquearCotizacion(true);
    return;
  }

  // GUARDAMOS SIEMPRE LOS COMPONENTES ACTUALES
  const buildActual = {
    cpu: cpu,
    placa: placa,
    ram: ram,
    gpu: gpu,
    fuente: fuente,
    compatible: null,
    motivo: ""
  };

  localStorage.setItem(
    "buildSeleccionada",
    JSON.stringify(buildActual)
  );

  // CPU + placa
  if (cpu.socket !== placa.socket) {
    txtEstado.textContent = "Incompatible";
    txtEstado.style.color = "var(--error)";

    buildActual.compatible = false;
    buildActual.motivo =
      `El socket del CPU (${cpu.socket}) no coincide con la placa (${placa.socket}).`;

    localStorage.setItem(
      "buildSeleccionada",
      JSON.stringify(buildActual)
    );

    bloquearCotizacion(true);
    return;
  }

  // RAM + placa
  if (!placa.tiposMemoriaSoportados.includes(ram.tipoMemoria)) {
    txtEstado.textContent = "Incompatible";
    txtEstado.style.color = "var(--error)";

    buildActual.compatible = false;
    buildActual.motivo =
      `La RAM ${ram.tipoMemoria} no es compatible con la placa.`;

    localStorage.setItem(
      "buildSeleccionada",
      JSON.stringify(buildActual)
    );

    bloquearCotizacion(true);
    return;
  }

  // Fuente
  const wattsConMargen = Math.round(watts * 1.2);

  if (fuente.potenciaWatts < wattsConMargen) {
    txtEstado.textContent = "Incompatible";
    txtEstado.style.color = "var(--error)";

    buildActual.compatible = false;
    buildActual.motivo =
      `La fuente entrega ${fuente.potenciaWatts} W y se recomiendan ${wattsConMargen} W.`;

    localStorage.setItem(
      "buildSeleccionada",
      JSON.stringify(buildActual)
    );

    bloquearCotizacion(true);
    return;
  }

  // Si pasó todas las comprobaciones
  buildActual.compatible = true;
  buildActual.motivo = "Todos los componentes son compatibles.";

  localStorage.setItem(
    "buildSeleccionada",
    JSON.stringify(buildActual)
  );

  txtEstado.textContent = "Build Validada y Compatible";
  txtEstado.style.color = "var(--primario)";

  bloquearCotizacion(false);
}

function marcarIncompatible(motivo) {
  txtEstado.textContent = "Incompatible";
  txtEstado.style.color = "red";

  const buildActual = {
    cpu: cpu,
    placa: placa,
    ram: ram,
    gpu: gpu,
    fuente: fuente,
    compatible: false,
    motivo: motivo
  };

  localStorage.setItem("buildSeleccionada", JSON.stringify(buildActual));

  bloquearCotizacion(true);

  if (cpu.socket !== placa.socket) {
  const mensaje = `Socket CPU (${cpu.socket}) no coincide con Placa (${placa.socket}).`;
  divError.textContent = mensaje;
  marcarIncompatible(mensaje);
  return;
}

if (cpu.socket !== placa.socket) {
  const mensaje = `Socket CPU (${cpu.socket}) no coincide con Placa (${placa.socket}).`;
  divError.textContent = mensaje;
  marcarIncompatible(mensaje);
  return;
}

const watts = 50 + (cpu.tdp || 0) + (gpu.tdp || 0);
const wattsConMargen = Math.round(watts * 1.2);

if (fuente.potenciaWatts < wattsConMargen) {
  const mensaje = `La fuente entrega ${fuente.potenciaWatts} W y se recomiendan ${wattsConMargen} W.`;
  divError.textContent = mensaje;
  marcarIncompatible(mensaje);
  return;
}
}



  

  function bloquearCotizacion(bloquear) {
    if (bloquear) {
      btnCotizar.style.pointerEvents = "none";
      btnCotizar.style.opacity = "0.5";
    } else {
      btnCotizar.style.pointerEvents = "auto";
      btnCotizar.style.opacity = "1";
    }
  }

  // Listeners de cambios
  [selectCpu, selectPlaca, selectRam, selectGpu, selectFuente].forEach(select => {
    select.addEventListener("change", actualizarCalculos);
  });

  btnValidar.addEventListener("click", () => {
    actualizarCalculos();
    if (txtEstado.textContent.includes("Validada")) {
      alert("La configuración es completamente técnica y energéticamente compatible.");
    }
  });

  // Inicializar
  cargarOpciones();
});