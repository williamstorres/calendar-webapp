## Getting Started

Para instalar las dependencias, utilizamos pnpm debido al mejor rendimiento que ofrece en comparación con npm. Puedes instalarlo siguiendo las instrucciones en el siguiente enlace.

También es posible utilizar npm, pero esto generará un nuevo archivo package-lock.json, en lugar de utilizar el que se genera con pnpm.

### Instalación de dependencies

Ejecuta el siguiente comando para instalar las dependencias:

```bash
pnpm install
```

### Inicar base de datos local para pruebas

Para evitar la instalación de PostgreSQL, puedes utilizar el siguiente comando de Docker:

```bash
docker run --name my-postgres -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=calendarapp -p 5432:5432 -d postgres
```

### Variables de ambiente

El proyecto utiliza las siguientes variables de entorno, las cuales deben definirse en un archivo .env en la raíz del proyecto o en el archivo docker-compose.yaml:

- DATABASE_URL=postgres://user:password@localhost:5432/calendarapp
- ENABLE_MOCK_SERVER=false
- NEXT_PUBLIC_API_URL=http://localhost:3000/api
- WEATHER_API_BASE_URL=https://api.weatherapi.com/v1/
- WEATHER_APIKEY=

Es importante mencionar que se utiliza el servicio de https://www.weatherapi.com. Para obtener datos del clima de eventos futuros y las posibles ubicaciones, es necesario registrarse y generar una clave de API. Puedes utilizar el plan gratuito sin problemas.

### Crear base de datos

PPara crear las tablas, dado que se utiliza el ORM Drizzle, ejecuta el siguiente comando:

```bash
npx drizzle-kit push
```

En caso de que necesites actualizar las tablas, simplemente vuelve a ejecutar el comando.

### Ejecucion local

Para ejecutar el proyecto de forma local y poder desarrollar, utiliza el siguiente comando:

```bash
pnpm dev
```

Si solo deseas probar la aplicación, puedes utilizar Docker Compose con el siguiente comando:

```bash
docker-compose up --build
```

### TODO

- Consulta de datos de clima historicos, ahora solo soporta forecast
- Crear eventos seleccionando cualquier ubicación del calendario
- Test
- Opción de cambiar Timezone, está soportado por la libreria date-fns, pero falta agregar el campo al formulario
- Aniaciones al cambiar de vistas

* Documentar ADR utilizando template de https://adr.github.io/madr/
