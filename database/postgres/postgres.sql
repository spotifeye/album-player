
CREATE TABLE IF NOT EXISTS "ARTISTS" (
	"artistID" serial NOT NULL,
	"artistName" varchar NOT NULL,
	CONSTRAINT ARTISTS_pk PRIMARY KEY ("artistID")
) WITH (
  OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS "ALBUMS" (
	"albumID" serial NOT NULL,
	"albumName" varchar NOT NULL,
	"albumImage" varchar NOT NULL,
	"publishedYear" integer NOT NULL,
	"artist_id" integer NOT NULL,
	CONSTRAINT ALBUMS_pk PRIMARY KEY ("albumID")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS "SONGS" (
	"songID" bigint NOT NULL,
	"songName" varchar NOT NULL,
	"streams" integer NOT NULL,
	"length" integer NOT NULL,
	"popularity" integer NOT NULL,
	"addedToLibrary" BOOLEAN NOT NULL,
	"album_id" serial NOT NULL,
	CONSTRAINT SONGS_pk PRIMARY KEY ("songID")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "SONGS" ADD CONSTRAINT "SONGS_fk0" FOREIGN KEY ("album_id") REFERENCES "ALBUMS"("albumID");

ALTER TABLE "ALBUMS" ADD CONSTRAINT "ALBUMS_fk0" FOREIGN KEY ("artist_id") REFERENCES "ARTISTS"("artistID");


CREATE INDEX artist_id ON "ALBUMS" (artist_id);
CREATE INDEX album_id ON "SONGS" (album_id);