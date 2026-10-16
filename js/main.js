/* ============================================================
   Portfolio Web — carga dinámica de datos
   ------------------------------------------------------------
   Lee data/profile.json y data/projects.json y pinta el perfil
   y las tarjetas de proyecto.

   Edge cases implementados:
   - Enlaces externos: target="_blank" + rel="noopener noreferrer".
   - Imagen que falla al cargar (onerror) → placeholder.
   - Dato opcional ausente → "No disponible".
   - JSON inaccesible o mal formado → mensaje de error visible;
     nunca página en blanco.
   ============================================================ */

'use strict';

/* ---------- Constantes ---------- */

const URL_PERFIL = 'data/profile.json';
const URL_PROYECTOS = 'data/projects.json';
const PLACEHOLDER_IMAGEN = 'assets/placeholder.svg';
const TEXTO_NO_DISPONIBLE = 'No disponible';
const MENSAJE_ERROR = 'No se pudieron cargar los datos.';

/* ---------- Utilidades ---------- */

function datoO(texto) {
  if (typeof texto === 'string' && texto.trim() !== '') {
    return texto;
  }
  return TEXTO_NO_DISPONIBLE;
}

async function cargarJSON(url) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar ${url} (HTTP ${respuesta.status})`);
  }
  return respuesta.json();
}

function mostrarError(contenedor) {
  if (!contenedor) return;

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

/* ---------- Perfil ---------- */

function pintarPerfil(data) {
  const perfil = data.perfil || data;

  // Foto
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

  // Nombre
  const nombre = document.getElementById('perfil-nombre');
  if (nombre) nombre.textContent = datoO(perfil.nombre);

  // Titular / rol
  const rol = document.getElementById('perfil-rol');
  if (rol) rol.textContent = datoO(perfil.titular || perfil.rol);

  // Claim / bio
  const bio = document.getElementById('perfil-bio');
  if (bio) bio.textContent = datoO(perfil.claim || perfil.bio);

  // Ubicación
  const ubicacion = document.getElementById('perfil-ubicacion');
  if (ubicacion) ubicacion.textContent = datoO(perfil.ubicacion);

  // Email
  const email = document.getElementById('contacto-email');
  if (email) {
    const valor = datoO(perfil.correo || perfil.email);
    if (valor === TEXTO_NO_DISPONIBLE) {
      email.removeAttribute('href');
      email.textContent = TEXTO_NO_DISPONIBLE;
    } else {
      email.href = `mailto:${perfil.correo || perfil.email}`;
      email.textContent = perfil.correo || perfil.email;
    }
  }

  // LinkedIn y GitHub
  pintarContactoOpcional('contacto-linkedin', perfil.linkedin);
  pintarContactoOpcional('contacto-github', perfil.github);
}

function pintarContactoOpcional(id, url) {
  const enlace = document.getElementById(id);
  if (!enlace) return;

  if (typeof url === 'string' && url.trim() !== '') {
    enlace.href = url;
  } else {
    enlace.removeAttribute('href');
    enlace.removeAttribute('target');
    enlace.removeAttribute('rel');
    enlace.textContent = TEXTO_NO_DISPONIBLE;
  }
}

/* ---------- Proyectos ---------- */

function pintarProyectos(data) {
  const lista = document.getElementById('lista-proyectos');
  const plantilla = document.getElementById('plantilla-proyecto');
  if (!lista || !plantilla) return;

  const proyectos = data.proyectos || data;

  if (!Array.isArray(proyectos)) {
    throw new TypeError('data/projects.json no contiene un array de proyectos');
  }

  for (const proyecto of proyectos) {
    const tarjeta = plantilla.content.cloneNode(true);

    // Imagen
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
      imagen.alt = proyecto.nombre || proyecto.titulo
        ? `Imagen del proyecto ${proyecto.nombre || proyecto.titulo}`
        : 'Imagen del proyecto';
    }

    // Título
    const titulo = tarjeta.querySelector('.proyecto__titulo');
    if (titulo) titulo.textContent = datoO(proyecto.nombre || proyecto.titulo);

    // Descripción
    const descripcion = tarjeta.querySelector('.proyecto__descripcion');
    if (descripcion) descripcion.textContent = datoO(proyecto.descripcion);

    // Tecnología (string único en el JSON del curso)
    const tecnologias = tarjeta.querySelector('.proyecto__tecnologias');
    if (tecnologias) {
      const tec = proyecto.tecnologia || proyecto.tecnologias;
      if (typeof tec === 'string' && tec.trim() !== '') {
        const item = document.createElement('li');
        item.textContent = tec;
        tecnologias.appendChild(item);
      } else if (Array.isArray(tec) && tec.length > 0) {
        for (const t of tec) {
          const item = document.createElement('li');
          item.textContent = t;
          tecnologias.appendChild(item);
        }
      } else {
        const item = document.createElement('li');
        item.textContent = TEXTO_NO_DISPONIBLE;
        tecnologias.appendChild(item);
      }
    }

    // Enlace
    const enlace = tarjeta.querySelector('.proyecto__enlace');
    if (enlace) {
      const url = proyecto.enlace || proyecto.github;
      enlace.href = datoO(url) === TEXTO_NO_DISPONIBLE ? '#' : url;
      enlace.target = '_blank';
      enlace.rel = 'noopener noreferrer';
    }

    lista.appendChild(tarjeta);
  }
}

/* ---------- Arranque ---------- */

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
