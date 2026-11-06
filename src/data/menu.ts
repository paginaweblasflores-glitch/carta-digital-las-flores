/**
 * Carta Las Flores — estructura, precios e imágenes.
 * Textos en español tomados de la carta impresa del restaurante (PDF).
 * Postres y bebidas tomados de la carta web (las-flores-web).
 * Las traducciones viven en src/i18n/<idioma>.ts, indexadas por `id`.
 */

export type NoteKey =
  | "domingos"
  | "domingosFeriados"
  | "stock"
  | "disponibilidad"
  | "vegetariano"
  | "bajaTemp";

export type VariantKey =
  | "medio"
  | "entero"
  | "deshuesado"
  | "milanesa"
  | "polloGrill"
  | "filetMignon"
  | "lomoSaltado";

export type SectionKey =
  | "desayuno"
  | "entradas"
  | "chef"
  | "especialidades"
  | "grill"
  | "tipicos"
  | "calderia"
  | "pastas"
  | "infantil"
  | "extras"
  | "postres"
  | "bebidas";

export interface Variant {
  k: VariantKey | null; // null = precio base sin etiqueta
  price: number;
}

export interface Item {
  id: string;
  /** Nombre original en español: es el que se usa para pedir. */
  name: string;
  desc?: string;
  price?: number;
  variants?: Variant[];
  img?: string;
  notes?: NoteKey[];
}

export interface Section {
  id: SectionKey;
  items: Item[];
  /** Lista breve sin fotos (extras). */
  compact?: boolean;
}

const img = (slug: string) => `/platos/${slug}.webp`;

export const BREAKFAST_PRICE = 40;

