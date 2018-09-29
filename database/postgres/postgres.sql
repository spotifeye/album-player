CREATE TABLE "ARTISTS" (
	"id" integer NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT ARTISTS_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "SONGS" (
	"id" serial NOT NULL,
	"name" serial NOT NULL,
	"streams" integer NOT NULL,
	"length" integer NOT NULL,
	"popularity" integer NOT NULL,
	"addedToLibrary" BOOLEAN NOT NULL,
	"album_ID" integer NOT NULL,
	CONSTRAINT SONGS_pk PRIMARY KEY ("songID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ALBUMS" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL,
	"albumImage" varchar NOT NULL,
	"publishedYear" integer NOT NULL,
	"artist_ID" integer NOT NULL,
	CONSTRAINT ALBUMS_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "SONGS" ADD CONSTRAINT "SONGS_fk0" FOREIGN KEY ("album_ID") REFERENCES "ALBUMS"("id");

ALTER TABLE "ALBUMS" ADD CONSTRAINT "ALBUMS_fk0" FOREIGN KEY ("artist_ID") REFERENCES "ARTISTS"("id");
