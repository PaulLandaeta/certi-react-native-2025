## 1er Parcial (MVP: feed, envío, moderación local)

### Requerimientos (obligatorios)

#### Navegación (React Navigation / Expo Router):

**Tabs:** Feed, Nueva, Perfil (placeholder).

**Stack en Feed:** FeedList → ConfesionDetail.

**Modal Admin:** pantalla “Moderación” accesible desde Perfil (toggle “Modo admin”).

#### Enviar Confesión (anonimato)

**Formulario:** texto (min 10, max 500), categoría (Amor/Académico/Random), imagen opcional (Image).

Al enviar, la confesión entra a “Pendientes” (no aparece en el feed hasta aprobar).

#### Moderación (admin)

**Pantalla “Pendientes”** (FlatList) con acciones Aprobar / Rechazar.

Al Aprobar, pasa al Feed; al Rechazar, se elimina.

**Feed** (aprobadas)

**FlatList con tarjetas**: texto truncado (3 líneas), categoría, fecha relativa (“hace 2 h”), contador de likes (en memoria).

**Tap** → ConfesionDetail muestra el contenido completo.

#### Zustand

**confesionesStore**: pendientes[], aprobadas[], addPendiente, approve(id), reject(id), toggleLike(id).

**uiStore**: isAdmin, theme.

#### Estilos

Tokens básicos: colores, tipografías, spacing; tema light/dark simple.

Validaciones & UX

Deshabilitar “Enviar” si no cumple mínimo de texto.

Placeholder para imagen si no hay.

### Entregables

Pantallas: FeedList, ConfesionDetail, NuevaConfesion, Perfil, Moderacion.

Datos mock (semillas) en /src/data/seed.ts para pruebas.

## Objetivo del 2do Parcial
### Autenticación (Firebase Auth)
- Registro e inicio de sesión con email + password.
- Login con Google
- Flujo de sesión completo: splash/loading → (si token válido) Home, si no → Auth screens.
- Recuperar contraseña por email

### Persistencia en Firestore + Storage

- Colección confesiones con estados: pending, approved, rejected.
- Subcolección likes por confesión y usuario para evitar duplicados.
- Imágenes en Firebase Storage (miniatura + original).
- Seed: importar 30–50 confesiones (sin imagen) vía script o JSON (una vez).

### Flujo de moderación real (admin)

- Pantalla Pendientes (consulta a confesiones where status=="pending").
- Aprobar ⇒ status="approved", approvedAt, approvedBy.
- Rechazar ⇒ status="rejected", rejectedAt, reason (opcional).
- Audit log (bonus +5%): subcolección moderationLogs por confesión. (console.logs).

### Feed (aprobadas) con calidad producción

- Infinite Scroll (paginación por createdAt desc) (FlatList u otro).
- Orden: recientes / tendencia (bonus +5%: ranking por likesCount y decaimiento temporal).
- Tarjeta: texto truncado (3 líneas), categoría, fecha relativa, likes por usuario (persistente).
- Detalle: contenido completo, imagen (si hay), contador y botón like activo si el usuario ya dio like.
###  Enviar Confesión

- Validaciones (min 10, max 500 caracteres).
- Categoría (Amor/Académico/Random/Carrera/Facultad).
- Imagen opcional: picker + subida a Storage. (Agregar la opcion de agregado de imagen si o si ya en la confesion subir la imagen es opcional)
- Al enviar ⇒ crea doc status="pending". Muestra toast “En revi-sión”.
### Moderación asistida AI (bonus)

- Filtro de palabras cliente previo al envío (lista local configurable).
- Toxicity check simple con heurísticas (cliente) + etiqueta needsReview: true.
- se puede usar el Backend generado en clases. 


# Proyecto Final 
Agregamos: Maps, Rutas, Register/Forgot password, Push Notifications, y Animaciones con Animated.

## 3.1 Maps (react-native-maps) y geolocalización

Pantalla Mapas en pestañas o accesible desde Perfil.
Mostrar mapa centrado en ubicación del usuario (expo-location) con marcadores (p. ej., puntos de interés del campus o lugares de encuentro).
## Autenticación extendida (Register / Forgot Password)

Register: nombre opcional; guardar doc users/{uid} con email, displayName, createdAt, pushToken?.
Forgot password: sendPasswordResetEmail(email) y toast de confirmación.
Google: usar AuthSession + GoogleAuthProvider.credential(id_token).

## Push Notifications (Expo Notifications)

Solicitar permisos; obtener expoPushToken y persistir en users/{uid}.pushToken.
En moderación: al aprobar tu propia confesión (o si el profe quiere, notificar al autor), enviar push.
Flujo básico:
registerForPush() ⇒ token.
Guardar token del usuario autenticado.
Servidor o Cloud Function o dentro de la app que llame a https://exp.host/--/api/v2/push/send.

Ejemplos de triggers: aprobación, rechazo (con motivo), likes a tu confesión (puntos extras).

## Animaciones (Animated)

Cards del Feed: entrada con Animated.spring (scale/translateY).
Like button: Animated.sequence([scale up, scale down]) al presionar.
Transiciones de Modal Moderación: opacidad/slide.
Rutas: al trazar, animar la opacidad del polyline y un pin “saltando”. (Puntos extras).

