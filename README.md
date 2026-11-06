# Carta digital · Restaurante Las Flores

Carta digital del **Restaurante Turístico Las Flores** (Huamanga, Ayacucho · desde 1980), pensada para abrirse desde un código QR en la mesa.

- 9 idiomas: español, English, Deutsch, Français, Italiano, Português, 中文, 日本語, 한국어
- Cada plato muestra su nombre en español (para pedirlo al personal), la traducción y la descripción en el idioma elegido
- Detecta el idioma del teléfono y recuerda la última elección
- Diseño basado en la carta impresa: verde de la carta, bordados ayacuchanos y colibríes
- Sitio 100 % estático: rápido y sin servidor

## Tecnología

Next.js 15 (App Router, exportación estática) · React 19 · TypeScript · lucide-react

## Desarrollo local

Requisitos: Node.js 22 (ver `.nvmrc`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera la carpeta out/ lista para publicar
```

## Publicación en Cloudflare Pages

Conectar este repositorio en **Workers & Pages → Create → Pages → Connect to Git** con esta configuración:

| Opción | Valor |
|---|---|
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Variable de entorno | `NODE_VERSION` = `22` |

Cada `git push` a la rama principal publica la carta automáticamente.
Dominio propio: en el proyecto, **Custom domains** → `carta.restaurantelasflores.com` (crear el registro CNAME que indique Cloudflare).

## Código QR

Apuntar el QR a la URL publicada. El idioma se puede fijar desde el enlace:

```
https://carta.restaurantelasflores.com/?lang=en
https://carta.restaurantelasflores.com/?lang=ja
```

Códigos: `es` `en` `de` `fr` `it` `pt` `zh` `ja` `ko`. Sin parámetro se usa el idioma del teléfono.

## Editar la carta

| Qué | Dónde |
|---|---|
| Platos, precios, fotos y textos en español | `src/data/menu.ts` |
| Traducciones (misma clave `id` que en `menu.ts`) | `src/i18n/<idioma>.ts` |
| Textos de la interfaz por idioma | `src/i18n/<idioma>.ts` → `ui`, `sections`, `notes` |
| Fotos de los platos | `public/platos/` |
| Bordados, colibrí y logos | `public/ornamentos/` |
| Estilos y colores | `src/app/globals.css` |
| Imagen al compartir el link (WhatsApp, redes) | `public/vista-previa.jpg` (1200×630) |
| Dominio público de la carta | `SITE_URL` en `src/app/layout.tsx` |

Para agregar un plato: añadirlo en `menu.ts` con un `id` nuevo y su traducción con el mismo `id` en cada archivo de `src/i18n/`.

## Documentación de diseño

- `PRODUCT.md`: público, objetivos y compromisos de marca
- `DESIGN.md`: paleta, tipografía y componentes
