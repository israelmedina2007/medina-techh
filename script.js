// ============================================================
// MEDINA TECH â€” LÃ“GICA DE LA PÃGINA
//
// NORMALMENTE NO NECESITAS EDITAR ESTE ARCHIVO.
// Productos, precios, WhatsApp y reseÃ±as se cambian en productos.js
// ============================================================

"use strict";

// ------------------------------------------------------------
// PREPARADO PARA EL FUTURO
// Hoy, comprar = abrir WhatsApp (ver mensajeProducto y whatsappUrl).
// Cuando existan carrito o pagos en lÃ­nea, ese es el Ãºnico punto
// que habrÃ­a que cambiar; el resto de la pÃ¡gina seguirÃ­a igual.
// ------------------------------------------------------------

const ESTADOS = {
  disponible: { etiqueta: "Disponible", clase: "disponible", orden: 0 },
  apartado:   { etiqueta: "Apartado",   clase: "apartado",   orden: 1 },
  vendido:    { etiqueta: "Vendido",    clase: "vendido",    orden: 2 }
};

// ---------- Utilidades ----------

function normalizar(texto) {
  return String(texto || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Evita que un texto con sÃ­mbolos raros rompa el HTML
function esc(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, caracter => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[caracter]));
}

const dinero = valor =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(valor);

// ---------- Datos ----------

const elGrid = document.getElementById("productGrid");
const elFiltros = document.getElementById("filters");

if (typeof PRODUCTOS === "undefined" || typeof NEGOCIO === "undefined") {
  elGrid.innerHTML = '<p class="empty-note">No se pudo cargar el catÃ¡logo. Revisa que el archivo productos.js estÃ© junto a index.html.</p>';
  throw new Error("No se encontrÃ³ productos.js");
}

function infoTipo(tipo) {
  const base = (typeof TIPOS !== "undefined" && TIPOS[tipo]) || {};
  return {
    nombre: base.nombre || (tipo.charAt(0).toUpperCase() + tipo.slice(1)),
    articulo: base.articulo || "el",
    plural: Boolean(base.plural)
  };
}

function prepararProducto(p) {
  if (!p || p.id === undefined || !p.nombre || typeof p.precio !== "number") {
    console.warn("Producto ignorado: le falta id, nombre o precio (el precio debe ser un nÃºmero sin comillas).", p);
    return null;
  }

  const claveEstado = normalizar(p.disponibilidad) || "disponible";
  let estado = ESTADOS[claveEstado];
  if (!estado) {
    console.warn(`Disponibilidad no reconocida en "${p.nombre}": "${p.disponibilidad}". Usa Disponible, Apartado o Vendido. Se mostrarÃ¡ como Disponible.`);
    estado = ESTADOS.disponible;
  }

  const tipo = normalizar(p.tipo) || "otro";
  const estadoFisico = (p.estadoFisico || "").trim() ||
    (typeof ESTADO_FISICO_POR_DEFECTO !== "undefined" ? ESTADO_FISICO_POR_DEFECTO : "");

  return {
    ...p,
    tipo,
    info: infoTipo(tipo),
    estado,
    estadoFisico,
    imagenes: Array.isArray(p.imagenes) ? p.imagenes.filter(Boolean) : []
  };
}

const CATALOGO = PRODUCTOS
  .map(prepararProducto)
  .filter(Boolean)
  // Disponibles primero, luego apartados y al final vendidos (respeta el orden de la lista)
  .map((p, indice) => ({ p, indice }))
  .sort((a, b) => a.p.estado.orden - b.p.estado.orden || a.indice - b.indice)
  .map(({ p }) => p);

// ---------- WhatsApp ----------

