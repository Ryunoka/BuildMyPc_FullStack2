document.addEventListener("DOMContentLoaded", () => {
  const build = JSON.parse(localStorage.getItem("buildSeleccionada"));

  const cpuTxt = document.getElementById("comp-cpu");
  const placaTxt = document.getElementById("comp-placa");
  const ramTxt = document.getElementById("comp-ram");
  const gpuTxt = document.getElementById("comp-gpu");
  const fuenteTxt = document.getElementById("comp-fuente");

  const estadoSocket = document.getElementById("estado-socket");
  const detalleSocket = document.getElementById("detalle-socket");
  const estadoRam = document.getElementById("estado-ram");
  const detalleRam = document.getElementById("detalle-ram");
  const estadoFuente = document.getElementById("estado-fuente");
  const detalleFuente = document.getElementById("detalle-fuente");

  const tituloResultado = document.getElementById("titulo-resultado");
  const mensajeResultado = document.getElementById("mensaje-resultado");
  const btnCotizacion = document.getElementById("btn-cotizacion");

  if (!build) {
    tituloResultado.textContent = "No hay una Build seleccionada";
    mensajeResultado.textContent = "Primero debes seleccionar los componentes.";
    return;
  }

  const { cpu, placa, ram, gpu, fuente } = build;

  cpuTxt.textContent = `${cpu.marca} ${cpu.modelo}`;
  placaTxt.textContent = `${placa.marca} ${placa.modelo}`;
  ramTxt.textContent = `${ram.marca} ${ram.modelo}`;
  gpuTxt.textContent = `${gpu.marca} ${gpu.modelo}`;
  fuenteTxt.textContent = `${fuente.marca} ${fuente.modelo}`;

  if (cpu.socket === placa.socket) {
    estadoSocket.textContent = "Compatible";
    detalleSocket.textContent = `Ambos utilizan socket ${cpu.socket}.`;
  } else {
    estadoSocket.textContent = "No compatible";
    detalleSocket.textContent = `CPU ${cpu.socket} / Placa ${placa.socket}.`;
  }

  if (placa.tiposMemoriaSoportados.includes(ram.tipoMemoria)) {
    estadoRam.textContent = "Compatible";
    detalleRam.textContent = `La placa soporta ${ram.tipoMemoria}.`;
  } else {
    estadoRam.textContent = "No compatible";
    detalleRam.textContent = `La RAM es ${ram.tipoMemoria}.`;
  }

  const watts = 50 + (cpu.tdp || 0) + (gpu.tdp || 0);
  const wattsConMargen = Math.round(watts * 1.2);

  if (fuente.potenciaWatts >= wattsConMargen) {
    estadoFuente.textContent = "Compatible";
    detalleFuente.textContent = `Fuente de ${fuente.potenciaWatts} W suficiente.`;
  } else {
    estadoFuente.textContent = "No compatible";
    detalleFuente.textContent = `Se recomiendan ${wattsConMargen} W y la fuente entrega ${fuente.potenciaWatts} W.`;
  }

  if (build.compatible === false) {
    tituloResultado.textContent = "✕ Build No Compatible";
    mensajeResultado.textContent = build.motivo || "Se encontraron componentes incompatibles.";

    btnCotizacion.style.pointerEvents = "none";
    btnCotizacion.style.opacity = "0.5";
  } else {
    tituloResultado.textContent = "✓ Build Compatible";
    mensajeResultado.textContent = "Todos los componentes seleccionados son compatibles.";

    btnCotizacion.style.pointerEvents = "auto";
    btnCotizacion.style.opacity = "1";
  }
});