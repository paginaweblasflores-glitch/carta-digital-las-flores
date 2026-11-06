"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  CalendarDays,
  Check,
  ChevronDown,
  Globe,
  Info,
  Leaf,
  MapPin,
  Thermometer,
  X,
} from "lucide-react";
import {
  BREAKFAST_IMG,
  BREAKFAST_PRICE,
  sections,
  type Item,
  type NoteKey,
  type Section,
  type SectionKey,
} from "@/data/menu";
import { LANGS, type Dict, type Lang } from "@/i18n/types";
import { useLanguage } from "./useLanguage";

/* Bordados que separan los grandes capítulos de la carta, como en la carta impresa. */
const BOUQUETS: Partial<Record<SectionKey, { src: string; side: "left" | "right" }>> = {
  chef: { src: "/ornamentos/bordado-ramo.webp", side: "right" },
  tipicos: { src: "/ornamentos/bordado-silvestre.webp", side: "left" },
  infantil: { src: "/ornamentos/bordado-guirnalda.webp", side: "right" },
  postres: { src: "/ornamentos/bordado-ramo.webp", side: "left" },
};

const NOTE_ICON: Record<NoteKey, typeof Info> = {
  domingos: CalendarDays,
  domingosFeriados: CalendarDays,
  stock: Info,
  disponibilidad: Info,
  vegetariano: Leaf,
  bajaTemp: Thermometer,
};

const soles = (n: number) => `S/ ${n}`;

