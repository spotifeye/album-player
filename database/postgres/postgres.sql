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
	"songID" bigserial NOT NULL,
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



