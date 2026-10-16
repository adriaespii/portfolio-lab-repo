# Portfolio Web

Web personal tipo portfolio para prácticas en Arema Software. Muestra la foto, la información de contacto y los proyectos del alumno, cargados dinámicamente desde archivos JSON.

**URL pública:** https://adriaespii.github.io/portfolio-lab-repo/

## ¿Qué es?

Una página web estática (HTML + CSS + JavaScript, sin frameworks ni build) que:

- Muestra el perfil del alumno (foto, nombre, rol, bio, ubicación y contacto) desde `data/profile.json`.
- Lista todos los proyectos desde `data/projects.json`, con imagen, descripción, tecnologías y enlace a GitHub (se abre en pestaña nueva).
- Es responsive: usable y legible desde 360px de ancho hasta desktop, sin scroll horizontal.
- Está desplegada en GitHub Pages con URL pública.

## Cómo personalizar tu portfolio (solo JSON + assets/)

No necesitas tocar HTML, CSS ni JavaScript. Solo edita los archivos de datos y las imágenes:

### 1. Edita tus datos personales

Abre `data/profile.json` y cambia los valores por los tuyos:

```json
{
  "nombre": "Tu Nombre Apellido",
  "rol": "Estudiante de DAW",
  "bio": "Una breve presentación sobre ti.",
  "foto": "assets/foto-perfil.svg",
  "email": "tu.email@example.com",
  "ubicacion": "Tu ciudad, País",
  "linkedin": "https://www.linkedin.com/in/tu-usuario",
  "github": "https://github.com/tu-usuario"
}
```

- `nombre`, `rol`, `bio`, `foto` y `email` son **obligatorios**.
- `ubicacion`, `linkedin` y `github` son **opcionales**: si los dejas vacíos o los quitas, la web mostrará "No disponible".

### 2. Edita tus proyectos

Abre `data/projects.json` y añade, quita o modifica proyectos. Es un array: un objeto por proyecto.

```json
[
  {
    "titulo": "Mi proyecto",
    "descripcion": "Qué hace el proyecto y qué aprendiste.",
    "tecnologias": ["HTML", "CSS", "JavaScript"],
    "github": "https://github.com/tu-usuario/mi-proyecto",
    "imagen": "assets/mi-proyecto.png"
  }
]
```

- `titulo`, `descripcion`, `tecnologias` (mínimo 1) y `github` son **obligatorios**.
- `imagen` es **opcional**: si falta o el archivo no carga, se muestra un placeholder genérico automáticamente.

### 3. Sustituye las imágenes

Mete tus imágenes en la carpeta `assets/` y referencia la ruta en los JSON:

- `assets/foto-perfil.svg` → tu foto de perfil (cuadrada, se recorta en círculo).
- `assets/proyecto-*.svg` → capturas de tus proyectos (proporción 16:9 recomendada).

Puedes usar `.svg`, `.png`, `.jpg` o `.webp`. Asegúrate de que la ruta en el JSON coincide exactamente con el nombre del archivo.

### 4. Publica los cambios

Haz commit y push a la rama `main`. GitHub Pages actualiza la web automáticamente en unos segundos/minutos.

```bash
git add data/ assets/
git commit -m "Personalizo mi portfolio"
git push
```

## Estructura del repositorio

```
portfolio-lab-repo/
├── index.html          ← estructura (no editar)
├── css/styles.css      ← estilos (no editar)
├── js/main.js          ← carga dinámica (no editar)
├── data/
│   ├── profile.json    ← ✏️ tus datos personales
│   └── projects.json   ← ✏️ tus proyectos
├── assets/             ← ✏️ tus imágenes
└── docs/               ← SPEC del proyecto
```

## Despliegue

Desplegado con **GitHub Pages** desde la rama `main`, carpeta raíz (`/`). La URL pública es:

👉 **https://adriaespii.github.io/portfolio-lab-repo/**