function whatsappUrl(mensaje) {
  const numero = String(NEGOCIO.whatsapp || "").replace(/\D/g, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

// Mensaje automÃ¡tico. Ejemplo:
// "Hola, me interesa el iPhone 16 de 128 GB por $10,799. Â¿Sigue disponible?"
function mensajeProducto(p) {
  const { articulo, plural } = p.info;
  let texto = `Hola, me interesa${plural ? "n" : ""} ${articulo} ${p.nombre}`;
  if (p.almacenamiento) texto += ` de ${p.almacenamiento}`;
  if (p.caracteristica) texto += ` ${p.caracteristica.toLowerCase()}`;
  texto += ` por ${dinero(p.precio)}.`;

  if (p.estado.clase === "apartado") {
    return `${texto} Veo que aparece como apartado. Â¿Me pueden avisar si vuelve a estar disponible?`;
  }
  return `${texto} ${plural ? "Â¿Siguen disponibles?" : "Â¿Sigue disponible?"}`;
}

const MENSAJE_GENERAL = "Hola, me gustarÃ­a consultar el catÃ¡logo de Medina Tech. Â¿QuÃ© equipos tienen disponibles?";

// ---------- ImÃ¡genes ----------

function placeholderHTML(nombre) {
  return `<div class="image-placeholder"><strong>${esc(nombre)}</strong><span>Foto prÃ³ximamente</span></div>`;
}

function imagenHTML(src, alt) {
  return `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" data-fallback>`;
}

// Si una foto no existe o no carga, se muestra un recuadro elegante en su lugar
function activarFallbacks(raiz, nombre, alFallar) {
  raiz.querySelectorAll("img[data-fallback]").forEach(img => {
    const reemplazar = () => {
      const caja = document.createElement("div");
      caja.innerHTML = placeholderHTML(nombre);
      img.replaceWith(caja.firstElementChild);
      if (alFallar) alFallar();
    };
    if (img.complete && img.naturalWidth === 0) reemplazar();
    else img.addEventListener("error", reemplazar, { once: true });
  });
}

// ---------- CatÃ¡logo ----------

function textoDatosTarjeta(p) {
  const chips = [`<span class="meta-chip">${esc(p.color)}</span>`];
  if (p.almacenamiento) chips.push(`<span class="meta-chip">${esc(p.almacenamiento)}</span>`);
  if (p.bateria !== undefined && p.bateria !== "") chips.push(`<span class="meta-chip battery">BaterÃ­a ${esc(p.bateria)}%</span>`);
  if (p.caracteristica) chips.push(`<span class="meta-chip">${esc(p.caracteristica)}</span>`);
  return chips.join("");
}

function tarjetaHTML(p) {
  const vendido = p.estado.clase === "vendido";
  const portada = p.imagenes[0];
  const refChip = portada && p.fotoDeReferencia
    ? '<span class="ref-chip">Foto de referencia</span>'
    : "";

  let boton;
  if (vendido) {
    boton = '<span class="button button-primary is-disabled" aria-disabled="true">Vendido</span>';
  } else {
    const texto = p.estado.clase === "apartado" ? "Consultar" : "Comprar";
    boton = `<a class="button button-primary" href="${esc(whatsappUrl(mensajeProducto(p)))}" target="_blank" rel="noopener">${texto}</a>`;
  }

  return `
    <article class="product-card is-${p.estado.clase}">
      <div class="product-image">
        <span class="product-type">${esc(p.info.nombre)}</span>
        <span class="availability status-${p.estado.clase}">${p.estado.etiqueta}</span>
        ${portada ? imagenHTML(portada, `${p.nombre} ${p.color}`) : placeholderHTML(p.nombre)}
        ${refChip}
      </div>
      <div class="product-info">
        <h3>${esc(p.nombre)}</h3>
        <div class="product-meta">${textoDatosTarjeta(p)}</div>
        <p class="condition-short">${esc(p.estadoFisico)}</p>
        <div class="product-price">${dinero(p.precio)}</div>
        <div class="product-actions">
          <button class="button button-secondary" data-details="${esc(p.id)}">Ver detalles</button>
          ${boton}
        </div>
      </div>
    </article>
  `;
}

let filtroActual = "all";

function renderProductos() {
  const visibles = CATALOGO.filter(p => filtroActual === "all" || p.tipo === filtroActual);

  if (visibles.length === 0) {
    elGrid.innerHTML = '<p class="empty-note">Por ahora no hay equipos en esta categorÃ­a. EscrÃ­benos por WhatsApp y te avisamos cuando haya.</p>';
    return;
  }

  elGrid.innerHTML = visibles.map(tarjetaHTML).join("");

  elGrid.querySelectorAll(".product-card").forEach((tarjeta, i) => {
    const p = visibles[i];
    activarFallbacks(tarjeta, p.nombre, () => {
      const chip = tarjeta.querySelector(".ref-chip");
      if (chip) chip.remove();
    });
  });
}

function renderFiltros() {
  const tipos = [...new Set(CATALOGO.map(p => p.tipo))];
  elFiltros.innerHTML =
    `<button class="filter active" data-filter="all" aria-pressed="true">Todos</button>` +
    tipos.map(t => `<button class="filter" data-filter="${esc(t)}" aria-pressed="false">${esc(infoTipo(t).nombre)}</button>`).join("");
}

elFiltros.addEventListener("click", evento => {
  const boton = evento.target.closest(".filter");
  if (!boton) return;
  filtroActual = boton.dataset.filter;
  elFiltros.querySelectorAll(".filter").forEach(item => {
    const activo = item === boton;
    item.classList.toggle("active", activo);
    item.setAttribute("aria-pressed", String(activo));
  });
  renderProductos();
});

elGrid.addEventListener("click", evento => {
  const boton = evento.target.closest("[data-details]");
  if (boton) abrirModal(boton.dataset.details, boton);
});

// ---------- Modal con galerÃ­a ----------

const modalBackdrop = document.getElementById("modalBackdrop");
const modal = modalBackdrop.querySelector(".modal");
const modalClose = document.getElementById("modalClose");
const modalImageWrap = document.getElementById("modalImageWrap");
const modalType = document.getElementById("modalType");
const modalTitle = document.getElementById("modalTitle");
const modalSpecs = document.getElementById("modalSpecs");
const modalCondition = document.getElementById("modalCondition");
const modalPrice = document.getElementById("modalPrice");
const modalBuy = document.getElementById("modalBuy");
const modalAlt = document.getElementById("modalAlt");

let productoAbierto = null;
let fotoActual = 0;
let elementoPrevio = null;

function mostrarFoto(indice) {
  const p = productoAbierto;
  const total = p.imagenes.length;
  if (!total) return;
  fotoActual = (indice + total) % total;

  const principal = modalImageWrap.querySelector(".gallery-main");
  principal.innerHTML = imagenHTML(p.imagenes[fotoActual], `${p.nombre} ${p.color}, foto ${fotoActual + 1} de ${total}`);
  activarFallbacks(principal, p.nombre, () => {
    const nota = modalImageWrap.querySelector(".reference-note");
    if (nota) nota.hidden = true;
  });

  modalImageWrap.querySelectorAll(".thumb").forEach((miniatura, i) => {
    miniatura.setAttribute("aria-current", String(i === fotoActual));
  });
}

function galeriaHTML(p) {
  const total = p.imagenes.length;
  if (!total) {
    return `<div class="gallery"><div class="gallery-main">${placeholderHTML(p.nombre)}</div></div>`;
  }

  const flechas = total > 1
    ? `<button class="gallery-nav prev" data-dir="-1" aria-label="Foto anterior">â€¹</button>
       <button class="gallery-nav next" data-dir="1" aria-label="Foto siguiente">â€º</button>`
    : "";

  const miniaturas = total > 1
    ? `<div class="gallery-thumbs">${p.imagenes.map((src, i) =>
        `<button class="thumb" data-foto="${i}" aria-label="Ver foto ${i + 1} de ${total}" aria-current="false"><img src="${esc(src)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'"></button>`
      ).join("")}</div>`
    : "";

  const nota = p.fotoDeReferencia
    ? '<p class="reference-note">Imagen de referencia. No muestra el estado fÃ­sico exacto de este equipo; consulta su estado real antes de comprar.</p>'
    : "";

  return `
    <div class="gallery">
      <div class="gallery-stage"><div class="gallery-main"></div>${flechas}</div>
      ${miniaturas}
      ${nota}
    </div>`;
}

function filasDatos(p) {
  const filas = [["Color", p.color]];
  if (p.almacenamiento) filas.push(["Capacidad", p.almacenamiento]);
  if (p.bateria !== undefined && p.bateria !== "") filas.push(["BaterÃ­a", `${p.bateria}%`]);
  if (p.caracteristica) filas.push(["CaracterÃ­stica", p.caracteristica]);
  return filas.map(([etiqueta, valor]) => `
    <div class="spec"><span>${esc(etiqueta)}</span><span>${esc(valor)}</span></div>
  `).join("") + `
    <div class="spec"><span>Disponibilidad</span><span><span class="status-pill status-${p.estado.clase}">${p.estado.etiqueta}</span></span></div>
  `;
}

function abrirModal(id, origen) {
  const p = CATALOGO.find(item => String(item.id) === String(id));
  if (!p) return;

  productoAbierto = p;
  elementoPrevio = origen || document.activeElement;

  modalType.textContent = p.info.nombre;
  modalTitle.textContent = p.nombre;
  modalPrice.textContent = dinero(p.precio);
  modalCondition.innerHTML = `<strong>Estado fÃ­sico</strong>${esc(p.estadoFisico)}`;
  modalSpecs.innerHTML = filasDatos(p);

  modalImageWrap.innerHTML = galeriaHTML(p);
  if (p.imagenes.length) mostrarFoto(0);

  if (p.estado.clase === "vendido") {
    modalBuy.removeAttribute("href");
    modalBuy.setAttribute("aria-disabled", "true");
    modalBuy.classList.add("is-disabled");
    modalBuy.textContent = "Vendido";
    modalAlt.hidden = false;
    modalAlt.href = whatsappUrl(`Hola, vi que ${p.info.articulo} ${p.nombre} aparece como vendido. Â¿Tienen equipos similares disponibles?`);
  } else {
    modalBuy.href = whatsappUrl(mensajeProducto(p));
    modalBuy.removeAttribute("aria-disabled");
    modalBuy.classList.remove("is-disabled");
    modalBuy.textContent = "Consultar por WhatsApp";
    modalAlt.hidden = true;
  }

  modalBackdrop.classList.add("open");
  modalBackdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.scrollTop = 0;
  modalClose.focus();
}

function cerrarModal() {
  if (!modalBackdrop.classList.contains("open")) return;
  modalBackdrop.classList.remove("open");
  modalBackdrop.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  productoAbierto = null;
  if (elementoPrevio && elementoPrevio.focus) elementoPrevio.focus();
}

modalClose.addEventListener("click", cerrarModal);

modalBackdrop.addEventListener("click", evento => {
  if (evento.target === modalBackdrop) cerrarModal();
});

// GalerÃ­a: flechas y miniaturas
modalImageWrap.addEventListener("click", evento => {
  if (!productoAbierto) return;
  const flecha = evento.target.closest("[data-dir]");
  const miniatura = evento.target.closest("[data-foto]");
  if (flecha) mostrarFoto(fotoActual + Number(flecha.dataset.dir));
  if (miniatura) mostrarFoto(Number(miniatura.dataset.foto));
});

// GalerÃ­a: deslizar con el dedo en el celular
let toqueInicio = null;
modalImageWrap.addEventListener("touchstart", evento => {
  toqueInicio = evento.touches[0].clientX;
}, { passive: true });
modalImageWrap.addEventListener("touchend", evento => {
  if (toqueInicio === null || !productoAbierto || productoAbierto.imagenes.length < 2) return;
  const diferencia = evento.changedTouches[0].clientX - toqueInicio;
  toqueInicio = null;
  if (Math.abs(diferencia) > 45) mostrarFoto(fotoActual + (diferencia < 0 ? 1 : -1));
}, { passive: true });

// Teclado: Esc cierra, flechas cambian de foto, Tab se queda dentro del modal
document.addEventListener("keydown", evento => {
  if (!modalBackdrop.classList.contains("open")) return;

  if (evento.key === "Escape") cerrarModal();
  if (evento.key === "ArrowLeft" && productoAbierto) mostrarFoto(fotoActual - 1);
  if (evento.key === "ArrowRight" && productoAbierto) mostrarFoto(fotoActual + 1);

  if (evento.key === "Tab") {
    const enfocables = [...modal.querySelectorAll("button, a[href], [tabindex]:not([tabindex='-1'])")]
      .filter(el => !el.hidden && el.offsetParent !== null);
    if (!enfocables.length) return;
    const primero = enfocables[0];
    const ultimo = enfocables[enfocables.length - 1];
    if (evento.shiftKey && document.activeElement === primero) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primero.focus();
    }
  }
});

// Botones desactivados (Vendido) no hacen nada
document.addEventListener("click", evento => {
  if (evento.target.closest(".is-disabled")) evento.preventDefault();
});

// ---------- Opiniones de clientes ----------

const elResenas = document.getElementById("reviewsList");
const elResumen = document.getElementById("reviewSummary");

// ReseÃ±as aprobadas desde Google Sheets / Apps Script
const URL_RESENAS = "https://script.google.com/macros/s/AKfycbz8lhA_Ub0sePxkDW-_d1PjR6gkl4BJe25a0F30zWog4o6psopzVlBnvgCQspHf9loi/exec";
let RESENAS = [];

function estrellasHTML(n) {
  const llenas = Math.max(0, Math.min(5, Math.round(n)));
  return `<span class="stars" role="img" aria-label="${llenas} de 5 estrellas">` +
    "â˜…".repeat(llenas) + `<span class="stars-off">${"â˜…".repeat(5 - llenas)}</span></span>`;
}

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function fechaBonita(texto) {
  const partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(texto || ""));
  if (!partes) return texto ? String(texto) : "";
  const mes = MESES[Number(partes[2]) - 1];
  return mes ? `${Number(partes[3])} de ${mes} de ${partes[1]}` : String(texto);
}

