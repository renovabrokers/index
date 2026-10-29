# Landing — Presupuestos para seguros (Renova Brokers)

Sitio estático: no necesita build ni servidor.

- `index.html` — página completa (HTML + CSS inline)
- `main.js` — formulario: arma el mensaje y abre WhatsApp con los datos cargados
- `assets/` — imágenes optimizadas (WebP + JPG de respaldo)
- `.htaccess` — HTTPS, encabezados de seguridad, compresión y caché (cPanel / Apache)
- `_original/` — export original del diseño (no subir a public_html)
- `_herramientas/hoja_presupuesto.py` — regenera la imagen de la hoja de presupuesto (no subir a public_html)

## Pendiente: datos del negocio

Buscar `PENDIENTE` en `index.html` y `main.js` y completar:

- **Dominio** — reemplazar `https://DOMINIO-PENDIENTE/` (3 lugares) y descomentar la línea `canonical`.
- **WhatsApp** — reemplazar `https://wa.me/PENDIENTE` (5 lugares) por `https://wa.me/549...`, el texto `WhatsApp PENDIENTE` (2 lugares) por el número legible, y `WA_NUMBER` en `main.js`.
- **Dirección, ciudad y provincia** — bloque de contacto, footer, línea superior del hero, `meta description` y datos estructurados (`ld+json`).
- **Año de inicio** — línea superior del hero y `foundingDate`.
- **CUIT** — footer.
- **Imagen del presupuesto** — ya dice "Taller de chapa y pintura Renova". Cuando estén la dirección, el WhatsApp y el CUIT, agregarlos en `LINEAS` de `_herramientas/hoja_presupuesto.py` y volver a correrlo (necesita Pillow): `python _herramientas/hoja_presupuesto.py _original/assets/86766561a1842b06a6caaf3cf6fd3eb8.jpg assets vista.png`

Para verlo localmente: `python -m http.server` y abrir http://localhost:8000
