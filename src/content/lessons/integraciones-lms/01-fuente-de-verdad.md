---
title: Fuente de verdad y sincronización
summary: Qué sistema manda, qué se repite y qué error ve quien opera la integración.
course: integraciones-lms
module: Contrato
kind: guia
order: 1
duration: 20 min
---

Una integración entre un LMS y otro sistema —certificados, calificaciones o cursos de Classroom— necesita un contrato antes del código.

Define un dueño por cada dato. El nombre de un curso, la nota final o el estado de un certificado no deberían escribirse desde los dos lados. Si los dos pueden cambiarlo, elige cuál gana y cuándo.

La sincronización tiene que poder repetirse. Si el mismo evento llega dos veces, el resultado tiene que ser el mismo: un certificado no se emite dos veces y un curso no se duplica.

Acuerda también el fallo visible. Quien opera el proceso necesita saber si el otro sistema rechazó la petición, si faltó un dato o si la tarea quedó a medias. Un log sin identificador del registro no alcanza para soporte.

Estas decisiones salen del tipo de trabajo ya hecho en emisores de certificados, sincronización de calificaciones y creación de cursos. No sustituyen el diseño de un conector nuevo: lo obligan a quedar escrito.