function renderResenas() {
  const lista = RESENAS
    .filter(r => r && r.nombre && r.comentario && Number(r.calificacion) >= 1 && Number(r.calificacion) <= 5);

  if (lista.length === 0) {
    elResumen.hidden = true;
    elResenas.innerHTML = `
      <div class="reviews-empty">
        <div class="info-icon" aria-hidden="true">â˜…</div>
        <h3>PrÃ³ximamente</h3>
        <p>PrÃ³ximamente podrÃ¡s consultar opiniones de nuestros clientes.</p>
      </div>`;
    return;
  }

  const promedio = lista.reduce((suma, r) => suma + Number(r.calificacion), 0) / lista.length;
  elResumen.hidden = false;
  elResumen.textContent = `${promedio.toFixed(1)} de 5 Â· ${lista.length} ${lista.length === 1 ? "opiniÃ³n" : "opiniones"}`;

  elResenas.innerHTML = lista.map(r => `
    <article class="review-card">
      ${estrellasHTML(r.calificacion)}
      <p class="review-text">${esc(r.comentario)}</p>
      <div class="review-author">
        <strong>${esc(r.nombre)}</strong>
        ${r.fecha ? `<span>${esc(fechaBonita(r.fecha))}</span>` : ""}
      </div>
    </article>
  `).join("");
}

