---
title: Checklist del contrato de integración
summary: Lista corta para revisar autenticación, idempotencia, errores y reversa antes de implementar.
course: integraciones-lms
module: Laboratorio
kind: laboratorio
order: 2
duration: 20 min
---

Completa esta lista en un documento compartido con el equipo que va a construir o recibir la integración. No hace falta código para cerrarla.

1. Nombre del dato, sistema dueño y sistema que solo lo lee.
2. Cómo se autentica cada lado. Dónde vive el secreto y quién lo rota. No lo pegues en el documento.
3. Qué identifica de forma única un registro para que repetir el envío no duplique el efecto.
4. Qué error ve la persona operadora y qué identificador queda en el registro técnico.
5. Cómo se detiene una sincronización a medias y cómo se vuelve a intentar solo lo pendiente.
6. Qué ambiente se usa para la prueba y qué datos de personas reales quedan fuera.

Si alguna respuesta es «después», el conector todavía no está listo para un campus con usuarios.
