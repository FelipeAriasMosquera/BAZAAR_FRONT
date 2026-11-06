Esta es la estructura completa de Bazaar, con lo que ya existe (✅) y lo que falta construir. Las rutas salen de los módulos que ya tiene tu backend: usuarios, categorías, productos, carrito, órdenes, pagos y subastas, y notificaciones, que aún no existe en el backend.

```
public/                              ← logo, imágenes, íconos (fuera de src)
docs/                                ← README de CORS, arquitectura, decisiones
.env.local                           ← NEXT_PUBLIC_API_URL (no se sube a GitHub)
.env.example                         ← el mismo archivo, sin valores secretos (sí se sube)

src/
├── app/                             ← SOLO rutas: cada carpeta es una URL
│   ├── layout.tsx                   ✅ raíz: fuentes y Providers
│   ├── providers.tsx                ✅ TanStack Query + sesión
│   ├── globals.css                  ✅ colores, degradados y fuentes
│   ├── not-found.tsx                ← página 404 con el diseño de Bazaar
│   ├── error.tsx                    ← pantalla de error general
│   ├── _components/                 ← piezas generales de la estructura
│   │   ├── Navbar.tsx               ✅
│   │   ├── Footer.tsx
│   │   └── PanelSidebar.tsx         ← menú lateral de vendedor y admin
│   │
│   ├── (auth)/                      ← encabezado y pie propios (diseño del login)
│   │   ├── layout.tsx               ✅
│   │   ├── login/                   ✅  /login
│   │   ├── registro/                   /registro
│   │   └── recuperar-contrasena/       /recuperar-contrasena
│   │
│   ├── (tienda)/                    ← con la barra superior
│   │   ├── layout.tsx               ✅ Navbar + Footer
│   │   ├── page.tsx                 ✅ inicio (hoy temporal)
│   │   ├── productos/                  /productos        (lista, filtros, paginación)
│   │   │   └── [id]/                   /productos/12     (detalle e imágenes)
│   │   ├── categorias/[id]/            /categorias/3
│   │   ├── subastas/                   /subastas         (lista de subastas activas)
│   │   │   └── [id]/                   /subastas/5       (detalle y pujas)
│   │   ├── ayuda/  privacidad/  terminos/
│   │   │
│   │   └── (privado)/               ← exigen sesión (RequireAuth)
│   │       ├── layout.tsx           ✅
│   │       ├── perfil/              ✅ hoy temporal   /perfil
│   │       ├── direcciones/            /direcciones
│   │       ├── carrito/                /carrito
│   │       ├── checkout/               /checkout         (dirección + pago)
│   │       ├── ordenes/                /ordenes
│   │       │   └── [id]/               /ordenes/8        (detalle y estado del pago)
│   │       ├── mis-pujas/              /mis-pujas
│   │       └── notificaciones/         /notificaciones
│   │
│   └── (panel)/                     ← con menú lateral; exigen un rol
│       ├── layout.tsx               ← PanelSidebar + RequireAuth
│       ├── vendedor/                ← RequireRole "vendedor"
│       │   ├── productos/              /vendedor/productos
│       │   │   ├── nuevo/              /vendedor/productos/nuevo
│       │   │   └── [id]/editar/        /vendedor/productos/12/editar
│       │   ├── subastas/               /vendedor/subastas
│       │   └── ventas/                 /vendedor/ventas
│       └── admin/                   ← RequireRole "admin"
│           ├── page.tsx                /admin            (resumen)
│           ├── productos/              /admin/productos  (ver eliminados y reactivar)
│           ├── categorias/             /admin/categorias
│           ├── ordenes/                /admin/ordenes
│           ├── pagos/                  /admin/pagos      (reembolsos)
│           └── usuarios/               /admin/usuarios
│
├── features/                        ← una carpeta por funcionalidad
│   │   (cada una con: api/ components/ hooks/ schemas/ types/ index.ts)
│   │
│   ├── auth/                        ✅ sesión, token, roles
│   │   ├── api/  components/  context/  hooks/  lib/  schemas/  types/
│   │   └── (LoginForm, LoginPromoPanel, RequireAuth, RequireRole, AuthProvider...)
│   ├── usuarios/                    ← perfil: ver y editar mis datos
│   ├── direcciones/                 ← libreta de direcciones de envío
│   ├── catalogo/                    ← productos y categorías
│   │   └── components/              TarjetaProducto, GaleriaImagenes, FiltroCategorias...
│   ├── carrito/                     ← agregar, quitar, cambiar cantidades
│   ├── ordenes/                     ← listar y ver órdenes, asignar dirección
│   ├── pagos/                       ← pagar, ver estado, reembolsar (admin)
│   ├── checkout/                    ← junta carrito + dirección + pago
│   ├── subastas/                    ← lista, detalle, formulario de puja
│   │   └── hooks/                   usePujasEnVivo (consulta periódica o WebSocket)
│   ├── vendedor/                    ← formularios de producto, panel de ventas
│   ├── notificaciones/              ← campana, lista, marcar como leídas
│   └── admin/                       ← solo el resumen del panel
│
├── shared/                          ← lo que usan todas las funcionalidades
│   ├── api/
│   │   ├── cliente.ts               ✅
│   │   └── errores.ts               ✅
│   ├── components/ui/               ← Button ✅ Card ✅ Input ✅ InputPassword ✅ FormField ✅
│   │                                   + Modal, Badge, Spinner, Pagination,
│   │                                     EmptyState, Toast, Tabs, Select, Textarea
│   ├── hooks/                       ← useDebounce, useMediaQuery...
│   ├── types/                       ← paginacion.ts (la página que devuelve Spring)
│   └── utils/
│       ├── cn.ts                    ✅
│       ├── moneda.ts                ← formato de precios ($1.250.000)
│       └── fechas.ts                ← formato de fechas
│
└── (raíz del proyecto) next.config.ts, package.json, tsconfig.json, README.md


```