async function cargarResenas() {
  try {
    const respuesta = await fetch(URL_RESENAS, { cache: "no-store" });
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    const datos = await respuesta.json();
    RESENAS = Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.error("No se pudieron cargar las reseÃ±as:", error);
    RESENAS = [];
  }
  renderResenas();
}

// ---------- Enlaces de WhatsApp generales ----------

document.querySelectorAll("[data-whatsapp]").forEach(enlace => {
  enlace.href = whatsappUrl(MENSAJE_GENERAL);
  enlace.target = "_blank";
  enlace.rel = "noopener";
});

// BotÃ³n "Dejar una reseÃ±a": formulario si existe; si no, WhatsApp
const botonResena = document.getElementById("reviewButton");
const formulario = String(NEGOCIO.formularioResenas || "").trim();
if (/^https:\/\//i.test(formulario)) {
  botonResena.href = formulario;
} else {
  botonResena.href = whatsappUrl("Hola, comprÃ© en Medina Tech y me gustarÃ­a dejar una reseÃ±a.");
}
botonResena.target = "_blank";
botonResena.rel = "noopener";

// ---------- MenÃº del celular ----------

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const abierto = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(abierto));
});

navLinks.querySelectorAll("a").forEach(enlace => {
  enlace.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ---------- Inicio ----------

document.getElementById("anio").textContent = new Date().getFullYear();
renderFiltros();
renderProductos();
cargarResenas();