export default function Carta() {
  const { lang, dict, setLang, switching } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [photo, setPhoto] = useState<Item | null>(null);
  const [active, setActive] = useState<SectionKey>(sections[0].id);
  const navRef = useRef<HTMLDivElement>(null);

  /* Sección activa según el scroll */
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id as SectionKey);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Mantener visible la pestaña activa en la barra */
  useEffect(() => {
    const nav = navRef.current;
    const btn = nav?.querySelector<HTMLAnchorElement>(`[data-id="${active}"]`);
    if (!nav || !btn) return;
    const left = btn.offsetLeft - nav.clientWidth / 2 + btn.clientWidth / 2;
    nav.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  const isEs = lang === "es";

  return (
    <div className={`carta${switching ? " is-switching" : ""}`}>
      {/* ───────────── Portada ───────────── */}
      <header className="portada">
        {/* Colibríes bordados de la carta impresa, mirando al centro */}
        <img className="portada__colibri portada__colibri--izq" src="/ornamentos/colibri.webp" alt="" width={640} height={830} aria-hidden />
        <img className="portada__colibri portada__colibri--der" src="/ornamentos/colibri.webp" alt="" width={640} height={830} aria-hidden />
        <h1 className="portada__logo">
          <img src="/ornamentos/logo-script.webp" alt="Las Flores" width={549} height={185} />
        </h1>
        <p className="portada__lema">{dict.ui.heroTitle}</p>

        <div className="portada__idiomas">
          <p className="portada__idiomas-label">
            <Globe size={14} strokeWidth={1.5} aria-hidden /> {dict.ui.chooseLanguage}
          </p>
          <ul>
            {LANGS.map((l) => (
              <li key={l.code}>
                <button
                  lang={l.code}
                  aria-pressed={lang === l.code}
                  className={lang === l.code ? "is-on" : undefined}
                  onClick={() => setLang(l.code)}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <a className="portada__entrar" href="#carta">
          {dict.ui.viewMenu}
          <ChevronDown size={18} strokeWidth={1.25} aria-hidden />
        </a>
      </header>

      {/* ───────────── Barra de secciones ───────────── */}
      <nav className="indice" aria-label={dict.ui.sectionsNav}>
        <button className="indice__lang" onClick={() => setLangOpen(true)} aria-label={dict.ui.chooseLanguage}>
          <Globe size={17} strokeWidth={1.5} aria-hidden />
          <span>{lang.toUpperCase()}</span>
        </button>
        <div className="indice__scroll" ref={navRef}>
          {sections.map((s) => (
            <a
              key={s.id}
              data-id={s.id}
              href={`#${s.id}`}
              className={active === s.id ? "is-on" : undefined}
              aria-current={active === s.id ? "true" : undefined}
            >
              {dict.sections[s.id]}
            </a>
          ))}
        </div>
      </nav>

      {/* ───────────── Carta ───────────── */}
      <main id="carta" className="carta__cuerpo">
        <div className="intro">
          <p className="intro__texto">{dict.ui.heroText}</p>
          {!isEs && (
            <p className="intro__aviso">
              <Info size={15} strokeWidth={1.5} aria-hidden />
              <span>{dict.ui.translationNote}</span>
            </p>
          )}
        </div>

        {sections.map((s) => (
          <SectionBlock key={s.id} section={s} dict={dict} isEs={isEs} onPhoto={setPhoto} />
        ))}
      </main>

      {/* ───────────── Cierre ───────────── */}
      <footer className="cierre">
        <img
          className="cierre__logo"
          src="/ornamentos/logo-circular.webp"
          alt="Restaurante Las Flores · desde 1980"
          width={487}
          height={496}
          loading="lazy"
        />
        <p className="cierre__gracias">{dict.ui.thanks}</p>
        <p className="cierre__dato">{dict.ui.pricesNote}</p>
        <p className="cierre__dato">
          <MapPin size={14} strokeWidth={1.5} aria-hidden /> Jr. José Olaya 106, Huamanga · Ayacucho, Perú
        </p>
        <a className="cierre__arriba" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <ArrowUp size={15} strokeWidth={1.5} aria-hidden /> {dict.ui.backToTop}
        </a>
      </footer>

      <LanguageSheet open={langOpen} lang={lang} dict={dict} onClose={() => setLangOpen(false)} onPick={(l) => { setLang(l); setLangOpen(false); }} />
      <PhotoViewer item={photo} dict={dict} isEs={isEs} onClose={() => setPhoto(null)} />
    </div>
  );
}

/* ───────────────────────── Secciones ───────────────────────── */

function SectionBlock({
  section,
  dict,
  isEs,
  onPhoto,
}: {
  section: Section;
  dict: Dict;
  isEs: boolean;
  onPhoto: (i: Item) => void;
}) {
  const title = dict.sections[section.id];
  const bouquet = BOUQUETS[section.id];

  return (
    <section id={section.id} className={`seccion seccion--${section.id}`} aria-labelledby={`t-${section.id}`}>
      {bouquet && (
        <img
          className={`seccion__ramo seccion__ramo--${bouquet.side}`}
          src={bouquet.src}
          alt=""
          loading="lazy"
          width={800}
          height={572}
        />
      )}

      <header className="seccion__cabecera">
        <h2 id={`t-${section.id}`} className="seccion__titulo">
          {title}
        </h2>
        {!isEs && <p className="seccion__original">{esTitle(section.id)}</p>}
      </header>

      {section.id === "desayuno" ? (
        <Breakfast section={section} dict={dict} isEs={isEs} />
      ) : section.compact ? (
        <ul className="extras">
          {section.items.map((it) => (
            <li key={it.id} className="extra">
              <div className="extra__linea">
                <span className="extra__nombre">{it.name}</span>
                <span className="extra__puntos" aria-hidden />
                <span className="precio">{soles(it.price!)}</span>
              </div>
              {!isEs && dict.items[it.id]?.[0] && <p className="plato__traduccion">{dict.items[it.id][0]}</p>}
              {(dict.items[it.id]?.[1] ?? it.desc) && <p className="plato__desc">{isEs ? it.desc : dict.items[it.id]?.[1] ?? it.desc}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="platos">
          {section.items.map((it) => (
            <Dish key={it.id} item={it} dict={dict} isEs={isEs} onPhoto={onPhoto} />
          ))}
        </ul>
      )}

      {section.id === "infantil" && <p className="seccion__nota">{dict.ui.kidsNote}</p>}
    </section>
  );
}

const ES_TITLES: Record<SectionKey, string> = {
  desayuno: "Desayuno",
  entradas: "Entradas",
  chef: "Recomendaciones del chef",
  especialidades: "Especialidades",
  grill: "Al grill",
  tipicos: "Platos típicos",
  calderia: "Caldería Las Flores",
  pastas: "Selección de pastas",
  infantil: "Menú infantil",
  extras: "Extras",
  postres: "Postres",
  bebidas: "Bebidas",
};
const esTitle = (k: SectionKey) => ES_TITLES[k];

function Dish({ item, dict, isEs, onPhoto }: { item: Item; dict: Dict; isEs: boolean; onPhoto: (i: Item) => void }) {
  const tr = dict.items[item.id];
  const desc = isEs ? item.desc : tr?.[1] ?? item.desc;

  return (
    <li className={`plato${item.img ? "" : " plato--sin-foto"}`}>
      <div className="plato__texto">
        <div className="plato__cabeza">
          <h3 className="plato__nombre">{item.name}</h3>
          {item.price != null && <p className="plato__precio precio">{soles(item.price)}</p>}
        </div>
        {!isEs && tr?.[0] && <p className="plato__traduccion">{tr[0]}</p>}
        {desc && <p className="plato__desc">{desc}</p>}
        {item.variants && <Variants item={item} dict={dict} />}
        {item.notes && (
          <ul className="plato__notas">
            {item.notes.map((n) => {
              const Icon = NOTE_ICON[n];
              return (
                <li key={n} className={`nota nota--${n}`}>
                  <Icon size={13} strokeWidth={1.5} aria-hidden />
                  {dict.notes[n]}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {item.img && (
        <button className="plato__foto" onClick={() => onPhoto(item)} aria-label={`${dict.ui.viewPhoto} ${item.name}`}>
          <img src={item.img} alt="" loading="lazy" decoding="async" width={300} height={300} />
        </button>
      )}
    </li>
  );
}

function Variants({ item, dict }: { item: Item; dict: Dict }) {
  return (
    <dl className="plato__variantes">
      {item.variants!.map((v) => (
        <div key={v.k ?? "base"}>
          {v.k && <dt>{dict.variants[v.k]}</dt>}
          <dd className="precio">{soles(v.price)}</dd>
        </div>
      ))}
    </dl>
  );
}

function Price({ item, dict }: { item: Item; dict: Dict }) {
  if (item.variants) return <Variants item={item} dict={dict} />;
  return item.price != null ? <p className="plato__precio precio">{soles(item.price)}</p> : null;
}

function Breakfast({ section, dict, isEs }: { section: Section; dict: Dict; isEs: boolean }) {
  const b = dict.breakfast;
  return (
    <div className="desayuno">
      <figure className="desayuno__foto">
        <img src={BREAKFAST_IMG} alt="" loading="lazy" width={1200} height={800} />
      </figure>

      <div className="desayuno__encabezado">
        <h3 className="desayuno__titulo">{b.title}</h3>
        <p className="desayuno__meta">
          <span>{b.hours}</span>
          <span className="precio desayuno__precio">{soles(BREAKFAST_PRICE)}</span>
        </p>
        <p className="desayuno__regla">{b.rule}</p>
      </div>

      <ol className="desayuno__pasos">
        <li>
          <h4>{b.hot}</h4>
          <p>{b.hotItems}</p>
        </li>
        <li>
          <h4>{b.cold}</h4>
          <p>{b.coldItems}</p>
        </li>
        <li>
          <h4>{b.sandwiches}</h4>
          {section.items.map((it) => (
            <div key={it.id} className="desayuno__sandwich">
              <p className="plato__nombre">{it.name}</p>
              {!isEs && dict.items[it.id]?.[0] && <p className="plato__traduccion">{dict.items[it.id][0]}</p>}
              <p className="plato__desc">{isEs ? it.desc : dict.items[it.id]?.[1] ?? it.desc}</p>
            </div>
          ))}
        </li>
        <li>
          <h4>{b.sides}</h4>
          <p>{b.sideItems}</p>
        </li>
      </ol>
    </div>
  );
}

/* ───────────────────────── Diálogos ───────────────────────── */

function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    const onClick = (e: MouseEvent) => {
      if (e.target === d) onClose();
    };
    d.addEventListener("cancel", onCancel);
    d.addEventListener("click", onClick);
    return () => {
      d.removeEventListener("cancel", onCancel);
      d.removeEventListener("click", onClick);
    };
  }, [onClose]);
  return ref;
}

function LanguageSheet({
  open,
  lang,
  dict,
  onClose,
  onPick,
}: {
  open: boolean;
  lang: Lang;
  dict: Dict;
  onClose: () => void;
  onPick: (l: Lang) => void;
}) {
  const ref = useDialog(open, onClose);
  return (
    <dialog ref={ref} className="hoja" aria-labelledby="hoja-titulo">
      <div className="hoja__panel">
        <div className="hoja__cabecera">
          <p id="hoja-titulo" className="hoja__titulo">
            <Globe size={16} strokeWidth={1.5} aria-hidden /> {dict.ui.chooseLanguage}
          </p>
          <button className="icon-btn" onClick={onClose} aria-label={dict.ui.close}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <ul className="hoja__lista">
          {LANGS.map((l) => (
            <li key={l.code}>
              <button lang={l.code} className={lang === l.code ? "is-on" : undefined} aria-pressed={lang === l.code} onClick={() => onPick(l.code)}>
                <span>{l.label}</span>
                {lang === l.code && <Check size={18} strokeWidth={1.5} aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}

function PhotoViewer({ item, dict, isEs, onClose }: { item: Item | null; dict: Dict; isEs: boolean; onClose: () => void }) {
  const ref = useDialog(!!item, onClose);
  const tr = item ? dict.items[item.id] : undefined;
  return (
    <dialog ref={ref} className="visor" aria-label={item?.name}>
      {item && (
        <div className="visor__panel">
          <button className="icon-btn visor__cerrar" onClick={onClose} aria-label={dict.ui.close}>
            <X size={20} strokeWidth={1.5} />
          </button>
          <img className="visor__img" src={item.img} alt={item.name} width={1200} height={1200} />
          <div className="visor__texto">
            <p className="plato__nombre">{item.name}</p>
            {!isEs && tr?.[0] && <p className="plato__traduccion">{tr[0]}</p>}
            <Price item={item} dict={dict} />
          </div>
        </div>
      )}
    </dialog>
  );
}
