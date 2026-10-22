---
title: Qué problema resuelve un plugin local
summary: Límites entre el núcleo de Moodle, los plugins y los datos del campus.
course: componentes-moodle
module: Contexto
kind: guia
order: 1
duration: 15 min
---

Un plugin `local` sirve para una necesidad de esa instalación: un informe, una sincronización o una pantalla que el núcleo no trae. No es el lugar para cambiar el comportamiento interno de Moodle ni para guardar lógica que otro campus no podría separar.

Antes de crear el directorio, escribe tres decisiones:

1. Qué dato es la fuente de verdad. Si la calificación vive en Moodle, el otro sistema la consulta. Si vive fuera, Moodle la recibe.
2. Quién administra el componente. Un plugin sin responsable se queda en una versión que el siguiente upgrade no contempla.
3. Qué pasa si se desinstala. Las tablas y las tareas programadas tienen que poder retirarse sin dejar páginas rotas.

Moodle exige cadena de idioma en inglés aunque la interfaz del campus esté en español. El archivo `lang/en/local_example.php` no es opcional. Las cadenas en `lang/es` se suman después.

Instala y prueba siempre en una copia del campus. Un `version.php` mal definido puede bloquear la página de notificaciones de un entorno real.
