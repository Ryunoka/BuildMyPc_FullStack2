/* ==========================================================================
   RENDERIZADO Y FILTRADO DEL CATÁLOGO
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-catalogo");
  const inputTexto = document.getElementById("buscar-texto");
  const selectTipo = document.getElementById("filtro-tipo");
  const inputMin = document.getElementById("precio-min");
  const inputMax = document.getElementById("precio-max");
  const divError = document.getElementById("mensaje-error-filtro");

  if (!contenedor) return;

  // Función principal para renderizar las tarjetas de componentes
  function renderizarCatalogo(componentes) {
    contenedor.innerHTML = "";

    if (componentes.length === 0) {
      contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--texto-suave);">No se encontraron componentes con los filtros aplicados.</p>`;
      return;
    }

    componentes.forEach(prod => {
      const tarjeta = document.createElement("article");
      tarjeta.className = "tarjeta";

      // Formato moneda CLP
      const precioFormateado = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP"
      }).format(prod.precio);

      // Estado descontinuado
      const etiquetaEstado = prod.descontinuado
        ? `<span style="color: var(--error); font-weight: bold;">[Descontinuado]</span>`
        : `<span style="color: var(--primario);">Disponible</span>`;

      tarjeta.innerHTML = `
        <a href="${prod.urlDetalle}">
            <img src="${prod.imagen}" alt="${prod.marca} ${prod.modelo}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 6px; margin-bottom: 12px;">
        </a>
        <span class="temas"><span>${prod.tipo}</span> ${etiquetaEstado}</span>
        <h3 style="margin: 10px 0 6px;">
            <a href="${prod.urlDetalle}" style="color: inherit; text-decoration: none;">
                ${prod.marca} ${prod.modelo}
            </a>
        </h3>
        <p>${prod.descripcion}</p>
        <div class="acciones" style="align-items: center; justify-content: space-between;">
            <p class="precio" style="font-size: 1.3rem; font-weight: bold; color: var(--primario); margin: 0;">${precioFormateado}</p>
            <button type="button" class="btn-resuelto" ${prod.descontinuado ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
                + Agregar
            </button>
        </div>
      `;

      contenedor.appendChild(tarjeta);
    });
  }

  // Función de filtrado con validación de precios (Min <= Max)
  function aplicarFiltros() {
    const texto = inputTexto.value.trim().toLowerCase();
    const tipo = selectTipo.value;
    const min = parseFloat(inputMin.value) || 0;
    const max = parseFloat(inputMax.value) || Infinity;

    // Validación de rango de precio
    if (min > max && max !== Infinity) {
      divError.textContent = "El precio mínimo no puede ser mayor al precio máximo.";
      return;
    } else {
      divError.textContent = "";
    }

    const filtrados = inventarioComponentes.filter(prod => {
      const coincideTexto = (prod.marca + " " + prod.modelo + " " + prod.descripcion).toLowerCase().includes(texto);
      const coincideTipo = tipo === "todos" || prod.tipo === tipo;
      const coincidePrecio = prod.precio >= min && prod.precio <= max;

      return coincideTexto && coincideTipo && coincidePrecio;
    });

    renderizarCatalogo(filtrados);
  }

  // Listeners para actualización en tiempo real
  inputTexto.addEventListener("input", aplicarFiltros);
  selectTipo.addEventListener("change", aplicarFiltros);
  inputMin.addEventListener("input", aplicarFiltros);
  inputMax.addEventListener("input", aplicarFiltros);

  // Carga inicial de datos
  renderizarCatalogo(inventarioComponentes);
});