# BuildMyPC - Frontend (Evaluación Parcial 1)

Este proyecto corresponde a la capa de presentación (Frontend) para la plataforma **BuildMyPC**, una herramienta interactiva diseñada para armar computadores gamer personalizados, comprobar compatibilidad técnica, calcular el consumo energético y solicitar cotizaciones.

Proyecto desarrollado para la asignatura **Desarrollo FullStack II (DSY1104)**.

---

## 👥 Integrantes del Equipo
* **[Nombre y Apellido Integrante 1]** - Responsable de Estructura y HTML5
* **[Nombre y Apellido Integrante 2]** - Responsable de Estilos CSS3 y Accesibilidad
* **[Nombre y Apellido Integrante 3]** - Responsable de Lógica en JS y DOM

---

## 🛠️ Tecnologías Utilizadas
* **HTML5:** Marcado semántico y accesibilidad web (`header`, `nav`, `main`, `section`, `article`, `footer`).
* **CSS3:** Hoja de estilos externa centralizada compartida, maquetación fluida con Flexbox / CSS Grid y uso de variables CSS (`:root`).
* **JavaScript (Vanilla):** Manipulación dinámica del DOM, validación de formularios en el cliente y motor de cálculo de compatibilidad.
* **Git & GitHub:** Control de versiones con ramas distribuidas y publicaciones periódicas.

---

## 🎨 Identidad Visual (Paleta de Colores)
El proyecto utiliza la **Paleta 1: Silicio Verde** (inspirada en hardware de alto rendimiento), definida mediante variables CSS globales en `css/styles.css`:

* **Fondo Principal:** `#101410`[cite: 1]
* **Superficie / Cards:** `#1A211A`[cite: 1]
* **Color Primario:** `#76B900` (Verde NVIDIA)[cite: 1]
* **Acento:** `#B4FF3C`[cite: 1]
* **Texto:** `#EDF2E6`[cite: 1]
* **Error:** `#FF5C5C`[cite: 1]

---

## 📂 Estructura del Proyecto

```text
buildmypc-frontend/
├── index.html                 # Vista 1: Inicio / Landing Page
├── en-construccion.html       # Vista de sección en desarrollo
├── catalogo/
│   └── catalogo.html          # Vista 2: Catálogo de componentes dinámico
├── vista especifica/
│   ├── Ram.html               # Vista 3: Detalle de componente especifico (RAM)
│   ├── Cpu.html               # Detalle CPU
│   └── Gpu.html               # Detalle GPU
├── builds/
│   └── build.html             # Vista 4: Armador de PC en tiempo real
├── compatibilidad/
│   └── compatibilidad.html    # Vista 5: Resultado y reglas de compatibilidad
├── cotizacion/
│   └── cotizacion.html        # Vista 6: Formulario de cotización final
├── css/
│   └── styles.css             # Hoja de estilos única global compartida
├── js/
│   ├── data.js                # Inventario de datos simulados en arreglos
│   ├── main.js                # Lógica general y filtrado de catálogo
│   └── build.js               # Algoritmo de consumo y reglas del armador
├── img/                       # Imágenes de productos y recursos visuales
├── ERS_Version1.pdf           # Especificación de Requerimientos de Software v1
└── README.md                  # Documentación principal del proyecto