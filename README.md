# Descripción

## Instalación

## DEV environment

1. Clonar el repo.
2. Crear una copia de `.env.template` y renombrelo a `.env` y cambiar las variables de entorno.
3. Instalar las dependencias `npm install`.
4. Levantar la base de datos `docker compose up -d`.
5. Correr migraciones de Prisma `npx prisma migrate dev`
6. Ejecutar seed `npm run seed`
7. Correr el proyecto `npm run dev`.

## PROD environment
