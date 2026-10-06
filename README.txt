MEDINA TECH — V3
Guía para principiantes (no necesitas saber programar)

============================================================
LO MÁS IMPORTANTE EN 3 LÍNEAS
============================================================
- Casi todo se cambia en UN solo archivo: productos.js
- Ábrelo con el Bloc de notas (o con el editor de texto de tu celular/computadora).
- Cambia solo lo que está entre comillas "así" o los números, y guarda.

Antes de cualquier cambio, haz una copia de seguridad de productos.js
(por ejemplo, productos-copia.js en otra carpeta). Si algo se rompe, la restauras.


============================================================
1. CÓMO AGREGAR UN TELÉFONO
============================================================
1. Abre productos.js.
2. Busca la lista PRODUCTOS.
3. Copia un bloque completo de un teléfono, desde la llave { hasta la llave },
   por ejemplo:

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
    imagenes: ["images/iphone-16-99.jpg"],
    fotoDeReferencia: true
  },

4. Pégalo justo debajo de otro bloque (antes del corchete ] que cierra la lista).
5. Cambia sus datos. IMPORTANTE: el id debe ser un número que NO exista ya.
   Si el último id es 10, usa 11, luego 12, etc.
6. Guarda el archivo. Listo: no tocas index.html.

Reglas para no romper nada:
- Los textos van entre comillas: "Negro"
- El precio y la batería van SIN comillas y SIN comas ni signo $: 10799
- Cada bloque termina con una coma después de la llave: },
- Si usas "estadoFisico", déjalo vacío ("") para usar el texto general.
  Si ese teléfono es distinto, escribe su propio texto, por ejemplo:
  estadoFisico: "Pantalla impecable. Un pequeño golpe en una esquina del marco.",

Ciclos de batería: la página no los muestra (solo el porcentaje de batería).


============================================================
2. CÓMO ELIMINAR UN TELÉFONO
============================================================
Borra su bloque completo (desde { hasta },).
Si solo se vendió, mejor márcalo como "Vendido" (ver punto 5): así los clientes
ven que existió y que ya no está disponible. Cuando quieras, lo borras.


============================================================
3. CÓMO CAMBIAR UN PRECIO
============================================================
En el bloque del teléfono, cambia el número de precio:
    precio: 10799,
Escríbelo sin signo $ ni comas. El mensaje de WhatsApp se actualiza solo.


============================================================
4. CÓMO CAMBIAR LA BATERÍA
============================================================
Cambia el número:
    bateria: 99,
Solo el número, sin el símbolo %.


============================================================
5. CÓMO MARCAR DISPONIBLE / APARTADO / VENDIDO
============================================================
Cambia solo esta línea del teléfono:
    disponibilidad: "Disponible",
por una de estas tres opciones (escríbela tal cual):
    disponibilidad: "Apartado",
    disponibilidad: "Vendido",

- Disponible: etiqueta verde y botón "Comprar".
- Apartado:   etiqueta discreta, botón "Consultar" (el mensaje pregunta si
              vuelve a estar disponible).
- Vendido:    etiqueta gris, foto atenuada y botón desactivado. No se puede
              "comprar". Los vendidos se mueven al final del catálogo.

Si escribes mal la palabra, la página lo toma como "Disponible". Revisa que
quede escrita correctamente.


============================================================
6. CÓMO CAMBIAR FOTOGRAFÍAS
============================================================
1. Guarda tus fotos en la carpeta images (JPG, PNG o WEBP; mejor si pesan
   menos de 500 KB).
2. En el bloque del teléfono, cambia la lista de imágenes. Puedes poner varias:

    imagenes: [
      "images/iphone16-1.jpg",
      "images/iphone16-2.jpg",
      "images/iphone16-3.jpg"
    ],

   Los nombres deben coincidir EXACTAMENTE con los archivos (mayúsculas,
   minúsculas y guiones cuentan). La primera es la foto principal de la tarjeta.
3. MUY IMPORTANTE: cuando uses fotos de TU equipo, cambia esta línea:
    fotoDeReferencia: false
   Con "true" la página avisa discretamente "Foto de referencia" (para cuando la
   imagen no es del equipo exacto). Con "false" ya no aparece ese aviso.
4. Si una foto todavía no existe, la página muestra "Foto próximamente"; no se rompe.

NOTA: en esta V3 la carpeta images viene vacía. No se descargaron imágenes
oficiales de Apple (no es posible desde aquí y cada una tiene sus propias
condiciones de uso). Si quieres usar imágenes de referencia de Apple, revisa
sus lineamientos de uso y guárdalas en images con los nombres de LEEME.txt.
Lo ideal, siempre que puedas, son fotos propias de cada equipo.


============================================================
7. CÓMO MODIFICAR TU NÚMERO DE WHATSAPP
============================================================
En productos.js, al inicio, cambia:
    whatsapp: "525628346360",
Formato: 52 + tu número de 10 dígitos, sin espacios, sin guiones y sin el signo +.
Con eso se actualizan TODOS los botones y los mensajes de cada producto.


