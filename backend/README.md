# Backend - Proyecto Horarios

Este backend está construido con **Node.js**, **Express**, **Prisma** y **SQLite**.

## ⚙️ Configuración

```bash
cd backend
npm install
```

### Configurar la base de datos

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### Ejecutar el servidor

```bash
npm run dev
```

Servidor disponible en `http://localhost:3000`

---

## 🧪 Endpoints principales

| Método | Ruta                     | Descripción                    |
|--------|--------------------------|--------------------------------|
| POST   | `/api/register`          | Registro de usuario            |
| POST   | `/api/login`             | Inicio de sesión               |
| GET    | `/api/horarios`          | Ver horarios disponibles       |
| POST   | `/api/reservas`          | Crear una reserva              |
| GET    | `/api/mis-reservas`      | Ver reservas del usuario       |

Autenticación con JWT (`Bearer token`).

---

## 🛠️ Tecnologías usadas

- Express
- Prisma ORM
- JWT
- SQLite
