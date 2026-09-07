document.addEventListener("DOMContentLoaded", () => {
  const buildGuardada = localStorage.getItem("buildSeleccionada");
  const cpu = document.getElementById("cotizacion-cpu");
  const placa = document.getElementById("cotizacion-placa");
  const ram = document.getElementById("cotizacion-ram");
  const gpu = document.getElementById("cotizacion-gpu");
  const fuente = document.getElementById("cotizacion-fuente");
  const subtotal = document.getElementById("subtotal-cotizacion");
  const formulario = document.getElementById("form-cotizacion");
  const mensaje = document.getElementById("mensaje-cotizacion");
  const resumen = document.getElementById("resumen-cotizacion");

  if (!buildGuardada) {
    cpu.textContent = "No seleccionado";
    placa.textContent = "No seleccionado";
    ram.textContent = "No seleccionado";
    gpu.textContent = "No seleccionado";
    fuente.textContent = "No seleccionado";
    subtotal.textContent = "$0";
    mensaje.textContent = "Primero debes crear y validar una build.";
    formulario.style.display = "none";
    return;
  }

  const build = JSON.parse(buildGuardada);

  function formatoPrecio(precio) {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP"
    }).format(precio);
  }

  cpu.textContent = `${build.cpu.marca} ${build.cpu.modelo}`;
  placa.textContent = `${build.placa.marca} ${build.placa.modelo}`;
  ram.textContent = `${build.ram.marca} ${build.ram.modelo}`;
  gpu.textContent = `${build.gpu.marca} ${build.gpu.modelo}`;
  fuente.textContent = `${build.fuente.marca} ${build.fuente.modelo}`;
  subtotal.textContent = formatoPrecio(build.total);

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById("nombre-cotizacion").value.trim();
    const correo = document.getElementById("correo-cotizacion").value.trim();
    const telefono = document.getElementById("telefono-cotizacion").value.trim();
    const comentario = document.getElementById("comentario-cotizacion").value.trim();

    if (nombre === "" || correo === "") {
      mensaje.textContent = "Debes ingresar tu nombre y correo.";
      return;
    }

    const cotizacion = {
      id: Date.now(),
      cliente: {
        nombre: nombre,
        correo: correo,
        telefono: telefono
      },
      comentario: comentario,
      build: build,
      fecha: new Date().toLocaleDateString("es-CL"),
      estado: "Solicitada"
    };

    const cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    cotizaciones.push(cotizacion);
    localStorage.setItem("cotizaciones", JSON.stringify(cotizaciones));

    mensaje.textContent = "Cotización solicitada correctamente.";

    resumen.innerHTML = `
      <h2>Resumen de Cotización</h2>
      <p><strong>Cotización:</strong> #${cotizacion.id}</p>
      <p><strong>Cliente:</strong> ${cotizacion.cliente.nombre}</p>
      <p><strong>Correo:</strong> ${cotizacion.cliente.correo}</p>
      <p><strong>Teléfono:</strong> ${cotizacion.cliente.telefono || "No ingresado"}</p>
      <p><strong>Fecha:</strong> ${cotizacion.fecha}</p>
      <hr>
      <p><strong>CPU:</strong> ${build.cpu.marca} ${build.cpu.modelo}</p>
      <p><strong>Placa Madre:</strong> ${build.placa.marca} ${build.placa.modelo}</p>
      <p><strong>RAM:</strong> ${build.ram.marca} ${build.ram.modelo}</p>
      <p><strong>GPU:</strong> ${build.gpu.marca} ${build.gpu.modelo}</p>
      <p><strong>Fuente:</strong> ${build.fuente.marca} ${build.fuente.modelo}</p>
      <hr>
      <p><strong>Total:</strong> ${formatoPrecio(build.total)}</p>
      <p><strong>Estado:</strong> ${cotizacion.estado}</p>
      <p><strong>Comentario:</strong> ${cotizacion.comentario || "Sin comentarios"}</p>
    `;

    resumen.style.display = "block";
    formulario.reset();
  });
});