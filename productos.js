
// ============================================================
// MEDINA TECH — CATÁLOGO Y CONFIGURACIÓN
// Actualizado: 30 de octubre de 2026
// ============================================================

// 1) DATOS DEL NEGOCIO
const NEGOCIO = {
  whatsapp: "525628346360",
  formularioResenas: "https://forms.gle/K4siuc9ZETxViph28"
};

// 2) TEXTO GENERAL DE ESTADO FÍSICO
const ESTADO_FISICO_POR_DEFECTO =
  "Rayones muy ligeros, casi imperceptibles y visibles principalmente bajo luz directa.";

// 3) TIPOS DE PRODUCTO
const TIPOS = {
  iphone: {
    nombre: "iPhone",
    articulo: "el",
    plural: false
  },
  airpods: {
    nombre: "AirPods",
    articulo: "los",
    plural: true
  }
};

// 4) PRODUCTOS DISPONIBLES
const PRODUCTOS = [
  {
    "id": 11,
    "tipo": "iphone",
    "nombre": "iPhone 17 Pro Max",
    "almacenamiento": "256 GB",
    "bateria": 100,
    "color": "Azul",
    "precio": 21499,
    "estadoFisico": "Seminuevo. Incluye caja. Consulta detalles del estado físico por WhatsApp.",
    "disponibilidad": "Disponible",
    "imagenes": [
      "medina-17-pro-max-new.jpg"
    ],
    "fotoDeReferencia": true
  },
  {
    "id": 2,
    "tipo": "iphone",
    "nombre": "iPhone Air",
    "almacenamiento": "256 GB",
    "bateria": 97,
    "color": "Blanco / Plata",
    "precio": 14999,
    "estadoFisico": "Seminuevo. Incluye caja. Consulta detalles del estado físico por WhatsApp.",
    "disponibilidad": "Disponible",
    "imagenes": [
      "images/iphone-air.jpg"
    ],
    "fotoDeReferencia": true
  },
  {
    "id": 7,
    "tipo": "iphone",
    "nombre": "iPhone 17",
    "almacenamiento": "256 GB",
    "bateria": 92,
    "color": "Morado / Lavanda",
    "precio": 14499,
    "estadoFisico": "Seminuevo. Incluye caja. Consulta detalles del estado físico por WhatsApp.",
    "disponibilidad": "Disponible",
    "imagenes": [
      "images/iphone-17.jpg"
    ],
    "fotoDeReferencia": true
  },
  {
    "id": 8,
    "tipo": "iphone",
    "nombre": "iPhone 16",
    "almacenamiento": "128 GB",
    "bateria": 100,
    "color": "Negro",
    "precio": 10999,
    "estadoFisico": "Seminuevo. Incluye caja. Consulta detalles del estado físico por WhatsApp.",
    "disponibilidad": "Disponible",
    "imagenes": [
      "images/iphone-16.jpg"
    ],
    "fotoDeReferencia": true
  },
  {
    "id": 12,
    "tipo": "iphone",
    "nombre": "iPhone 15 Pro Max",
    "almacenamiento": "512 GB",
    "bateria": 81,
    "color": "Negro",
    "precio": 11699,
    "estadoFisico": "Seminuevo. Incluye caja. Consulta detalles del estado físico por WhatsApp.",
    "disponibilidad": "Disponible",
    "imagenes": [
      "medina-15-pro-max-new.webp"
    ],
    "fotoDeReferencia": true
  },
  {
    "id": 13,
    "tipo": "iphone",
    "nombre": "iPhone 14",
    "almacenamiento": "128 GB",
    "bateria": 85,
    "color": "Negro",
    "precio": 4799,
    "estadoFisico": "Seminuevo. Sólo teléfono, sin caja. Unidad del catálogo actual.",
    "disponibilidad": "Disponible",
    "imagenes": [
      "medina-14-new.jpg"
    ],
    "fotoDeReferencia": true
  },
  {
    "id": 14,
    "tipo": "iphone",
    "nombre": "iPhone 14",
    "almacenamiento": "128 GB",
    "bateria": 85,
    "color": "Negro",
    "precio": 5499,
    "estadoFisico": "Seminuevo. Sólo teléfono, sin caja. Otra unidad disponible; consulta sus detalles.",
    "disponibilidad": "Disponible",
    "imagenes": [
      "medina-14-new.jpg"
    ],
    "fotoDeReferencia": true
  }
];

// 5) OPINIONES DE CLIENTES
// Agrega aquí únicamente reseñas reales autorizadas.
const RESENAS = [
  // {
  //   nombre: "Nombre del cliente",
  //   calificacion: 5,
  //   comentario: "Texto real de la reseña.",
  //   fecha: "2026-10-08"
  // }
];
