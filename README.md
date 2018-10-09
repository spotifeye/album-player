# Spotify Clone

> Spotify as microservices

# Team

| Member                                          | Section           | Repo                                         |
| ----------------------------------------------- | ----------------- | -------------------------------------------- |
| [yontaekc](https://github.com/yontaekc)         | Header            | https://github.com/spotifeye/header          |
| [davydhong](https://github.com/davydhong)       | Albums and Player | https://github.com/spotifeye/album-player    |
| [tecostello](https://github.com/tecostello)     | Popular Songs     | https://github.com/spotifeye/popular-songs   |
| [ChrisALarson](https://github.com/ChrisALarson) | Related Artists   | https://github.com/spotifeye/related-artists |



## Table of Contents

<!-- 1. [Usage](#Usage) -->
<!-- 1. [Requirements](#requirements) -->
1. [Development](#development)

<!-- ## Usage

> In construction -->

<!-- ## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc -->

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

### Running the Program

```sh
  npm run seed
  npm run dev
  npm run test
```

### Making bundle.js

```sh
  npm run 
  npm start
```


## CRUD Operations
### ALL 
- /api/v1/artists/:artistID
  - If no matching artistID found
    - **status: 400** BAD REQUEST
- All Other Undefined Routes
  - **status: 404** NOT FOUND


### GET
- /api/v1/artists/:artistID/albums
  - If previously deleted
    - **status: 404** NOT FOUND
  - If no matching albumID found
    - **status: 400** BAD REQUEST
  - **status: 200** OK 
  - data: [album 1, album2, ... album n] 

/api/v1/artists/:artistID/albums/:albumID
  - If previously deleted
    - **status: 404** NOT FOUND
  - If no matching albumID found
    - **status: 400** BAD REQUEST
  - **status: 200** OK
  - data: [album id=albumID] 


### POST
- /api/v1/artists/:artistID/albums
  - **status: 201** Created
    - creates an album with all the nested info
  - **location**: albums/[newID]
  
- /api/v1/artists/:artistID/albums/:albumID
  - **status: 405** Method Not Allowed

### PUT
- /api/v1/artists/:artistID/albums
  - **status: 405** Method Not Allowed
    - no practical use case to swap out the entire album library of an artist
- /api/v1/artists/:artistID/albums/:albumID
  - If previously deleted
    - **status: 404** NOT FOUND
  - If no matching albumID found
    - **status: 400** BAD REQUEST
  - **status: 200** OK
    - swap out the target album of an artist
      - request data shall provide a full album info



### PATCH
- /api/v1/artists/:artistID/albums
  - **status: 405** Method Not Allowed
    - redundant to PUT /api/v1/artists/:artistID/albums/:albumID
- /api/v1/artists/:artistID/albums/:albumID
  - If previously deleted
    - **status: 404** NOT FOUND
  - If no matching albumID found
    - **status: 400** BAD REQUEST
  - **status: 200** OK


### DELETE
- /api/v1/artists/:artistID/albums
  - **status: 405** Method Not Allowed
    - disallow deleting all albums by accident
- /api/v1/artists/:artistID/albums/:albumID
  - If no matching albumID found
    - **status: 400** BAD REQUEST
  - If previously deleted
    - **status: 404** NOT FOUND
  - **status: 418** I'm a teapot
    - change all the values to null



 