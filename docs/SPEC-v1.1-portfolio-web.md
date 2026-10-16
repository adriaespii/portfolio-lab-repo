# SPEC v1.1 (APROBADA) — Portfolio Web para Prácticas

*Aprobada por Adri el 2026-10-16. Este documento es la fuente de verdad: cualquier cambio se valida y actualiza aquí ANTES de implementarse.*

## 1. Context
En Arema Software nos piden una web tipo portfolio porque con solo el currículum y el enlace a GitHub no entienden bien de qué va cada proyecto.

## 2. Goal
Crear una página web sencilla, accesible mediante URL pública, para mostrar la foto, la información del alumno, las formas de contacto y sus proyectos.

## 3. Users
* **Revisores de Arema Software:** la consultarán principalmente desde el móvil (también debe funcionar en desktop).
* **Alumnos:** usarán la plantilla como base para meter sus datos, editando únicamente los archivos JSON y `assets/`.

## 4. Scope
**In scope:**
* Sección de perfil con datos de usuario, foto y vías de contacto.
* Contacto mediante enlaces (email vía `mailto:`, LinkedIn, GitHub). Aclaración: un `mailto:` abre el cliente de correo del usuario; la web no envía nada.
* Listado de proyectos con imagen, descripción, tecnologías y enlace a GitHub.
* Carga dinámica de información usando los archivos JSON e imágenes locales.
* Maquetación responsive (móvil y desktop).
* Despliegue en hosting estático con URL pública.

**Out of scope:**
* Servidores, backend o bases de datos relacionales.
* Formularios de contacto interactivos o envío de correos desde la web.

## 5. Data Contract
**`data/profile.json`**
| Campo | Tipo | Obligatorio |
|---|---|---|
| `nombre` | string | ✅ |
| `rol` | string (titulación/rol) | ✅ |
| `bio` | string | ✅ |
| `foto` | string (ruta relativa a `assets/`) | ✅ |
| `email` | string | ✅ |
| `ubicacion` | string | Opcional |
| `linkedin` | string (URL) | Opcional |
| `github` | string (URL) | Opcional |

**`data/projects.json`** — array de proyectos:
| Campo | Tipo | Obligatorio |
|---|---|---|
| `titulo` | string | ✅ |
| `descripcion` | string | ✅ |
| `tecnologias` | array de strings (mín. 1) | ✅ |
| `github` | string (URL) | ✅ |
| `imagen` | string (ruta relativa a `assets/`) | Opcional |

## 6. Requirements
* **R1:** Cargar foto, datos personales y contacto desde `data/profile.json`.
* **R2:** Cargar y mostrar la lista de proyectos desde `data/projects.json`.
* **R3:** La web debe ser usable y legible desde 360px de ancho hasta desktop, sin scroll horizontal, con texto legible sin zoom y enlaces pulsables cómodamente en táctil.
* **R4:** El alumno debe poder personalizar todo el contenido editando únicamente los JSON y la carpeta `assets/`, sin modificar HTML/CSS/JS.
* **R5:** La web debe estar desplegada en hosting estático y accesible mediante URL pública.

## 7. Business Rules
* Usar de base los datos del perfil de ejemplo facilitados.
* Los enlaces a GitHub deben abrirse en una pestaña nueva (`target="_blank"`).
* Si falta la imagen de un proyecto, se muestra un placeholder genérico.
* Si falta un dato opcional, se muestra "No disponible".

## 8. User Flow
1. Entrar a la web (URL pública).
2. Ver la foto de perfil, la presentación y el contacto.
3. Bajar a la sección de proyectos.
4. Hacer clic en el enlace a GitHub de un proyecto → se abre en pestaña nueva.

## 9. Acceptance Criteria
* [ ] Se muestra la foto y la información personal desde `profile.json` y `assets/`.
* [ ] Se lista la totalidad de los proyectos de `projects.json`.
* [ ] En 360px y en desktop (1280px) no hay scroll horizontal y el texto es legible sin zoom.
* [ ] Los enlaces a GitHub de los proyectos abren en pestaña nueva.
* [ ] Un proyecto sin imagen muestra el placeholder genérico.
* [ ] Un dato opcional ausente muestra "No disponible".
* [ ] Editando solo los JSON y `assets/`, otro alumno puede publicar su portfolio sin tocar código.
* [ ] La web es accesible mediante URL pública.

## 10. Edge Cases
| Caso | Comportamiento esperado |
|---|---|
| Imagen de proyecto falta o no carga | Placeholder genérico |
| Dato opcional ausente en el JSON | Mostrar "No disponible" |
| JSON no accesible o mal formado | Mensaje de error visible y legible ("No se pudieron cargar los datos"); nunca página en blanco |

## 11. Open Questions
* Ninguna — sección cerrada.

## 12. Assumptions
* Las rutas de las fotos en el JSON coinciden con los archivos de la carpeta `assets/`.
* Los alumnos tienen cuenta de GitHub (necesaria para GitHub Pages y para los enlaces de proyectos).

## 13. Dependencies
* Archivos `data/profile.json` y `data/projects.json` conformes al Data Contract (sección 5).
* Carpeta con recursos visuales `assets/`.
* Cuenta en el hosting estático elegido (recomendado: GitHub Pages).

## Decisiones registradas
* **Tecnología:** la decide el equipo de desarrollo. Recomendación PM: HTML/CSS/JS vanilla (los alumnos deben editar solo JSON + assets/, sin tooling ni build).
* **Servido:** hosting estático con URL pública. Recomendación PM: GitHub Pages (gratuito, los alumnos ya tienen cuenta, URL pública directa para el revisor).
