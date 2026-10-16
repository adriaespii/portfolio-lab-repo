# SPEC-002 — Revisión de la SPEC v1.0: Portfolio Web para Prácticas

*Revisión realizada por Vita Clearwater (PM) el 2026-10-16. Resultado: SPEC v1.1 aprobada por Adri. Documento relacionado: `docs/SPEC-v1.1-portfolio-web.md` (fuente de verdad).*

## 1. Valoración general

La SPEC v1.0 tenía una estructura completa y buen nivel inicial: scope con *out of scope* explícito, regla de negocio verificable (enlaces en pestaña nueva) y dependencias/supuestos declarados. La revisión detectó 7 hallazgos, todos resueltos en la v1.1.

## 2. Hallazgos (por orden de severidad)

### 2.1 ⚠️ Riesgo bloqueante en R1/R2 — cómo se sirve la web
La SPEC exigía "carga dinámica desde archivos JSON locales", pero los navegadores bloquean `fetch()` a archivos locales cuando la página se abre con doble clic (`file://`). Si el revisor abría el HTML directamente, no se cargaría nada.
**Resolución:** decisión tomada — hosting estático con URL pública (recomendación PM: GitHub Pages). Nuevo requisito R5.

### 2.2 Contrato de datos indefinido
Toda la SPEC giraba alrededor de `profile.json` y `projects.json`, pero no definía sus esquemas: campos, obligatoriedad, formatos. Sin contrato, "se muestra la información personal" no era verificable.
**Resolución:** nueva sección 5 (Data Contract) en la v1.1 con ambos esquemas completos.

### 2.3 R3 y su criterio de aceptación no verificables
"Que se vea bien" / "se adapta correctamente" no se pueden probar. Además, los revisores usan móvil "*principalmente*" → no estaba claro si desktop entraba.
**Resolución:** R3 reescrito con viewports concretos (360px → desktop), sin scroll horizontal, texto legible sin zoom y áreas táctiles cómodas. AC con 360px y 1280px.

### 2.4 Edge cases sin comportamiento esperado
La sección 9 listaba el caso ("que falte una imagen o un dato") pero no decía qué debía pasar. Un edge case sin comportamiento definido no se puede probar ni implementar sin inventar.
**Resolución:** tabla de edge cases con comportamiento esperado: imagen faltante → placeholder genérico; dato opcional ausente → "No disponible"; JSON no accesible → mensaje de error visible, nunca página en blanco.

### 2.5 Requisito implícito de plantilla
La sección Users decía que los alumnos "meterán sus datos", pero ningún requisito garantizaba que pudieran hacerlo sin tocar código.
**Resolución:** nuevo requisito R4 — el alumno personaliza todo el contenido editando únicamente los JSON y `assets/`.

### 2.6 Aclaración menor de scope
"Vías de contacto" (in scope) vs. "envío de correos" (out of scope) podía generar confusión.
**Resolución:** aclarado que contacto = enlaces (`mailto:`, LinkedIn, GitHub), no formulario. Un `mailto:` abre el cliente de correo del usuario; la web no envía nada.

### 2.7 Criterios de aceptación incompletos
Faltaban AC para la regla de pestaña nueva, los edge cases y la personalización por alumnos.
**Resolución:** la v1.1 pasa de 3 a 8 criterios de aceptación verificables.

## 3. Preguntas formuladas y respuestas de Adri

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | ¿Cómo se abrirá la web al revisarla? | Hosting estático |
| 2 | Tecnología (Open Question) | Lo decide el equipo de desarrollo |
| 3 | Vías de contacto | email (mailto:), LinkedIn, GitHub |
| 4 | Campos del perfil | nombre*, rol*, bio*, foto*, email*, ubicación opcional |
| 5 | Campos de proyecto | título*, descripción*, tecnologías*, enlace GitHub*, imagen opcional |
| 6 | Rango de pantallas | Móvil (desde 360px) y desktop |
| 7 | Imagen de proyecto faltante | Placeholder genérico |
| 8 | Dato opcional faltante | Mostrar "No disponible" |

## 4. Recomendaciones PM registradas (no vinculantes)

* **Tecnología:** HTML/CSS/JS vanilla — R4 exige que los alumnos editen solo JSON + `assets/`; un framework añade tooling y build innecesarios para una plantilla de prácticas. La decisión final es del equipo de desarrollo.
* **Hosting:** GitHub Pages — gratuito, los alumnos ya tienen cuenta (los proyectos ya enlazan a GitHub) y genera URL pública directa para el revisor.
* **JSON no accesible:** mensaje de error visible y legible, nunca página en blanco (validado por Adri e incorporado a la v1.1).

## 5. Resultado

SPEC v1.1 aprobada por Adri el 2026-10-16. Es la fuente de verdad del proyecto: cualquier cambio se valida y actualiza ahí ANTES de implementarse.
