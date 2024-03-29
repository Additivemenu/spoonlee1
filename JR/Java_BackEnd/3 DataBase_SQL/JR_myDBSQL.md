18期 2023-02-07 SQL


17期的SQL笔记写在 fullStack > Database里了

# Intro 0-41min




# 安装数据库 41min-1h08min

+ Postgres docker version
+ pgadmin client

docker有点像virtual machine

```yml
version: '3.7'

services:

  postgres:
    image: postgres:14.2-alpine
    volumes:
      - postgresql_data:/var/lib/postgresql/test/data/
    restart: always
    ports:
      - 15432:5432      
    environment:
      - POSTGRES_DB=weather
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=admin
    networks:
      - persist

  pgadmin:
    image: dpage/pgadmin4
    volumes:
      - pgadmin-data:/var/lib/test/pgadmin
    restart: always
    ports:
      - 18002:80
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@test.com
      PGADMIN_DEFAULT_PASSWORD: admin
    networks:
      - persist

  graphql-engine:
    image: hasura/graphql-engine:v2.9.0
    ports:
      - "18080:8080"
    depends_on:
      - "postgres"
    restart: always
    environment:
      ## postgres database to store Hasura metadata
      HASURA_GRAPHQL_METADATA_DATABASE_URL: postgres://postgres:admin@postgres:5432/weather
      ## this env var can be used to add the above postgres database to Hasura as a data source. this can be removed/updated based on your needs
      PG_DATABASE_URL: postgres://postgres:admin@postgres:5432/weather
      ## enable the console served by server
      HASURA_GRAPHQL_ENABLE_CONSOLE: "true" # set to "false" to disable console
      ## enable debugging mode. It is recommended to disable this in production
      HASURA_GRAPHQL_DEV_MODE: "true"
      HASURA_GRAPHQL_ENABLED_LOG_TYPES: startup, http-log, webhook-log, websocket-log, query-log
      ## uncomment next line to set an admin secret
      # HASURA_GRAPHQL_ADMIN_SECRET: myadminsecretkey
    networks:
      - persist

volumes:
  postgresql_data: {}
  pgadmin-data: {}
networks:
  persist: {}

```

# 数据定义语言 1h08min-