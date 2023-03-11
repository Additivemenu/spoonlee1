CREATE TABLE "tutorial" (
                        "id" BIGSERIAL PRIMARY KEY,
                        "name" VARCHAR(255) NOT NULL,
                        "description" VARCHAR(255) NOT NULL,
                        "published" BOOLEAN NOT NULL
);