<html>
<body>
<!--StartFragment--><h3 dir="ltr" aria-level="4">Qué hay que entender de esta estructura</h3>
<p dir="ltr"><strong>1. Cuatro “zonas” con su propio diseño</strong> (los grupos entre paréntesis no aparecen en la URL):</p>
<div dir="ltr">
Grupo | Diseño | Para quién
-- | -- | --
(auth) | Encabezado y pie del login | Login, registro, recuperar contraseña
(tienda) | Barra superior + pie | Todo el público
(tienda)/(privado) | Igual, pero exige sesión | Carrito, órdenes, perfil...
(panel) | Menú lateral | Vendedor y admin, cada uno con su rol

</div>
<p dir="ltr"><strong>2. Dónde va lo del admin:</strong> las pantallas son rutas en <code dir="ltr">(panel)/admin/</code>, pero cada pieza vive en la funcionalidad que corresponde. Por ejemplo, el botón de reembolso está en <code dir="ltr">features/pagos/</code>, y la página de <code dir="ltr">/admin/pagos</code> solo lo coloca. <code dir="ltr">features/admin/</code> queda solo para el resumen general.</p>
<p dir="ltr"><strong>3. <code dir="ltr">checkout</code> es una funcionalidad aparte</strong> porque junta tres cosas (carrito, dirección y pago). Usa lo que cada una exporta en su <code dir="ltr">index.ts</code>, sin tocar sus archivos internos.</p>
<p dir="ltr"><strong>4. Cada funcionalidad copia al backend:</strong> cada carpeta de <code dir="ltr">features/</code> corresponde a un módulo del backend, así el equipo sabe dónde está cada cosa.</p>
<h3 dir="ltr" aria-level="4">Orden recomendado para construirlo</h3>
<ol dir="ltr">
<li>✅ <strong>Base:</strong> login, sesión, rutas protegidas, componentes propios.</li>
<li><strong>Registro y perfil</strong> (tus compañeros).</li>
<li><strong>Catálogo:</strong> lista de productos, detalle y categorías. Es lo más visible y no necesita sesión.</li>
<li><strong>Carrito.</strong></li>
<li><strong>Direcciones y checkout.</strong></li>
<li><strong>Órdenes y pagos.</strong></li>
<li><strong>Panel del vendedor:</strong> crear y editar productos.</li>
<li><strong>Panel del admin:</strong> reactivar productos, reembolsos.</li>
<li><strong>Subastas</strong> y <strong>notificaciones</strong>, cuando sus backends estén listos.</li>
</ol>
<h3 dir="ltr" aria-level="4">Dos cosas que decidir con el equipo</h3>
<ul dir="ltr">
<li><strong>Si el panel del vendedor y del admin quedan en la misma app</strong> (lo que propongo) o en <code dir="ltr">apps/admin</code>, como estaba en la estructura vieja. Con una sola app es más simple compartir componentes y sesión.</li>
<li><strong>Cómo se van a repartir las funcionalidades</strong> entre ustedes, para que nadie edite la misma carpeta a la vez.</li>
</ul>
<p dir="ltr">Si quieres, el siguiente paso puede ser el <strong>catálogo</strong> (lista de productos con tarjetas, filtros y paginación), que es donde la estructura se pone a prueba por primera vez.</p><!--EndFragment-->
</body>
</html>












