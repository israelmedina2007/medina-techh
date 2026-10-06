// ============================================================
// MEDINA TECH — CATÁLOGO Y CONFIGURACIÓN
//
// ESTE ES EL ARCHIVO QUE USARÁS NORMALMENTE.
// Aquí cambias productos, precios, baterías, disponibilidad,
// fotos, tu número de WhatsApp y las opiniones de clientes.
//
// REGLAS PARA NO ROMPER NADA:
//  - Respeta las comillas "así" alrededor de los textos.
//  - Los números (precio, batería) van SIN comillas y SIN comas: 10799
//  - Cada producto termina con una coma }, (el último puede ir sin coma).
//  - No borres llaves { } ni corchetes [ ].
// ============================================================


// ------------------------------------------------------------
// 1) DATOS DEL NEGOCIO
// ------------------------------------------------------------
const NEGOCIO = {
  // Tu WhatsApp: código de país 52 + tu número, sin espacios ni signo +
  whatsapp: "525628346360",

  // Formulario para que tus clientes dejen reseñas (ver README, sección "Reseñas").
  // Mientras esté vacío (""), el botón "Dejar una reseña" abre WhatsApp contigo.
  // Cuando tengas el formulario, pega aquí su enlace: "https://forms.gle/...."
  formularioResenas: "https://forms.gle/K4siuc9ZETxViph28",
};


// ------------------------------------------------------------
// 2) TEXTO GENERAL DE ESTADO FÍSICO
// Se usa en todos los productos que tengan estadoFisico: ""
// Si un teléfono es distinto, escribe su propio texto en ese producto.
// ------------------------------------------------------------
const ESTADO_FISICO_POR_DEFECTO =
  "Rayones muy ligeros, casi imperceptibles y visibles principalmente bajo luz directa.";


// ------------------------------------------------------------
// 3) TIPOS DE PRODUCTO
// Sirve para los botones de filtro y para redactar el mensaje de WhatsApp.
// Si algún día vendes otro tipo (por ejemplo "cargadores"), agrégalo aquí
// y usa ese mismo nombre en el campo tipo del producto.
// ------------------------------------------------------------
const TIPOS = {
  iphone:  { nombre: "iPhone",  articulo: "el",  plural: false },
  airpods: { nombre: "AirPods", articulo: "los", plural: true  }
};


