CREATE TABLE "ARTISTS" (
	"artistID" integer NOT NULL,
	"artistName" varchar NOT NULL,
	CONSTRAINT ARTISTS_pk PRIMARY KEY ("artistID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "SONGS" (
	"songID" serial NOT NULL,
	"songName" serial NOT NULL,
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
	"albumID" serial NOT NULL,
	"albumName" varchar NOT NULL,
	"albumImage" varchar NOT NULL,
	"publishedYear" integer NOT NULL,
	"artist_ID" integer NOT NULL,
	CONSTRAINT ALBUMS_pk PRIMARY KEY ("albumID")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "SONGS" ADD CONSTRAINT "SONGS_fk0" FOREIGN KEY ("album_ID") REFERENCES "ALBUMS"("albumID");

ALTER TABLE "ALBUMS" ADD CONSTRAINT "ALBUMS_fk0" FOREIGN KEY ("artist_ID") REFERENCES "ARTISTS"("artistID");
