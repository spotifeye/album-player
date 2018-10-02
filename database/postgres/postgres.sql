
CREATE TABLE IF NOT EXISTS "ARTISTS" (
	"id" integer NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT ARTISTS_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS "SONGS" (
	"id" bigint NOT NULL,
	"name" varchar NOT NULL,
	"streams" integer NOT NULL,
	"length" integer NOT NULL,
	"popularity" integer NOT NULL,
	"addedtolibrary" BOOLEAN NOT NULL,
	"album_id" serial NOT NULL,
	CONSTRAINT SONGS_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS "ALBUMS" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL,
	"image" varchar NOT NULL,
	"publishedyear" integer NOT NULL,
	"artist_id" integer NOT NULL,
	CONSTRAINT ALBUMS_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "SONGS" ADD CONSTRAINT "SONGS_fk0" FOREIGN KEY ("album_id") REFERENCES "ALBUMS"("id");

ALTER TABLE "ALBUMS" ADD CONSTRAINT "ALBUMS_fk0" FOREIGN KEY ("artist_id") REFERENCES "ARTISTS"("id");


CREATE INDEX artist_id ON "ALBUMS" (artist_id);
CREATE INDEX album_id ON "SONGS" (album_id);