// ------------------------------------------------------------
// 4) PRODUCTOS
//
// CAMPOS (los que no apliquen, bórralos o déjalos vacíos):
//   id               Número único. Nunca repitas un id.
//   tipo             "iphone" o "airpods" (o un tipo de la sección 3)
//   nombre           Ej: "iPhone 16"
//   almacenamiento   Ej: "128 GB"                   (solo teléfonos)
//   bateria          Solo el número, ej: 99         (solo teléfonos)
//   caracteristica   Ej: "Con cancelación de ruido" (AirPods u otros)
//   color            Ej: "Negro"
//   precio           Solo el número, ej: 10799
//   estadoFisico     "" = usa el texto general. O escribe uno propio.
//   disponibilidad   "Disponible", "Apartado" o "Vendido"
//   imagenes         Lista de fotos: ["images/foto-1.jpg", "images/foto-2.jpg"]
//   fotoDeReferencia true  = la foto NO es del equipo exacto (se avisa al cliente)
//                    false = son fotos tuyas de ese equipo
//
// PARA AGREGAR UN TELÉFONO:
//   Copia un bloque completo desde { hasta }, pégalo debajo de otro
//   y cambia sus datos. Dale un id nuevo.
//
// PARA QUITAR UN TELÉFONO:
//   Borra su bloque completo (de { a },) — o mejor, márcalo "Vendido".
// ------------------------------------------------------------
const PRODUCTOS = [
  {
    id: 2,
    tipo: "iphone",
    nombre: "iPhone Air",
    almacenamiento: "256 GB",
    bateria: 97,
    color: "Blanco / Plata",
    precio: 14999,
    estadoFisico: "",
    disponibilidad: "Disponible",
    imagenes: ["images/iphone-air.jpg"],
    fotoDeReferencia: true
  },
  {
    id: 3,
    tipo: "iphone",
    nombre: "iPhone 16",
    almacenamiento: "128 GB",
    bateria: 99,
    color: "Negro",
    precio: 10799,
    estadoFisico: "",
    disponibilidad: "Disponible",
    imagenes: ["images/iphone-16.jpg"],
    fotoDeReferencia: true
  },
  {
    id: 4,
    tipo: "iphone",
    nombre: "iPhone 12 Pro Max",
    almacenamiento: "256 GB",
    bateria: 79,
    color: "Azul",
    precio: 3599,
    estadoFisico: "",
    disponibilidad: "Disponible",
    imagenes: ["images/iphone-12-pro-max.jpg"],
    fotoDeReferencia: true
  },
  {
    id: 5,
    tipo: "iphone",
    nombre: "iPhone 17 Pro",
    almacenamiento: "256 GB",
    bateria: 100,
    color: "Azul Pacífico / Azul Oscuro",
    precio: 17999,
    estadoFisico: "",
    disponibilidad: "Disponible",
    imagenes: ["images/iphone-17-pro.jpg"],
    fotoDeReferencia: true
  },
  {
    id: 6,
    tipo: "iphone",
    nombre: "iPhone 14",
    almacenamiento: "128 GB",
    bateria: 85,
    color: "Medianoche / Negro",
    precio: 5499,
    estadoFisico: "",
    disponibilidad: "Disponible",
    imagenes: ["images/iphone-14.jpg"],
    fotoDeReferencia: true
  },
  {
    id: 7,
    tipo: "iphone",
    nombre: "iPhone 17",
    almacenamiento: "256 GB",
    bateria: 92,
    color: "Lavanda / Morado",
    precio: 14499,
    estadoFisico: "",
    disponibilidad: "Disponible",
    imagenes: ["images/iphone-17.jpg"],
    fotoDeReferencia: true
  },
  {
    id: 8,
    tipo: "iphone",
    nombre: "iPhone 16",
    almacenamiento: "128 GB",
    bateria: 100,
    color: "Negro",
    precio: 10999,
    estadoFisico: "",
    disponibilidad: "Disponible",
    imagenes: ["images/iphone-16.jpg"],
    fotoDeReferencia: true
  },
  {
    id: 9,
    tipo: "airpods",
    nombre: "AirPods 4",
    caracteristica: "Sin cancelación de ruido",
    color: "Blanco",
    precio: 2099,
    estadoFisico: "",
    disponibilidad: "Disponible",
    imagenes: ["images/airpods-4.webp"],
    fotoDeReferencia: true
  },
  {
    id: 10,
    tipo: "airpods",
    nombre: "AirPods 4",
    caracteristica: "Con cancelación de ruido",
    color: "Blanco",
    precio: 2499,
    estadoFisico: "",
    disponibilidad: "Disponible",
    imagenes: ["images/airpods-4.webp"],
    fotoDeReferencia: true
  }
];


// ------------------------------------------------------------
// 5) OPINIONES DE CLIENTES
//
// Aquí van SOLO reseñas reales de clientes que te dieron permiso de publicarlas.
// Mientras la lista esté vacía, la página muestra un mensaje elegante de "próximamente".
//
// Para agregar una, quita las // del ejemplo de abajo y cambia los datos:
//   nombre        Como el cliente quiere que aparezca (ej: "María G.")
//   calificacion  Número del 1 al 5
//   comentario    Lo que escribió el cliente
//   fecha         Opcional, formato "2026-05-14" (año-mes-día). Puedes quitarla.
// ------------------------------------------------------------
const RESENAS = [
  // {
  //   nombre: "Nombre del cliente",
  //   calificacion: 5,
  //   comentario: "Texto real de la reseña.",
  //   fecha: "2026-01-31"
  // },
];
