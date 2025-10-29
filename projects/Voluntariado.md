# 1er Parcial (Fundamentos de UI, rutas y estado)
## Requerimientos (obligatorios)
Navegación con Expo Router (basado en React Navigation)

Tabs: Inicio, Oportunidades, MisPostulaciones (placeholder), Perfil (placeholder).
Stack en Oportunidades: OportunidadesList → OportunidadDetail.

### Listado principal (FlatList) de oportunidades de voluntariado
### Zustand
store: ui 
theme light/ dark, tabIndex
store: voluntariado
user: informacion del usuario


## Objetivo del 2do Parcial
### Autenticación (Firebase Auth)
- Registro e inicio de sesión con email + password.
- Login con Google
- Flujo de sesión completo: splash/loading → (si token válido) Home, si no → Auth screens.
- Recuperar contraseña por email
### Datos reales (Firestore + Storage)

-   Colecciones principales:
    -   oportunidades (publicadas por admin/organizador).
    -   users/{uid} perfil de estudiante/organizador.
    -   postulaciones (tabla/colección plana) o subcolección por oportunidad (elige 1).
    -   organizaciones (opcional).
    -   Imágenes (logo/cover) en Storage.
### Oportunidades (lista y detalle)
- FlatList con:
    - Filtro por campus, categoría (social, ambiental, educativo, cultural…), modalidad (presencial/remoto), disponibilidad horaria (fin de semana, entre semana), habilidades (chips).

    - Búsqueda por texto (título/organización) — server con titleLower + cliente.

-   Detalle:

    -   Cover, organización, campus/ciudad, modalidad, horas requeridas/semana, deadline, cupos, descripción completa, habilidades.
    -   Acciones: Postularme, Guardar (favorito), Compartir, Abrir en mapa (si hay ubicación).
    -   Estado dinámico: open | waitlist | closed | finished.

-   Postulaciones

-   Formulario de postulación:
-   Campos: motivación (texto), disponibilidad (opciones), teléfono opcional.
-   Al enviar ⇒ crea registro en postulaciones con estado submitted.
-   Flujo de estados (admin/organizador):

        -   submitted → under_review → accepted | rejected | waitlisted.

        -   Al accepted: estudiante recibe notificación y puede Confirmar participación.

-   MisPostulaciones:
-   Lista de mis postulaciones con estado y CTA según fase.

Chat con organizador (podria ser una IA con el context de la oportunidad)

-   threads/{threadId} (combinación oportunidadId + organizerUid + studentUid).
-   Subcolección messages con snapshot en tiempo real.
### Moderación y roles

-   users.role: student | organizer | admin.
-   Sólo organizer/admin crean/actualizan oportunidades; estudiante no edita.
-   status de oportunidad administrado por organizer/admin.
-   Reportes (opcional): reports para contenido inapropiado.

## Proyecto Final — Integraciones Avanzadas (Maps, Auth extendida, Admin, Push, Animations)

## Mapas y geolocalización

- MapaGeneral con marcadores de oportunidades (lat/lng en documento) y filtros (campus/categoría/modalidad/disponibilidad).
- Permisos de ubicación, centrado en la posición del usuario y orden por distancia.
- En OportunidadDetail: mapa embebido y botón “Cómo llegar” (deeplink a Google/Apple Maps).
- Trazar ruta in‑app con polyline y mostrar distancia/tiempo estimados.

## Autenticación extendida

- Register con validación y creación de perfil en users/{uid} (rol por defecto student).
- Forgot Password operativo con feedback claro.
- Splash que restaura sesión y redirige al Home si válida.

## Roles y Panel de Administración

- Campo role en perfil (student | organizer | admin).
- Pantalla Admin (visible solo para roles permitidos):
- Crear/editar oportunidades (organizer/admin).
- Aprobar/cambiar estado (open/waitlist/closed/finished).
- Gestionar postulaciones: cambiar estado con trazabilidad mínima (quién/cuándo y razón opcional).

## Notificaciones Push (expo‑notifications)

- Registro y almacenamiento de pushToken por usuario; opt‑out desde Perfil.
- Disparadores mínimos (al menos 3):
- Cambio de estado de la postulación (accepted/rejected/waitlisted) → al estudiante.
- Nueva oportunidad publicada en el campus/categoría del estudiante.
- Recordatorio de deadline de postulación o de inicio de actividad.
- Manejar casos: sin permisos, usuario sin token, evitar duplicados.

## Animaciones (microinteracciones y transiciones)

- Aparición de tarjetas en listas (Oportunidades/MisPostulaciones) con variaciones sutiles.
- Feedback animado al guardar una oportunidad y al enviar una postulación.
- Transición suave al abrir OportunidadDetail.
- Mapa: aparición de marcadores y realce del seleccionado.