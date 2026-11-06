# DESIGN — Carta Las Flores

El mundo visual es el de la carta impresa del restaurante, llevado a pantalla: un **campo verde oliva a página completa**, texto crema, **bordados florales ayacuchanos** (extraídos del propio PDF) como único ornamento, y capitulares espaciadas. Sin tarjetas, sin degradados decorativos.

## Color (estrategia: Drenched — la superficie *es* el color)
| Token | Valor | Uso |
|---|---|---|
| `--oliva` | `#577b4a` | Fondo de toda la página (verde exacto de la carta impresa) |
| `--oliva-hondo` | `#48683d` | Relleno de fotos mientras cargan |
| `--oliva-noche` | `#34502c` | Barra fija, hojas y visor (mismo tono, más profundo) |
| `--crema` | `#fffcf0` | Texto principal (4.7:1 sobre el verde) |
| `--crema-2` | `#fdf9ea` | Descripciones y etiquetas (4.6:1) |
| `--crema-3` | `#d4ddc0` | Solo sobre `--oliva-noche` (6.4:1): enlaces inactivos de la barra |
| `--filete` / `--filete-fuerte` | crema 28% / 55% | Filetes de 1px |
| `--hilo-rojo` `--hilo-azul` `--hilo-verde` | `#f3b49c` `#c2dcf2` `#d6ecc0` | Solo iconos y el rombo del filete |

Sobre este verde la jerarquía se marca con tamaño, itálica y mayúsculas, no con texto atenuado: cualquier crema más oscura baja de 4.5:1.

Fondo con trama de ruido SVG muy sutil (paño) y un halo cálido arriba.

## Tipografía
- **Marcellus** (display): nombres de plato, títulos de sección, precios, etiquetas — siempre en mayúsculas con tracking 0.08–0.3em.
- **Alegreya** (texto): descripciones; *itálica* para traducciones del nombre y textos de voz del restaurante.
- CJK: Noto Serif SC / JP / KR, cargadas bajo demanda solo al elegir zh / ja / ko (variable `--cjk`).

## Componentes
- **Portada**: dos colibríes bordados de la carta impresa (`colibri.webp`, uno en espejo) a los lados mirando al centro —en móvil, pequeños en las esquinas superiores—; logo script blanco centrado, lema, fila de idiomas escritos en su propio idioma (subrayado = activo), "Ver la carta".
- **Barra fija** (`.indice`): botón de idioma (globo + código) y secciones en scroll horizontal; subrayado de 1px que crece en la activa.
- **Plato** (`.plato`): nombre en español (para pedir) + precio en la misma línea; traducción en itálica; descripción; notas con icono; foto cuadrada a la derecha con marco interior crema de 1px. Toque en la foto → visor.
- **Variantes**: pares etiqueta + precio en línea (Medio / Entero, proteínas de pasta).
- **Extras**: lista con puntos guía.
- **Desayuno**: foto 3:2 enmarcada, título, horario, precio único, cuatro pasos.
- **Ramos de sección**: bordados que sangran por el borde (móvil) o viven en los márgenes (≥1180px).
- **Hoja de idiomas**: `<dialog>` tipo hoja inferior. **Visor**: `<dialog>` con foto, nombre y precio.

## Movimiento
El cambio de idioma es un fundido de opacidad (sin `filter`, que rompe el render en páginas muy altas). Respeta `prefers-reduced-motion`.