============================================================
8. CÓMO PUBLICAR CAMBIOS EN GITHUB (método más sencillo, desde el navegador)
============================================================
Primera vez:
1. Crea una cuenta en github.com.
2. Crea un repositorio nuevo (por ejemplo, medina-tech) en modo Public.
3. Entra al repositorio > Add file > Upload files, arrastra TODOS los archivos
   y la carpeta images, y pulsa "Commit changes".
4. Ve a Settings > Pages. En "Build and deployment" elige
   "Deploy from a branch", rama main, carpeta / (root). Guarda.
5. Espera 1 o 2 minutos. GitHub te mostrará la dirección de tu página
   (algo como https://TU-USUARIO.github.io/medina-tech/).

Cada vez que cambies el catálogo:
1. Edita productos.js en tu computadora y guárdalo.
2. En GitHub, abre tu repositorio > Add file > Upload files.
3. Arrastra el productos.js nuevo (y las fotos nuevas, dentro de images).
   Si el archivo se llama igual, reemplaza al anterior.
4. Pulsa "Commit changes".
5. Espera 1 o 2 minutos y recarga tu página (Ctrl + F5 si no ves el cambio;
   en celular, cierra y abre el navegador).

Alternativa: en GitHub abre productos.js y pulsa el lápiz (Edit) para editarlo
directamente ahí, y luego "Commit changes".


============================================================
9. QUÉ ARCHIVOS NO DEBERÍAS TOCAR NORMALMENTE
============================================================
- script.js   (la lógica de la página)
- style.css   (el diseño)
- index.html  (solo se toca para cambiar textos de Garantía/Entrega o al
               poner tu dominio)
- robots.txt y sitemap.xml (solo al poner tu dominio)

Los que SÍ usas: productos.js y la carpeta images.


============================================================
10. CÓMO CONECTAR UN DOMINIO PROPIO EN EL FUTURO
============================================================
1. Compra un dominio (por ejemplo medinatech.mx o medinatech.com.mx) en un
   registrador de tu confianza.
2. En GitHub: Settings > Pages > "Custom domain": escribe tu dominio y guarda.
   Activa "Enforce HTTPS" cuando esté disponible.
3. En el panel de tu registrador, configura los DNS. GitHub indica los valores
   exactos en su documentación ("Configuring a custom domain for your GitHub
   Pages site"); normalmente son registros A para el dominio principal y un
   CNAME para www. Revísalos ahí, porque pueden cambiar.
4. Cuando el dominio funcione, busca TU-DOMINIO.com en estos archivos y
   cámbialo por tu dominio real (o busca la marca CAMBIAR-DOMINIO):
     - index.html: quita los comentarios de las 3 líneas marcadas
       (canonical, og:url y "url" de Schema.org)
     - robots.txt
     - sitemap.xml
5. Entra a Google Search Console, verifica tu dominio y envía
   https://TU-DOMINIO.com/sitemap.xml


============================================================
OPINIONES DE CLIENTES (RESEÑAS)
============================================================
- Las reseñas se escriben en productos.js, en la lista RESENAS (hay un ejemplo
  comentado). Solo agrega reseñas REALES, con permiso del cliente para
  publicar su nombre.
- Mientras la lista esté vacía, la página muestra "Próximamente podrás
  consultar opiniones de nuestros clientes."
- El botón "Dejar una reseña" abre WhatsApp contigo. Si creas un formulario
  (ver más abajo), pega su enlace en formularioResenas, en productos.js.

OPCIÓN GRATUITA MÁS SENCILLA Y SEGURA: Google Forms
1. Crea un formulario gratis en forms.google.com con: Nombre, Calificación
   (escala 1 a 5), Comentario y una casilla "Autorizo publicar mi opinión".
2. Copia el enlace de "Enviar" y pégalo en formularioResenas (productos.js).
3. Las respuestas llegan a tu cuenta de Google (puedes activar aviso por correo).
4. Tú revisas cada una y copias a RESENAS solo las que quieras publicar.
Es segura porque la página NO recibe nada del público: no hay código que
alguien pueda atacar ni spam que se publique solo. Tú decides qué se muestra.


============================================================
SI ALGO NO SE VE BIEN
============================================================
- ¿El catálogo salió vacío o aparece un mensaje de error? Casi siempre es una
  coma, comilla o llave que falta en productos.js. Compara con tu copia de
  seguridad o con el bloque de otro teléfono.
- Un producto con precio entre comillas ("10799") o sin nombre no se muestra.
- ¿No ves tus cambios? Espera 2 minutos y recarga con Ctrl + F5.


IMÁGENES DE REFERENCIA — V3 PARA PUBLICAR
- Esta versión usa temporalmente URLs externas de imágenes de referencia para que el catálogo se vea completo sin pagar hosting.
- Todas siguen marcadas como fotoDeReferencia: true. No representan el estado exacto del equipo usado.
- Cuando tengas fotos propias, súbelas a images/ y cambia la URL del producto por, por ejemplo, "images/mi-iphone.jpg". Luego cambia fotoDeReferencia a false.
- Las URLs externas pueden cambiar o dejar de funcionar; por eso son una solución temporal.
- Se corrigió el nombre "iPhone 17 Air" a "iPhone Air".
