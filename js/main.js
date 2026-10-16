/* ============================================================
   Portfolio Web — carga dinámica de datos (R1, R2)
   ------------------------------------------------------------
   Lee data/profile.json y data/projects.json y pinta el perfil
   y las tarjetas de proyecto. El alumno NO edita este archivo:
   solo los JSON y assets/ (R4).

   Reglas de negocio (SPEC §7) y edge cases (SPEC §10)
   implementados aquí:
   - Enlaces GitHub de proyectos: target="_blank" + rel="noopener noreferrer".
   - Proyecto sin imagen → placeholder genérico (assets/placeholder.svg).
   - Imagen que falla al cargar (onerror) → placeholder.
   - Dato opcional ausente → "No disponible".
   - JSON inaccesible o mal formado → mensaje de error visible
     ("No se pudieron cargar los datos"); nunca página en blanco.
   ============================================================ */

'use strict';

/* ---------- Constantes ---------- */

const URL_PERFIL = 'data/profile.json';
const URL_PROYECTOS = 'data/projects.json';
const PLACEHOLDER_IMAGEN = 'assets/placeholder.svg';
const TEXTO_NO_DISPONIBLE = 'No disponible';
const MENSAJE_ERROR = 'No se pudieron cargar los datos.';

/* ---------- Utilidades ---------- */

/**
 * Devuelve el texto del dato o "No disponible" si está ausente
 * (undefined, null, cadena vacía o solo espacios). SPEC §7.
 */
function datoO(texto) {
  if (typeof texto === 'string' && texto.trim() !== '') {
    return texto;
  }
  return TEXTO_NO_DISPONIBLE;
}

/**
 * Hace fetch de un JSON y valida la respuesta.
 * Lanza un error si el archivo no es accesible (404, 500…)
 * o si el contenido no es JSON bien formado. SPEC §10.
 */
