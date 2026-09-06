/* 
   DATOS SIMULADOS PARA EL CATÁLOGO
  */

const inventarioComponentes = [
  {
    id: "cpu-001",
    marca: "Intel",
    modelo: "Core i7-13700K",
    tipo: "CPU",
    precio: 360000,
    socket: "LGA1700",
    tdp: 125,
    descripcion: "Procesador de alto rendimiento con 16 núcleos y 24 hilos.",
    imagen: "../img/producto1.jpg",
    descontinuado: false,
    urlDetalle: "../vista%20especifica/Cpu.html"
  },
  {
    id: "ram-001",
    marca: "Kingston",
    modelo: "Fury Beast 16GB DDR5",
    tipo: "RAM",
    precio: 64990,
    tipoMemoria: "DDR5",
    capacidadGB: 16,
    frecuenciaMHz: 5600,
    descripcion: "Memoria RAM optimizada para la plataforma de última generación.",
    imagen: "../img/producto2.jpg",
    descontinuado: false,
    urlDetalle: "../vista%20especifica/Ram.html"
  },
  {
    id: "ssd-001",
    marca: "Kingston",
    modelo: "NV2 1TB NVMe M.2",
    tipo: "Almacenamiento",
    precio: 68990,
    capacidadGB: 1000,
    descripcion: "Almacenamiento NVMe PCIe 4.0 de alta velocidad para juegos.",
    imagen: "../img/producto3.jpg",
    descontinuado: false,
    urlDetalle: "../vista%20especifica/Ssd.html"
  },
  {
    id: "gpu-001",
    marca: "NVIDIA",
    modelo: "GeForce RTX 3080 10GB",
    tipo: "GPU",
    precio: 649990,
    vramGB: 10,
    tdp: 320,
    descripcion: "Tarjeta gráfica para gaming 4K y procesamiento pesado.",
    imagen: "../img/producto4.jpg",
    descontinuado: false,
    urlDetalle: "../vista%20especifica/Gpu.html"
  },
  {
    id: "mb-001",
    marca: "ASUS",
    modelo: "TUF Gaming Z790-Plus",
    tipo: "Placa",
    precio: 249990,
    socket: "LGA1700",
    tiposMemoriaSoportados: ["DDR5"],
    maxRamGB: 128,
    descripcion: "Placa madre robusta con soporte para memorias DDR5 y PCIe 5.0.",
    imagen: "../img/producto5.jpg",
    descontinuado: false,
    urlDetalle: "../vista%20especifica/Placa.html"
  },
  {
    id: "psu-001",
    marca: "Corsair",
    modelo: "RM850x 850W 80+ Gold",
    tipo: "Fuente",
    precio: 139990,
    potenciaWatts: 850,
    certificacion: "80 Plus Gold",
    descripcion: "Fuente de poder modular eficiente para configuraciones avanzadas.",
    imagen: "../img/producto6.jpg",
    descontinuado: false,
    urlDetalle: "../vista%20especifica/Fuente.html"
  },
  {
    id: "gpu-002",
    marca: "AMD",
    modelo: "Radeon RX 580 8GB",
    tipo: "GPU",
    precio: 110000,
    vramGB: 8,
    tdp: 185,
    descripcion: "Componente descontinuado listado solo como referencia.",
    imagen: "../img/producto7.jpg",
    descontinuado: true,
    urlDetalle: "../vista%20especifica/GpuOld.html"
  }
];