export const sections: Section[] = [
  {
    id: "desayuno",
    items: [
      {
        id: "pan-butifarra",
        name: "Pan con butifarra",
        desc: "Jugoso jamón del país con cebolla encurtida y pan crujiente que despierta cada sentido.",
      },
      {
        id: "pan-chicharron",
        name: "Pan con chicharrón",
        desc: "Chicharrón tierno y crocante con camote frito y cebolla encurtida, un contraste dulce y salado irresistible.",
      },
    ],
  },
  {
    id: "entradas",
    items: [
      {
        id: "pan-masa-madre",
        name: "Servicio de pan (masa madre)",
        desc: "4 tipos de pan artesanal de masa madre, acompañado de mantequilla saborizada y mermelada de fresas y tomate.",
        price: 16,
        img: img("servicio-pan-masa-madre"),
      },
      {
        id: "caldo-cuy",
        name: "Caldo de cuy",
        desc: "Concentrado de cuy con alto valor proteico acompañado con perejil, cebolla china y orégano molido.",
        price: 5,
        img: img("caldo-de-cuy"),
      },
      {
        id: "caldo-acevichado",
        name: "Caldo acevichado",
        desc: "Renovamos nuestro caldo de cuy clásico para fusionarlo con un aliño de limón aromatizado, acompañado de una sarsa de la casa y papa nativa.",
        price: 9,
        img: img("caldo-acevichado"),
      },
      {
        id: "qapchi-huamanguino",
        name: "Qapchi huamanguino",
        desc: "Queso aplastado, saborizado con cebolla china, muña, huacatay, leche y trozos de ají rocoto, acompañado con papas nativas sancochadas.",
        price: 14,
        img: img("qapchi-huamanguino"),
      },
      {
        id: "qapchi-las-flores",
        name: "Qapchi Las Flores",
        desc: "Crema de queso y huacatay, creado en nuestras cocinas hace más de 30 años, acompañado de papas nativas doradas.",
        price: 14,
        img: img("qapchi-las-flores"),
      },
      {
        id: "tripitas-cuy",
        name: "Tripitas de cuy",
        desc: "Icónico plato a base de tripitas crocantes, acompañado con papas cocktail salteadas en mantequilla artesanal y especias, qapchi, mote y ensalada criolla.",
        price: 32,
        img: img("tripitas-de-cuy"),
        notes: ["stock"],
      },
      {
        id: "ensalada-huerto",
        name: "Ensalada del huerto",
        desc: "Preparada con palta de nuestro fundo en Huatatas, acompañada de hojas frescas y productos de temporada, según la estación. Terminada con un aliño suave que realza su frescura natural. Una opción ligera, simple y siempre fresca.",
        price: 22,
        img: img("ensalada-del-huerto"),
      },
      {
        id: "ensalada-parrillera",
        name: "Ensalada parrillera",
        desc: "Fresca cama de lechuga, coronada con nuestra cremosa ensalada de palta y jugoso pollo a la parrilla, acompañada de delicados aros de cebolla blanca y dulces tomates confitados, todo realzado con el inconfundible toque de nuestra vinagreta de sauco Las Flores.",
        price: 26,
        img: img("ensalada-parrillera"),
      },
    ],
  },
  {
    id: "chef",
    items: [
      {
        id: "leche-tigre",
        name: "Leche de tigre",
        desc: "Extracto concentrado de trucha salmonada, limón y ají, con un equilibrio preciso entre acidez y frescura.",
        price: 25,
        img: img("leche-de-tigre"),
      },
      {
        id: "ceviche-trucha",
        name: "Ceviche de trucha",
        desc: "200 g de trucha salmonada cortados en trozo, marinada en jugo de tumbo y limón fresco, acompañado de cebolla morada, cilantro y ají limo.",
        price: 34,
        img: img("ceviche-de-trucha"),
      },
      {
        id: "chicharron-trucha",
        name: "Chicharrón de trucha",
        desc: "Es crujiente por fuera, jugosa por dentro. Nuestra seleccionada trucha salmonada es cuidadosamente sazonada y acompañada con papas doradas y sarza criolla.",
        price: 36,
        img: img("chicharron-de-trucha"),
      },
      {
        id: "lomo-saltado",
        name: "Lomo saltado",
        desc: "El ícono de nuestra cocina. El lomo saltado es ese encuentro perfecto entre historia y fuego, donde el wok abraza cortes jugosos de carne.",
        price: 40,
        img: img("lomo-saltado"),
      },
      {
        id: "milanesa-pollo",
        name: "Milanesa de pollo",
        desc: "Jugosa milanesa de pollo empanizada con panko, frita al punto dorado perfecto y servida con nuestra salsa especial Las Flores, que realza su sabor con un toque casero y equilibrado.",
        price: 34,
        img: img("milanesa-de-pollo"),
      },
    ],
  },
  {
    id: "especialidades",
    items: [
      {
        id: "cuy-las-flores",
        name: "Cuy Las Flores",
        desc: "Plato insignia, acompañado con papas nativas doradas, qapchi, choclo salteado en especias, ensalada criolla y chips de papas.",
        variants: [
          { k: "medio", price: 38 },
          { k: "entero", price: 68 },
        ],
        img: img("cuy-las-flores"),
      },
      {
        id: "cuy-deshuesado",
        name: "Cuy Las Flores (deshuesado)",
        desc: "Nuestra versión deshuesada del tradicional cuy frito conserva su sabor auténtico, con una textura más delicada y una experiencia práctica y elegante.",
        variants: [
          { k: "medio", price: 42 },
          { k: "entero", price: 72 },
        ],
        img: img("cuy-las-flores-deshuesado"),
      },
      {
        id: "chicharron-huamanguino",
        name: "Chicharrón huamanguino",
        desc: "Trozos de carne de cerdo dorados en su propia manteca, acompañado de papas sancochadas, qapchi, chips de camote y ensalada criolla.",
        price: 36,
        img: img("chicharron-huamanguino"),
      },
      {
        id: "mixto",
        name: "Mixto (cuy + chicharrón)",
        desc: "Medio cuy frito y trozos de chicharrón, acompañado de mix de papas nativas, qapchi, choclo salteado y ensalada criolla.",
        variants: [
          { k: null, price: 52 },
          { k: "deshuesado", price: 58 },
        ],
        img: img("mixto-cuy-chicharron"),
      },
      {
        id: "chancho-asado",
        name: "Chancho asado Las Flores",
        desc: "Carne de cerdo macerado en distintas especias, acompañado de pastel de papa, crema de pimentón, chips de camote y ensalada hawaiana.",
        price: 36,
        img: img("chancho-asado-las-flores"),
      },
      {
        id: "trucha-andina",
        name: "Trucha andina",
        desc: "Trucha deshuesada, empanizada con maíz molido u hojuelas de quinua, acompañado de arroz a la jardinera, chips de papas y ensalada mixta orgánica.",
        price: 32,
        img: img("trucha-andina"),
      },
    ],
  },
  {
    id: "grill",
    items: [
      {
        id: "filet-mignon",
        name: "Gran filet mignon",
        desc: "500 gramos del corte más suave de la res, cocido a la parrilla para lograr una experiencia jugosa y tierna. Se acompaña con guarnición a elección: papas fritas francesas o papas salteadas en mantequilla, ensalada orgánica o sancochada.",
        price: 80,
        img: img("gran-filet-mignon"),
        notes: ["bajaTemp"],
      },
      {
        id: "suprema-pollo",
        name: "Suprema de pollo",
        desc: "Jugosa pechuga de pollo a la parrilla, servida con papas fritas doradas, ensalada fresca de la casa y cremas seleccionadas para realzar cada bocado.",
        price: 32,
        img: img("suprema-de-pollo"),
        notes: ["bajaTemp"],
      },
      {
        id: "pollo-champinones",
        name: "Pollo en salsa de champiñones frescos",
        desc: "Pechuga de pollo al grill, glaseada con una cremosa salsa blanca con champiñones salteados, servida con arroz blanco y ensalada hawaiana.",
        price: 32,
        img: img("pollo-en-salsa-de-champinones-frescos"),
        notes: ["bajaTemp"],
      },
      {
        id: "chuleta-cerdo",
        name: "Chuleta de cerdo",
        desc: "350 g de carne de cerdo en salsa BBQ o chimichurri, acompañado de papas nativas cocktail o papas fritas y ensalada orgánica con palta de nuestro fundo.",
        price: 34,
        img: img("chuleta-de-cerdo"),
        notes: ["bajaTemp"],
      },
      {
        id: "setas",
        name: "Setas y champiñones",
        desc: "Elaborada con hongos frescos al grill, acompañados de papas fritas y ensalada orgánica con palta de nuestro fundo.",
        price: 36,
        img: img("setas-y-champinones"),
        notes: ["vegetariano"],
      },
      {
        id: "filete-trucha",
        name: "Filete de trucha salmonada",
        desc: "Acompañada con champiñones y espárragos salteados, papas nativas y ensalada fresca, bañada en una salsa de mantequilla, romero, ajos y naranja de la selva ayacuchana.",
        price: 38,
        img: img("filete-de-trucha-salmonada"),
        notes: ["bajaTemp"],
      },
    ],
  },
  {
    id: "tipicos",
    items: [
      {
        id: "escabeche",
        name: "Escabeche de gallina Tres Generaciones",
        desc: "Plato tradicional de la cocina ayacuchana, preparado con gallina, ajíes y cebolla que le dan un sabor intenso y equilibrado, servido con camote. Una receta que viene de tres generaciones atrás y que hoy preservamos en Las Flores como parte de nuestra identidad.",
        price: 42,
      },
      {
        id: "chorizo",
        name: "Chorizo ayacuchano",
        desc: "Plato elaborado a base de carne molida de chancho y res, en una cama de lechuga, acompañado de papa blanca sancochada, porción de choclo y ensalada regional.",
        price: 28,
        img: img("chorizo-ayacuchano"),
      },
      {
        id: "puca-picante",
        name: "Puca picante",
        desc: "Guiso de papa vieja en salsa de ají panca con maní tostado, trozos de carne de cerdo y especias, servido con arroz blanco, ensalada regional y una presa de chicharrón huamanguino.",
        price: 28,
        img: img("puca-picante"),
      },
    ],
  },
  {
    id: "calderia",
    items: [
      {
        id: "caldo-gallina",
        name: "Caldo de gallina",
        desc: "Clásico de nuestra cocina peruana, elaborado con gallina, fideos, papa y hierbas aromáticas que le dan un sabor casero, profundo y reconfortante.",
        price: 26,
        img: img("caldo-de-gallina"),
      },
      {
        id: "caldo-gallina-acevichado",
        name: "Caldo de gallina acevichado",
        desc: "Una versión especial de nuestro caldo de gallina, con un perfil más vibrante y aromático, que combina la calidez de la receta tradicional con un toque fresco y expresivo.",
        price: 32,
        img: img("caldo-de-gallina-acevichado"),
      },
      {
        id: "adobo",
        name: "Adobo huamanguino",
        desc: "Plato tradicional de la cocina ayacuchana, preparado con carne de cerdo, ajíes y especias que le dan un sabor intenso y reconfortante, acompañado con pan chapla.",
        price: 30,
        notes: ["disponibilidad"],
      },
      {
        id: "mondongo",
        name: "Mondongo ayacuchano",
        desc: "Clásico de los Andes peruanos, preparado con maíz pelado, mix de carnes y hierbas andinas en una cocción que concentra su sabor y carácter tradicional. Una sopa sustanciosa y reconfortante, muy ligada a nuestras costumbres.",
        price: 24,
        img: img("mondongo-ayacuchano"),
        notes: ["domingosFeriados"],
      },
      {
        id: "caldo-pata",
        name: "Caldo de pata",
        desc: "Caldo tradicional de sabor profundo, preparado a base de pata de res y especias, con una cocción lenta que concentra su carácter y textura. Reconocido por su aporte de colágeno.",
        price: 22,
        img: img("caldo-de-pata"),
        notes: ["domingos"],
      },
      {
        id: "caldo-cabeza",
        name: "Caldo de cabeza",
        desc: "Clásico de la cocina andina, elaborado con presas de cabeza, hierbas y especias en una cocción lenta que realza su sabor y consistencia. Una sopa de carácter intenso, muy ligada a jornadas tempranas y a la tradición popular.",
        price: 24,
        notes: ["domingos"],
      },
      {
        id: "caldo-lengua",
        name: "Caldo de lengua",
        desc: "Sopa tradicional de la cocina andina, elaborada con lengua, hierbas y especias en una cocción pausada que realza su textura y sabor. Muy valorada por quienes buscan una de las presas más sabrosas y nobles de nuestra cocina.",
        price: 30,
        notes: ["domingos"],
      },
    ],
  },
  {
    id: "pastas",
    items: [
      {
        id: "duo-pastas",
        name: "Dúo de pastas",
        desc: "Dos clásicos en un solo plato: fetuccini a la huancaína con pollo al grill y espagueti al pesto con filet mignon a la parrilla, en una combinación pensada para disfrutar lo mejor de ambas pastas.",
        price: 56,
        img: img("duo-de-pastas"),
      },
      {
        id: "espagueti-pesto",
        name: "Espagueti al pesto",
        desc: "Espagueti Angesi bañado en una cremosa salsa al pesto, elaborado con albahaca seleccionada, pistachos y aceite de oliva, logrando una combinación aromática, fresca y elegante.",
        variants: [
          { k: "milanesa", price: 42 },
          { k: "polloGrill", price: 40 },
          { k: "filetMignon", price: 46 },
        ],
        img: img("espagueti-al-pesto"),
      },
      {
        id: "fetuccini-huancaina",
        name: "Fetuccini a la huancaína",
        desc: "Fetuccini Angesi cubierto con una cremosa salsa de huancaína, acompañado de lomo saltado al wok con cebolla y tomate, en una fusión intensa y generosa de sabores peruanos.",
        variants: [
          { k: "polloGrill", price: 40 },
          { k: "lomoSaltado", price: 44 },
        ],
        img: img("fetuccini-a-la-huancaina"),
      },
    ],
  },
  {
    id: "infantil",
    items: [
      {
        id: "nuggets-cuy",
        name: "Nuggets de cuy",
        desc: "Tiernos bocados de cuy, suavemente sazonados y empanizados al dorado perfecto, ofreciendo un sabor único en una presentación divertida.",
        price: 40,
        img: img("nuggets-de-cuy"),
      },
      {
        id: "milanesa-infantil",
        name: "Milanesa de pollo infantil",
        desc: "150 gramos de jugosa milanesa de pollo empanizada con panko, frita al punto dorado perfecto.",
        price: 38,
        img: img("milanesa-de-pollo-infantil"),
      },
    ],
  },
  {
    id: "extras",
    compact: true,
    items: [
      {
        id: "choclo-queso",
        name: "Choclo con queso",
        desc: "Tesoro andino acompañado con queso pasteurizado, chips de papas nativas y uchucuta (ají de chacra).",
        price: 12,
      },
      { id: "arroz", name: "Porción de arroz blanco", price: 5 },
      { id: "papa-sancochada", name: "Porción de papa sancochada o dorada", price: 5 },
      { id: "papa-frita", name: "Porción de papa frita", price: 8 },
      { id: "queso", name: "Porción de queso", price: 5 },
      { id: "ensalada-simple", name: "Porción de ensalada simple", price: 6 },
      { id: "pastel-papa", name: "Porción de pastel de papa", price: 9 },
    ],
  },
  {
    id: "postres",
    items: [
      {
        id: "mazamorra-calabaza",
        name: "Mazamorra de calabaza",
        desc: "Postre andino a base de calabaza madura, chancaca y especias.",
        price: 15,
        img: img("mazamorra-de-calabaza"),
      },
      {
        id: "tortino",
        name: "Tortino de chocolate andino",
        desc: "Fundente tortino de chocolate con crema inglesa infusionada con hierba luisa.",
        price: 22,
        img: img("tortino-de-chocolate-andino"),
      },
      {
        id: "carrot-cake",
        name: "Carrot cake",
        desc: "Tarta de zanahorias, frutos secos y mantequilla artesanal.",
        price: 20,
        img: img("carrot-cake"),
      },
      {
        id: "tarta-vasca",
        name: "Tarta vasca",
        desc: "Clásica tarta vasca con fina selección de frutos de estación.",
        price: 24,
        img: img("tarta-vasca"),
      },
      {
        id: "crepe-suzette",
        name: "Crêpe Suzette",
        desc: "Delicadas crêpes francesas, bañadas en una sedosa salsa de naranja y mantequilla, con el toque elegante de brandy que despierta los sentidos.",
        price: 26,
        img: img("crepe-suzette"),
      },
    ],
  },
  {
    id: "bebidas",
    items: [
      {
        id: "chicha-morada",
        name: "Chicha morada especial",
        desc: "Maíz morado con piña, manzana y especias aromáticas.",
        price: 20,
        img: img("chicha-morada-especial"),
      },
      {
        id: "chicha-quinua",
        name: "Chicha de quinua",
        desc: "Bebida tradicional a base de quinua blanca, 14 frutas y especias.",
        price: 22,
        img: img("chicha-de-quinua"),
      },
      {
        id: "chicha-8-semillas",
        name: "Chicha de 8 semillas",
        desc: "El sabor único de la chicha de 7 semillas, cuidadosamente fermentada, se combina con la cerveza negra para brindar una experiencia más exquisita.",
        price: 22,
        img: img("chicha-de-8-semillas"),
      },
      {
        id: "jora",
        name: "Jora del Inka moderno",
        desc: "Bebida tradicional andina de maíz germinado, mezclada con zumo de maracuyá, que aporta un sabor refrescante.",
        price: 20,
        img: img("jora-del-inka-moderno"),
      },
      {
        id: "sumaq",
        name: "Sumaq",
        desc: "Mezcla de tumbo, granadilla y manzanilla.",
        price: 22,
        img: img("sumaq"),
      },
      {
        id: "nectar-andino",
        name: "Néctar andino",
        desc: "Níspero andino con maracuyá y anís estrella.",
        price: 22,
        img: img("nectar-andino"),
      },
      {
        id: "tuna-sua",
        name: "Tuna sua",
        desc: "Tuna, acompañada de piña y leche condensada, en una mezcla fresca con notas dulces y herbales.",
        price: 22,
        img: img("tuna-sua"),
      },
      {
        id: "maracumango",
        name: "Maracumango",
        desc: "Deliciosa bebida en la que el maracuyá se combina con el mango, ofreciendo un sabor único e irresistible.",
        price: 20,
        img: img("maracumango"),
      },
      {
        id: "carambola",
        name: "Carambola tropical",
        desc: "Fusión de carambola, piña y limón, con un perfil refrescante y ligeramente ácido.",
        price: 20,
        img: img("carambola-tropical"),
      },
      {
        id: "hierbas-andinas",
        name: "Hierbas andinas",
        desc: "Encuentro de hierbas andinas, pepino, manzana y limón en una bebida ligera, refrescante y de carácter herbal.",
        price: 20,
        img: img("hierbas-andinas"),
      },
      {
        id: "frutos-rojos",
        name: "Frutos rojos",
        desc: "Refrescante combinación de frutos rojos ayacuchanos y durazno, con un perfil dulce y vibrante.",
        price: 22,
        img: img("frutos-rojos"),
      },
    ],
  },
];

export const BREAKFAST_IMG = img("desayuno-ayacuchano-completo");
