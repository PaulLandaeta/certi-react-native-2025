# 1er Parcial (MVP: navegación, listas, detalle, estado)
Guía móvil de La Paz: lugares turísticos, miradores, teleféricos, museos y rutas a pie. Explora por categorías, cercanía, favoritos y rutas con mapa.
## Requerimientos
### Navegación (Expo Router) – Tabs + Stack
### Catálogo (FlatList)
mínimo 25 lugares paceños (mock JSON):
id, nombre, categoria (Mirador, Teleférico, Museo, Mercado, Ruta), zona, breve, coverUri
### Filtros básicos (en memoria):
por categoría y zona.
Búsqueda por texto (nombre).

### Detalle de lugar:
Imagen, descripción extendida, horario (mock), tips de visita.
Botón “⭐ Favorito” (estado en memoria).
### Zustand:
- uiStore: theme (light/dark), tabIndex.
- lugaresStore: lugares[], toggleFavorito(id) (en memoria), filtros.  
### Estilos:
- Tokens (colores, spacing, fuente), tema light/dark.

### app similares
- [Turismo La Paz](https://pin.it/51oytU7eo)
- [La Paz Travel Guide](https://dribbble.com/shots/25128281-Travel-Planner?utm_source=Clipboard_Shot&utm_campaign=Lora_web&utm_content=Travel+Planner&utm_medium=Social_Share&utm_source=Pinterest_Shot&utm_campaign=Lora_web&utm_content=Travel+Planner&utm_medium=Social_Share)


## Objetivo del 2do Parcial
### Autenticación (Firebase Auth)
- Registro e inicio de sesión con email + password.
- Login con Google
- Flujo de sesión completo: splash/loading → (si token válido) Home, si no → Auth screens.
- Recuperar contraseña por email
## Persistencia de datos (Firebase Firestore)
- Guardar favoritos por usuario autenticado.
- Cargar favoritos al iniciar sesión.
- Actualizar favoritos en Firestore al marcar/desmarcar.
- CRUD limitado (rol admin): crear/editar/eliminar lugar desde la app (form simple).
- Imágenes: usar Firebase Storage para coverUri (cargar/actualizar). o algun otro servicio de hosting de imágenes.
- úsqueda y filtros: por categoria, zona, y texto (index simple: usar where y startAt/endAt o filtrar en cliente tras una primera página).
## Mapas y geolocalización
- Mapa (react-native-maps) con markers para cada lugar (lat, lng en Firestore).
- pedir permisos de ubicación, centrar mapa, y listar ordenado por distancia.
- Detalle con mapa embebido: botón “Cómo llegar” que abre Google Maps o traza polyline con la Directions API (bonus +10% si dibujan la ruta in-app).
- Uso de clustering de marcadores.
## Estado & persistencia
- Zustand
- uiStore
    - theme (light/dark)
    - tabIndex
- placesStore
    - lugares[] (cargados desde Firestore)
    - toggleFavorito(id) (actualiza Firestore)
    - filtros
    - searchText
- authStore: user, loading, error.
## Navegación (Expo Router)
Tabs: Explorar, Mapa, Favoritos, Perfil.
Stacks por pestaña (Detalle, Edición admin, etc.).
## Backoffice mínimo in-app (rol admin)
- Sólo para usuarios con role: "admin" en users/{uid}:
- Form para crear/editar lugar (nombre, categoría, zona, breve, descripción, horario, lat, lng, cover).
- Subida de imagen a Storage.

## Proyecto Final — Integraciones Avanzadas (Maps, Auth completa, Admin, Push, Animations)

## Mapas (uso real y rutas)

MapaGeneral con filtros (categoría/zona) y orden por distancia.
Marcadores con clustering; al seleccionar marcador, abrir LugarDetail.
En LugarDetail, mapa embebido y botón “Cómo llegar” (deeplink a Google/Apple Maps).
trazar ruta in‑app (polyline) y mostrar distancia/tiempo estimado.

## Autenticación extendida

- Register completo con validación; creación de perfil en users/{uid}.
- Forgot Password operativo con feedback claro.
- Splash que restaura sesión y redirige a Home si válida.

## Rol de Administrador

- Campo isAdmin en perfil; acceso a pantalla de administración visible solo a admins.
- Moderación/edición de lugares (crear/editar/eliminar) con trazabilidad mínima (quién/cuándo).

## Notificaciones Push (expo‑notifications)

-   Registro y almacenamiento de pushToken por usuario con opción opt‑out en Perfil.
-   Disparadores mínimos (al menos 3):
-   Nuevo lugar aprobado/creado por el admin (notificar a quien lo propuso o a suscriptores de categoría).
-   Actualización relevante en un lugar favoritado (cambio de horario o tips).
-   Recordatorio para visitas planificadas (si el usuario lo agenda) o mensaje informativo del admin.
-   Deben manejar estado sin permisos y evitar duplicados.

## Animaciones (microinteracciones y transiciones)

- Aparición de tarjetas en listas (Explorar/Favoritos).
- Feedback animado al marcar favorito.
- Transición suave al abrir LugarDetail.
- Mapa: aparición de marcadores y realce del marcador seleccionado.

