docker hands-on experiences



## `docker compose up --build`

`docker compose up --build` is quite a common command to dockerize app, what's behind the scenes?

you could setup a postgres database in docker and then set up a nest.js server on your local machine to connect with it
+ note in this case, when you are trying to connect your backend with database, the host:port that identifies database process should be declared relative to the backend on backend side. e.g. if you are running database inside a docker container on your machine, and you map the port 5432 (inside docker) to 5500 (outside docker on your local machine), the address that identifies the database is localhost:5500


When you run a command like `docker compose up --build`, Docker Compose reads your `docker-compose.yml` file and does the following:

1. **Builds Images**: For any service in the `docker-compose.yml` file that specifies a build context using the `build` directive, Docker Compose builds a Docker image for that service according to the instructions in the specified Dockerfile. The `--build` option explicitly tells Docker Compose to build (or rebuild) images before starting the containers.

2. **Pulls Images**: If a service specifies an image that is not built from a Dockerfile (using the `image` directive) and that image is not already present on your system, Docker Compose pulls the image from the specified registry (like Docker Hub).

3. **Creates and Starts Containers**: Docker Compose then creates and starts containers for each service defined in the `docker-compose.yml` file. This includes setting up networks, volumes, and any specified environment variables according to your configurations.

Regarding what is "in" the Docker container depends on how you've defined each service in your `docker-compose.yml` file. You can have multiple services, each with its own role, such as a database, a backend application (like a NestJS app), a frontend application, etc. Each service will run in its own container, isolated from the others but able to communicate through network configurations defined in Docker Compose.



### :gem: ​Example Scenario

Suppose you have a `docker-compose.yml` file with two services defined: one for a PostgreSQL database and another for a NestJS backend.

```yaml
version: '3.8'
services:
  db:
    image: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
  backend:
    build: ./backend
    environment:
      DB_HOST: db
      DB_PORT: 5432
    depends_on:
      - db
    ports:
      - "3000:3000"
```

- **Database Container**: When you run `docker compose up --build`, Docker Compose pulls the PostgreSQL image (if it's not already present) and starts a container for the `db` service. This container runs the PostgreSQL database server, configured with the environment variables you've specified.

- **NestJS Backend Container**: For the `backend` service, Docker Compose looks in the `./backend` directory for a Dockerfile and builds an image for your NestJS app. Once the image is built, it starts a container from that image, running your NestJS backend application. This container has access to the `db` container through Docker's internal networking, using the hostname `db` to connect to the database.

  
In summary, with `docker compose up --build`, you're instructing Docker Compose to set up and run all the services defined in your `docker-compose.yml` file, each in its own container. The actual contents and applications running inside each container depend on the configurations (image or build context, environment variables, etc.) you've specified for each service.