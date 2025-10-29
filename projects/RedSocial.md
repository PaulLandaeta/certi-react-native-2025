# 1er Parcial
## UPB red social Planes & Polls 🍕 (decidir planes con encuestas y listas)
Organiza planes express (salteñas, cine, juegos) con polls y RSVP. Todo rápido, divertido y utilitario.

### Requerimientos (obligatorios)
Navegación con Expo Router
Tabs: Inicio, Planes, MisVotaciones (placeholder), Perfil (placeholder).
Stack en Planes: PlanesList → PlanDetail.

### Zustand
store 
ui: theme (light/dark), tabIndex, alias
plans: palnes creados 
### Estilos
Design tokens (espaciados, tipografías, colores).
Tema light/dark (al menos colores de fondo/textos).

Búsqueda básica (por titulo o lugar) y filtro por categoria (en memoria).


## Objetivo del 2do Parcial
### Autenticación (Firebase Auth)
- Registro e inicio de sesión con email + password.
- Login con Google
- Flujo de sesión completo: splash/loading → (si token válido) Home, si no → Auth screens.
- Recuperar contraseña por email

### Planes (CRUD + estados)

- Crear plan: título, categoría (Comida, Cine, Juegos, Estudio, Otro), lugar, fecha/hora, nota, cover opcional.
- Estado del plan: draft | open | closed | canceled.
- Borrar/editar: sólo creador mientras open (o admin).
- Cierre automático al llegar deadline del poll.
### Polls dentro del plan

- Opciones del poll (p. ej., “Ir 12:30”, “Ir 13:00”, “Pedido 20 salteñas”).
- Voto por usuario: single-choice o multi-choice (marcar tipo).
- Cambiar voto permitido mientras open.
- Criterios de cierre: por deadline o por quorum (ej. 8 votos) (configurable).
- Tiebreak (desempate): “más antiguo primero” o “creador decide” (selector).
### Detalle del plan

-   Cover, título, categoría, lugar (link a Maps), fecha (relativa y exacta).
-   Poll con opciones y % de votos en vivo.
-   Sección RSVP y Comentarios (con contador).
-   Acciones: Votar, Cambiar voto, RSVP, Comentar, Compartir (deep link opcional).

### Moderación y reportes

-   Creador puede cerrar/cancelar su plan, eliminar comentarios ofensivos.
-   Usuarios pueden reportar plan/comentario; admin puede ocultar/borrar.
-   Filtro de palabras (cliente) antes de publicar comentario (soft).

# Proyecto Final — Integraciones (Mapas, Animaciones, Notificaciones Push)

## 3.1 Mapas (expo-location + react-native-maps)

Permitir al creador asignar una ubicación (lat/lng) al crear el plan.
En PlanDetail, mostrar un mini mapa con marcador del lugar.
Pantalla MapaGeneral:
Mostrar todos los planes open en un mapa con marcadores.
Filtros rápidos por categoría y estado.
Acciones: tap en marcador → abre PlanDetail.
opción “Cómo llegar” → abrir en app nativa de mapas.

## Animaciones (react-native-reanimated / Animated API)

Animación de entrada de tarjetas (planes) en PlanesList.
Feedback animado al votar o cambiar voto.
Transición suave al abrir PlanDetail (fade/slide).
Reacción visual en botón de RSVP o comentario agregado.
animación de transición entre estados del plan (open → closed).

