# tixcode-challenge

Desafío para TIXCODE. App de direcciones según usuario.

## Instalación

Existen dos maneras de instalar el proyecto. En ambas versiones se debe hacer lo siguiente

En /client crear un archivo .env.development.local, el cual tendrá los siguientes datos

```nodejs
REACT_APP_BASE_URL=http://localhost:8080
REACT_APP_API_KEY=API_KEY
```
API_KEY fue provista en el email de presentación de proyecto

### Usando npm

En /server se debe crear un archivo .env.dev, el cual tendrá los siguientes datos

```nodejs
PORT=8080
JWT_SECRET=JWT_SECRET
MONGO_HOSTNAME=localhost
MONGO_DB=tixcode_db
MONGO_PORT=27017
```
JWT_SECRET es un string aleatorio

Para instalar la app mediante npm, se necesita instalar e instanciar mongoDB (Ver instrucciones [aquí](https://docs.mongodb.com/manual/administration/install-community/)).

Una vez que la base de datos está operativa, en otra consola nos ubicamos en /server y ejecutamos el siguiente comando

```bash
npm run dev
```

Luego, en otra consola, nos posicionamos dentro de /client y ejecutamos el siguiente comando
```bash
npm start
```

Si todo salió bien, deberías poder ver la aplicación corriendo en [localhost](http://localhost:3000/)

### Usando Docker

En /server se debe crear un archivo .env, el cual tendrá los siguientes datos

```nodejs
PORT=8080
JWT_SECRET=JWT_SECRET
MONGO_HOSTNAME=mongo
MONGO_DB=tixcode_db
MONGO_PORT=27017
```
JWT_SECRET es un string aleatorio

Para instalar la app mediante Docker, es necesario tener instalado Docker Desktop (Ver instrucciones [aquí](https://docs.docker.com/desktop/))

Una vez que Docker se encuentra corriendo, abrimos la terminal, nos ubicamos sobre /server y ejecutamos los siguientes comandos

Build de imágenes
```bash
docker-compose build
```

Correr contenedores
```bash
docker-compose up
```

Desde otra terminal, nos ubicamos sobre /client y ejecutamos los siguientes comandos

Build
```bash
docker build -t tixcode-react:v1 .
```

tix-code-react:v1 es opcional, pero nos da mayor facilidad a la hora de ubicar nuestro container

Luego, siguiendo nuestra nomenclatura
```bash
docker run -p 3000:3000 tixcode-react:v1
```
Si todo saló bien, deberías poder ver la aplicación corriendo en [localhost](http://localhost:3000/)