async function cargarJSON(url) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar ${url} (HTTP ${respuesta.status})`);
  }
  // response.json() lanza SyntaxError si el JSON está mal formado.
  return respuesta.json();
}

/**
 * Muestra un mensaje de error visible y legible dentro del
 * elemento indicado. Nunca deja la página en blanco. SPEC §10.
 */
function mostrarError(contenedor) {
  if (!contenedor) return;

  // Si la sección ya tiene su propio mensaje de error maquetado
  // (p.ej. #proyectos-error en el HTML), lo reutilizamos.
  const errorMaquetado = contenedor.querySelector('.proyectos__error');
  if (errorMaquetado) {
    errorMaquetado.hidden = false;
    return;
  }

  const aviso = document.createElement('p');
  aviso.className = 'error-carga';
  aviso.setAttribute('role', 'alert');
  aviso.textContent = MENSAJE_ERROR;
  contenedor.appendChild(aviso);
}

/* ---------- Perfil (R1) ---------- */

function pintarPerfil(perfil) {
  // Foto (obligatoria). Si la ruta falla al cargar, placeholder.
  const foto = document.getElementById('perfil-foto');
  if (foto) {
    foto.addEventListener('error', () => {
      if (!foto.src.endsWith(PLACEHOLDER_IMAGEN)) {
        foto.src = PLACEHOLDER_IMAGEN;
      }
    });
    foto.src = datoO(perfil.foto) === TEXTO_NO_DISPONIBLE
      ? PLACEHOLDER_IMAGEN
      : perfil.foto;
    foto.alt = perfil.nombre
      ? `Foto de perfil de ${perfil.nombre}`
      : 'Foto de perfil';
  }

  // Datos de texto: obligatorios y opcionales ("No disponible" si faltan).
  const nombre = document.getElementById('perfil-nombre');
  if (nombre) nombre.textContent = datoO(perfil.nombre);

  const rol = document.getElementById('perfil-rol');
  if (rol) rol.textContent = datoO(perfil.rol);

  const bio = document.getElementById('perfil-bio');
  if (bio) bio.textContent = datoO(perfil.bio);

  const ubicacion = document.getElementById('perfil-ubicacion');
  if (ubicacion) ubicacion.textContent = datoO(perfil.ubicacion);

  // Contacto: email vía mailto: (la web no envía nada, SPEC §4).
  const email = document.getElementById('contacto-email');
  if (email) {
    const valor = datoO(perfil.email);
    if (valor === TEXTO_NO_DISPONIBLE) {
      email.removeAttribute('href');
      email.textContent = TEXTO_NO_DISPONIBLE;
    } else {
      email.href = `mailto:${perfil.email}`;
      email.textContent = perfil.email;
    }
  }

  // LinkedIn y GitHub (opcionales): enlace o "No disponible".
  pintarContactoOpcional('contacto-linkedin', perfil.linkedin);
  pintarContactoOpcional('contacto-github', perfil.github);
}

/**
 * Rellena un enlace de contacto opcional. Si el dato falta,
 * el enlace se desactiva y muestra "No disponible" (SPEC §7).
 */
function pintarContactoOpcional(id, url) {
  const enlace = document.getElementById(id);
  if (!enlace) return;

  if (typeof url === 'string' && url.trim() !== '') {
    enlace.href = url;
    // Los enlaces externos ya llevan target/rel en el HTML.
  } else {
    enlace.removeAttribute('href');
    enlace.removeAttribute('target');
    enlace.removeAttribute('rel');
    enlace.textContent = TEXTO_NO_DISPONIBLE;
  }
}

/* ---------- Proyectos (R2) ---------- */

function pintarProyectos(proyectos) {
  const lista = document.getElementById('lista-proyectos');
  const plantilla = document.getElementById('plantilla-proyecto');
  if (!lista || !plantilla) return;

  // El Data Contract define un array; si no lo es, lo tratamos
  // como dato mal formado (SPEC §10).
  if (!Array.isArray(proyectos)) {
    throw new TypeError('data/projects.json no contiene un array de proyectos');
  }

  // Se lista la totalidad de los proyectos del JSON (SPEC §9).
  for (const proyecto of proyectos) {
    const tarjeta = plantilla.content.cloneNode(true);

    // Imagen: si falta el dato → placeholder (SPEC §7).
    // Si la ruta existe pero falla al cargar → placeholder (onerror, SPEC §10).
    const imagen = tarjeta.querySelector('.proyecto__imagen');
    if (imagen) {
      imagen.addEventListener('error', () => {
        if (!imagen.src.endsWith(PLACEHOLDER_IMAGEN)) {
          imagen.src = PLACEHOLDER_IMAGEN;
        }
      });
      const rutaImagen = typeof proyecto.imagen === 'string' && proyecto.imagen.trim() !== ''
        ? proyecto.imagen
        : PLACEHOLDER_IMAGEN;
      imagen.src = rutaImagen;
      imagen.alt = proyecto.titulo
        ? `Imagen del proyecto ${proyecto.titulo}`
        : 'Imagen del proyecto';
    }

    const titulo = tarjeta.querySelector('.proyecto__titulo');
    if (titulo) titulo.textContent = datoO(proyecto.titulo);

    const descripcion = tarjeta.querySelector('.proyecto__descripcion');
    if (descripcion) descripcion.textContent = datoO(proyecto.descripcion);

    // Tecnologías: un <li> por cada una; "No disponible" si falta el array.
    const tecnologias = tarjeta.querySelector('.proyecto__tecnologias');
    if (tecnologias) {
      const listaTec = Array.isArray(proyecto.tecnologias) && proyecto.tecnologias.length > 0
        ? proyecto.tecnologias
        : [TEXTO_NO_DISPONIBLE];
      for (const tec of listaTec) {
        const item = document.createElement('li');
        item.textContent = tec;
        tecnologias.appendChild(item);
      }
    }

    // Enlace a GitHub: SIEMPRE en pestaña nueva con rel de seguridad
    // (SPEC §7). Se fuerza en JS además de venir en la plantilla.
    const enlace = tarjeta.querySelector('.proyecto__enlace');
    if (enlace) {
      enlace.href = datoO(proyecto.github) === TEXTO_NO_DISPONIBLE ? '#' : proyecto.github;
      enlace.target = '_blank';
      enlace.rel = 'noopener noreferrer';
    }

    lista.appendChild(tarjeta);
  }
}

/* ---------- Arranque ---------- */

// El script se carga con `defer`, así que el DOM ya está listo.
// Cada fetch tiene su propio .catch(): si un JSON falla, solo su
// sección muestra el error visible; la otra sigue funcionando y
// la página NUNCA queda en blanco (SPEC §10).

cargarJSON(URL_PERFIL)
  .then(pintarPerfil)
  .catch((error) => {
    console.error(MENSAJE_ERROR, error);
    mostrarError(document.getElementById('perfil'));
  });

cargarJSON(URL_PROYECTOS)
  .then(pintarProyectos)
  .catch((error) => {
    console.error(MENSAJE_ERROR, error);
    mostrarError(document.getElementById('proyectos'));
  });
