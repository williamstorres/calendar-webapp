This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Primero para poder instalar las dependencias se está utilizando pnpm debido al performance que ofrece a diferencia de npm, se debe instalar siguiendo las instrucciones del siguiente link

También es posible utilizar npm, pero eso va a generar un nuevo package-lock.json y no utilizar el de pnpm

### Instalación de dependencies

1.- PNPM: Se debe ejecutar el siguiente comando

```bash
pnpm install
```

2.- NPM: Se debe ejecutar el siguiente comando

```bash
npm install
```

```bash
pnpm dev
```

## Inicar base de datos local para pruebas

Para no tener que instalar postgress se puede utilizar el siguiente comando docker:

```bash
docker run --name my-postgres -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=calendarapp -p 5432:5432 -d postgres
```

### Crear base de datos

Para crear las tablas, debido a que se utiliza el ORM drizzle, se debe ejecutar el siguiente comando:

```bash
npx drizzle-kit push
```

En caso de actualizar las mismas se debe volver a ejecutar
