## Getting Started

### Prerequisitos

**NODEJS**
Primero es necesario tener instalado NodeJS, la aplicación se ha desarrollado con la última versión estable hasta la fecha, la versión 22

**PNPM**
Para instalar las dependencias, utilizamos pnpm debido al mejor rendimiento que ofrece en comparación con npm.
Puedes instalarlo siguiendo las instrucciones en el siguiente enlace. https://pnpm.io/installation

También es posible utilizar npm, pero esto generará un nuevo archivo package-lock.json, en lugar de utilizar el que se genera con pnpm.

**Docker**
Para tener una base de datos se utiliza Docker, además el proyecto tiene un Dockerfile para poder desplegar la aplicación

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
- NEXT_PUBLIC_API_URL=http://localhost:3000/api
- WEATHER_API_BASE_URL=https://api.weatherapi.com/v1/
- WEATHER_APIKEY=

Es importante mencionar que se utiliza el servicio de https://www.weatherapi.com.
Para obtener datos del clima de eventos futuros y las posibles ubicaciones, es necesario registrarse y generar una clave de API.
Puedes utilizar el plan gratuito sin problemas.

### Crear base de datos

Para crear las tablas, dado que se utiliza el ORM Drizzle, ejecuta el siguiente comando:

```bash
npx drizzle-kit push
```

En caso de que necesites actualizar las tablas, simplemente vuelve a ejecutar el comando.

### Ejecucion local

Para ejecutar el proyecto de forma local y poder desarrollar, utiliza el siguiente comando:

```bash
pnpm dev
```

Si solo deseas probar la aplicación, puedes utilizar Docker Compose con el siguiente comando (también es necesario crear las tablas):

```bash
docker-compose up --build
```

## Ejecución de pruebas

### e2e

Para las pruebas e2e se utiliza Playwright https://playwright.dev, antes de poder ejecutarlas la aplicación debe estar iniciada o desplegada.
Utilizan la variable de ambiente NEXT_PUBLIC_HOST para saber donde se encuentra la aplicación.
Para ejecutarlas se debe utilizar el siguiente comando:

```bash
pnpm e2e
```

También es posible ejecutarlas en modo UI agregando --ui al final del comando, este modo es más amigable para saber como se están ejecutando

### Unitarias e Integración

Estas pruebas están construidas con Jest y React Testing Library.
Las de Integración están orientadas a probar varios componentes utilizando los stores de Mobx reales, aunque se hace Mock de servicios que se consumen
Las pruebas unitarias son enfocadas en un solo componente, pero también solo se realizan de los componentes principales y por lo tanto más complejos, además se realizan pruebas de algunso use-cases y de librerias

Para ejecutar estas pruebas se debe utilizar el siguiente comando:

```bash
pnpm test
```

## Estructura proyecto

El proyecto tiene la siguiente estructura

1. **\__tests_\_**:

- Contiene tres subdirectorios: e2e, integration, y unit.
- Estos subdirectorios se utilizan para organizar diferentes tipos de pruebas.
  - **e2e**: Pruebas de "end-to-end" para probar los flujos principales mediante Playwright
  - **integration**: Pruebas de integración, donde se verifica cómo interactúan diferentes partes de la aplicación.
  - **unit**: Pruebas unitarias que se enfocan en probar funciones o componentes individuales.

2. **app/**

- Este directorio es el núcleo del proyecto, siguiendo la convención moderna de Next.js 14, donde se organizan las rutas y componentes principales.
- **api/**: Contiene API routes de eventos, ubicaciones y clima. Implementa el patrón Clean Architecture.
  - **adapters/**: Implementaciones de los ports, permiten comunicarse con servicios externos o la base de datos
  - **core/**: Types y clases agnosticas al dominio
  - **domain/**: Contiene la lógica de negocio de la aplicación
    - **entities/**: Principales entidades, se utiliza zop para definirlas, ya que así se puede también utilizar para conversion de objetos y validaciones
    - **ports/**: Interfaces que permiten la comunicación con servicios externos mediante inyección de dependencias
    - **specs/**: Implementación del patrón Specification, sirve para realizar validaciones
    - **use-cases/**: Casos de uso de la aplicación, tienen la lógica de negocio agnostica a implementaciones especificas ya que solo utilizan interfaces
  - **events/**: API rest de eventos
  - **locations/**: API que permite obtener las ubicaciones disponibles para luego consultar el clima
  - **weather/**: API que permite consultar por pronoticos del clima
- **components/**: Componentes de la UI con React.
- **hooks/**: Contiene custom hooks de React.
- **libs/**: Aquí puedes encontrar utilidades o bibliotecas internas que se usan en varias partes del proyecto.
- **services/**: Funciones que permiten consumir servicios externos mediante rest
- **store/**: Estado global de la aplicación, se utiliza Mobx con dos stores, uno para eventos y otro para el calendario en si
- **types/**: Almacena tipos TypeScript usados en la aplicación.