# Bazaar Front: guía para asistentes de IA y para el equipo
 
Marketplace de compras y subastas. Este repo es **solo el frontend**. El backend es una API de Spring Boot en otro repo.
Responde y comenta el código en **español**. Los nombres de carpetas y funciones de negocio también van en español, como en el resto del proyecto.
 
## Antes de escribir código
 
1. Lee `README.md` (estructura y reglas) y `docs/` si existe.
2. **Usa `src/features/auth` como modelo.** Es la funcionalidad de referencia: copia su forma (capas, nombres, estilo).
3. Antes de crear algo, **busca si ya existe** en `src/shared/components/ui` o en otra feature. No dupliques.
4. Si la tarea toca varios archivos, **propón un plan corto antes de editar**.
5. **No inventes endpoints ni campos.** Si no sabes cómo responde el backend, pregunta o revisa Swagger (`/swagger-ui` del backend). Marca lo que no esté confirmado con un comentario `// CONFIRMAR con backend`.
## Stack
 
Next.js (App Router) · React · TypeScript · **pnpm** · Tailwind CSS v4 · Axios · TanStack Query · React Hook Form + Zod · jwt-decode · lucide-react.
 
- Gestor de paquetes: **solo pnpm** (`pnpm add`, `pnpm dev`). Nunca npm ni yarn, ni subir `package-lock.json`.
- Antes de usar una API de Next o React que no conozcas bien, **revisa la documentación de la versión instalada** en este proyecto, porque las versiones recientes cambian cosas.
- No instales librerías nuevas sin avisar. Primero mira si lo resuelve lo que ya hay.
## Arquitectura
 
```
src/app/        SOLO rutas (páginas delgadas). Grupos: (auth) · (tienda) · (tienda)/(privado) · (panel)
src/features/   una carpeta por funcionalidad: api/ components/ hooks/ schemas/ types/ index.ts
src/shared/     lo reutilizable: api/ components/ui/ hooks/ types/ utils/
public/         imágenes y logo (fuera de src)
```
 
**Orden de capas:** Página → Componente → Hook → Función de API → `cliente` → Backend.
 
### Reglas obligatorias
 
1. Las páginas de `app/` **solo colocan componentes**. Sin lógica ni llamadas al backend.
2. Un componente **nunca** llama al backend: usa un hook, y el hook usa una función de `api/`.
3. **Todo el tráfico al backend pasa por `shared/api/cliente.ts`.** Prohibido `fetch` o `axios` sueltos.
4. Una función de API por endpoint, sin lógica, tipada con el DTO.
5. Lecturas con `useQuery`; cambios (POST/PUT/PATCH/DELETE) con `useMutation`, y después se invalida la consulta afectada.
6. Una feature **no importa archivos internos de otra**: solo lo que exporta su `index.ts`. Si dos features se juntan (ej. carrito + dirección + pago), va en una feature nueva (`checkout`).
7. `shared/` **nunca importa de `features/`**.
8. Componentes genéricos → `shared/components/ui`. Componentes de una funcionalidad → `features/<x>/components`. Piezas de estructura (Navbar, Footer) → `app/_components`.
9. `"use client"` solo en componentes con estado, efectos o formularios. Las páginas son componentes de servidor siempre que se pueda.
10. Tipos: copian los DTO del backend (el backend manda). Validaciones Zod: copian las del backend, pero no las reemplazan.
11. El token se toca **únicamente** en `features/auth/lib/token-storage.ts`.
12. Rutas privadas van dentro de `(tienda)/(privado)/` (`RequireAuth`); las de vendedor y admin en `(panel)/` con `RequireRole`.
## Estilos y componentes
 
- **Tailwind con los colores de la marca definidos en `src/app/globals.css`** (`bg-primary`, `text-text-secondary`, `border-border`, `bg-lavender-soft`, `bg-gradient-hero`...).
- **Prohibido escribir colores sueltos** (`#7c3aed`, `bg-purple-600`...). Si falta un color, se agrega a `globals.css`.
- Usa los componentes de `shared/components/ui`: `Button`, `Card`, `Input`, `InputPassword`, `FormField`. Si falta uno (Modal, Badge, Pagination...), se crea ahí, con el mismo estilo (props en español, variantes con un objeto).
- `cn()` **no** resuelve conflictos: no pongas dos clases que cambien lo mismo en un mismo elemento (ej. `px-4` y `px-8`).
- Títulos con `font-display`. Íconos solo de `lucide-react`.
- Diseño **responsive** (móvil primero) y **accesible**: `label` asociado a cada campo, `alt` en imágenes, `role="alert"` en errores, botones con texto o `aria-label`.
- Imágenes con `next/image`.
## Contrato con el backend (confirmar en Swagger)
 
