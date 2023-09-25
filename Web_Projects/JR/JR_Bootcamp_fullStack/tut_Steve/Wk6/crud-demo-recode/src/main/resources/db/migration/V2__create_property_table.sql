CREATE TABLE "property"(
                           "id" BIGSERIAL PRIMARY KEY,
                           "type" VARCHAR(64),
                           "land_size" INTEGER,
                           "owner_id" BIGINT NOT NULL REFERENCES "user" (id),
                           "created_time" TIMESTAMP WITH TIME ZONE NOT NULL,
                           "updated_time" TIMESTAMP WITH TIME ZONE NOT NULL
);