- URL base: `NEXT_PUBLIC_API_URL` (en desarrollo `http://localhost:8080`).
- Login: `POST /api/usuarios/login` con `{ email, password }` → `{ token, tipo }`. El token es un JWT con el correo (`sub`) y los roles; se leen con `features/auth/lib/jwt.ts` y se normalizan a minúscula: `admin`, `vendedor`, `comprador` (un usuario puede tener varios).
- Toda petición, salvo login, registro y lecturas del catálogo, lleva `Authorization: Bearer <token>` (lo agrega `cliente.ts`).
- **Sin token el backend responde 403** (no 401). Tratar 401 y 403 como "sin sesión" ya está resuelto en `cliente.ts`; no repetirlo en cada pantalla.
- Listas paginadas de Spring: `{ content: [...], totalElements, totalPages, number, size }`. Parámetros `page`, `size`, `sort`.
- Errores: JSON con un mensaje; `mensajeDeError()` (`shared/api/errores.ts`) lo convierte en texto para el usuario. Reutilizarlo.
- Reglas de negocio que el front debe respetar:
  - Un producto eliminado pasa a estado `eliminado` (borrado lógico); solo el admin lo reactiva.
  - Solo el vendedor (dueño) o el admin editan o eliminan un producto. Solo un usuario con rol vendedor puede crear productos.
  - Una orden se paga solo si está **pendiente** y **tiene dirección de envío**. El monto lo calcula el backend, nunca el front.
  - Un pago puede quedar `rechazado` (respuesta 201, la orden sigue pendiente): se muestra el rechazo y se permite reintentar.
  - Reembolsos: solo admin.
- **Nunca** manejar ni guardar datos de tarjeta en el front.
## Seguridad
 
- Ocultar un botón o una página **no es seguridad**; la seguridad real es del backend. No confiar en el rol del front para proteger datos.
- No guardar datos sensibles en `localStorage` aparte del token. No imprimir tokens en consola.
- Variables de entorno: las del navegador deben empezar con `NEXT_PUBLIC_`. **Nunca** subir `.env.local` ni poner secretos en variables `NEXT_PUBLIC_`.
- No usar `dangerouslySetInnerHTML` con datos que vengan del backend o de usuarios.
- Pendiente a futuro: mover el token a cookies `httpOnly` (solo se cambia `token-storage.ts` y el cliente).
## Cómo hacer una funcionalidad nueva
 
1. `features/<nombre>/` con `api/ components/ hooks/ types/ index.ts` (y `schemas/` si hay formularios).
2. Tipos copiando los DTO del backend.
3. Una función de API por endpoint.
4. Hooks (`useQuery` / `useMutation`).
5. Componentes con los de `shared/components/ui`; manejar los tres estados: **cargando, error y vacío**.
6. Página delgada en `app/`, dentro del grupo de rutas correcto.
7. Probar a mano con el backend levantado.
## Calidad: revisar antes de terminar
 
- [ ] `pnpm lint` y `pnpm build` sin errores.
- [ ] No hay `fetch`/`axios` fuera de `shared/api`, ni colores sueltos, ni `any`.
- [ ] Hay estados de carga, error y lista vacía.
- [ ] Los formularios muestran errores por campo y el error del backend.
- [ ] Se ve bien en móvil y en escritorio.
- [ ] No quedaron `console.log`, código comentado ni archivos sin usar.
- [ ] Si cambió algo de la estructura o de las reglas, se actualizó `README.md` o este archivo.
## No hacer
 
- No mover ni renombrar carpetas de la estructura sin acordarlo con el equipo.
- No crear estilos en archivos `.css` sueltos por componente (usar Tailwind).
- No mezclar lógica de negocio en las páginas ni en componentes de `shared`.
- No resolver un problema de CORS con trucos en el front: se arregla en el backend (`app.cors.allowed-origins`).
- No hacer commits directo a `main`: rama propia y Pull Request.
## Convenciones de código
 
- Componentes en PascalCase (`TarjetaProducto.tsx`), hooks `useAlgo.ts`, funciones y archivos de API en minúscula con punto (`auth.api.ts`), tipos `algo.types.ts`.
- Props, variantes y nombres de negocio en español.
- Funciones pequeñas, con un solo trabajo. Comentarios solo cuando explican el **porqué**.
- TypeScript estricto: sin `any`; usar tipos o `unknown`.

 
