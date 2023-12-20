<div align="center">
<h1 align="center">
<img src="https://github.com/ManashJBofficial/anc_interview_project/assets/51418862/8be87acb-07e3-4db4-b18e-4c72f8300690" width="100" />
<br>INTERVIEW_PROJECT</h1>
<h3>This API serves as a gateway to various Star Wars resources, including films, people, planets, species, starships, and vehicles.</h3>
<h3>Developed with the software and tools below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/Redis-DC382D.svg?style=flat-square&logo=Redis&logoColor=white" alt="Redis" />
<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat-square&logo=Nodemon&logoColor=white" alt="Nodemon" />
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat-square&logo=Axios&logoColor=white" alt="Axios" />
<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=flat-square&logo=ts-node&logoColor=white" alt="tsnode" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat-square&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Express-000000.svg?style=flat-square&logo=Express&logoColor=white" alt="Express" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat-square&logo=JSON&logoColor=white" alt="JSON" />
</p>
<img src="https://img.shields.io/github/license/ManashJBofficial/anc_interview_project?style=flat-square&color=5D6D7E" alt="GitHub license" />
<img src="https://img.shields.io/github/last-commit/ManashJBofficial/anc_interview_project?style=flat-square&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/commit-activity/m/ManashJBofficial/anc_interview_project?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/languages/top/ManashJBofficial/anc_interview_project?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

---

## 📖 Table of Contents
- [📖 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [📦 Features](#-features)
- [📂 repository Structure](#-repository-structure)
- [⚙️ Modules](#modules)
- [🚀 Getting Started](#-getting-started)
    - [🔧 Installation](#-installation)
    - [🤖 Running anc_interview_project](#-running-anc_interview_project)
    - [🧪 Tests](#-tests)
- [🛣 Api Endpoints](#-api-endpoints)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)

---


## 📍 Overview

This API serves as a gateway to the Star Wars API (SWAPI), providing cached responses for improved performance. It offers endpoints for films, people, planets, species, starships, and vehicles.

---

## 📦 Features

- Caching with Redis to improve response times
- Rate limiting to prevent abuse
- Express.js backend with TypeScript


## 📂 Repository Structure

```sh
└── anc_interview_project/
    ├── package.json
    ├── src/
    │   ├── controllers/
    │   │   ├── films/
    │   │   ├── people/
    │   │   └── starships/
    │   ├── middlewares/
    │   │   ├── cacheMiddleware.ts
    │   │   ├── errorMiddleware.ts
    │   │   └── redisClient.ts
    │   ├── routes/
    │   │   ├── flims/
    │   │   ├── people/
    │   │   └── starships/
    │   ├── server.ts
    │   └── utils/
    │       └── index.ts
    └── tsconfig.json

```

---
## 🛣 API Endpoints

 :house: Base URL: https://swapi.manash.dev

### 👤 People

- GET all people: https://swapi.manash.dev/api/people
- GET person by ID: https://swapi.manash.dev/api/people/1  
- GET people by page: https://swapi.manash.dev/api/people/?page=3
- SEARCH people: https://swapi.manash.dev/api/people/?search=Luke  
- SORT & ORDER people: https://swapi.manash.dev/api/people/?sortBy=mass&sortOrder=desc

### 🎥 Films 

- GET all films: https://swapi.manash.dev/api/films
- GET film by ID: https://swapi.manash.dev/api/films/1
- GET films by page: https://swapi.manash.dev/api/films/?page=3 
- SEARCH films: https://swapi.manash.dev/api/films/?search=hope
- SORT & ORDER films: https://swapi.manash.dev/api/films/?sortBy=episode_id&sortOrder=asc

### 🚀 Starships

- GET all starships: https://swapi.manash.dev/api/starships
- GET starship by ID: https://swapi.manash.dev/api/starships/9
- GET starships by page: https://swapi.manash.dev/api/starships/?page=3
- SEARCH starships: https://swapi.manash.dev/api/starships/?search=Imperial
- SORT & ORDER starships: https://swapi.manash.dev/api/starships/?sortBy=name&sortOrder=desc


---

## ⚙️ Modules

<details closed><summary>Root</summary>

| File                                                                                               | Summary       |
| ---                                                                                                | ---           |
| [tsconfig.json](https://github.com/ManashJBofficial/anc_interview_project/blob/main/tsconfig.json) | ► Typescript Configuration File |
| [package.json](https://github.com/ManashJBofficial/anc_interview_project/blob/main/package.json)   | ► Npm Package Manager File |

</details>

<details closed><summary>Src</summary>

| File                                                                                           | Summary       |
| ---                                                                                            | ---           |
| [server.ts](https://github.com/ManashJBofficial/anc_interview_project/blob/main/src/server.ts) | ► Entrypoint of the API |

</details>

<details closed><summary>Utils</summary>

| File                                                                                               | Summary       |
| ---                                                                                                | ---           |
| [index.ts](https://github.com/ManashJBofficial/anc_interview_project/blob/main/src/utils/index.ts) | ► Main utility function File |

</details>

<details closed><summary>People</summary>

| File                                                                                                                                              | Summary       |
| ---                                                                                                                                               | ---           |
| [peopleRoute.ts](https://github.com/ManashJBofficial/anc_interview_project/blob/main/src/routes/people/peopleRoute.ts)                            | ► People Route API File |
| [getPeopleById.ts](https://github.com/ManashJBofficial/anc_interview_project/blob/main/src/controllers/people/getPeopleById.ts)                   | ► People Controller File to get people data by ID |
| [getAllPeopleController.ts](https://github.com/ManashJBofficial/anc_interview_project/blob/main/src/controllers/people/getAllPeopleController.ts) | ► People Controller File to get all peoples data |

</details>

<details closed><summary>Flims</summary>

| File                                                                                                                | Summary       |
| ---                                                                                                                 | ---           |
| [filmsRoute.ts](https://github.com/ManashJBofficial/anc_interview_project/blob/main/src/routes/flims/filmsRoute.ts) | ► Films Route API File |
| [getFilmsController.ts](https://github.com/ManashJBofficial/anc_interview_project/blob/main/src/controllers/films/getFilmsController.ts) | ► Films Controller File to get all films data |
| [getFilmsById.ts](https://github.com/ManashJBofficial/anc_interview_project/blob/main/src/controllers/films/getFilmsById.ts)             | ► Films Controller File to get films data by ID |

</details>

<details closed><summary>Starships</summary>

| File                                                                                                                                                 | Summary       |
| ---                                                                                                                                                  | ---           |
| [starShipsRoute.ts](https://github.com/ManashJBofficial/anc_interview_project/blob/main/src/routes/starships/starShipsRoute.ts)                      | ► Starships Route API File |
| [getStarshipsController.ts](https://github.com/ManashJBofficial/anc_interview_project/blob/main/src/controllers/starships/getStarshipsController.ts) | ► Starships Controller File to get all starships data  |
| [getStarshipsById.ts](https://github.com/ManashJBofficial/anc_interview_project/blob/main/src/controllers/starships/getStarshipsById.ts)             | ► Starships Controller File to get starships data by ID |

</details>

<details closed><summary>Middlewares</summary>

| File                                                                                                                         | Summary       |
| ---                                                                                                                          | ---           |
| [errorMiddleware.ts](https://github.com/ManashJBofficial/anc_interview_project/blob/main/src/middlewares/errorMiddleware.ts) | ► Error & Not Found Middleware File |
| [cacheMiddleware.ts](https://github.com/ManashJBofficial/anc_interview_project/blob/main/src/middlewares/cacheMiddleware.ts) | ► Redis Cache Middleware File |
| [redisClient.ts](https://github.com/ManashJBofficial/anc_interview_project/blob/main/src/middlewares/redisClient.ts)         | ► Redis Client File |

</details>

</details>

---

## 🚀 Getting Started

### 🔧 Installation

1. Clone the anc_interview_project repository:
```sh
git clone https://github.com/ManashJBofficial/anc_interview_project
```

2. Change to the project directory:
```sh
cd anc_interview_project
```

3. Install the dependencies:
```sh
npm install
```

### 🤖 Running anc_interview_project

```sh
npm run build && node dist/main.js
```
OR
```sh
npm run dev
```

### 🧪 Tests
```sh
npm test
```
---
## 📄 License

This project is protected under the [MIT](https://choosealicense.com/licenses/mit/#) License. For more details, refer to the [LICENSE](https://github.com/ManashJBofficial/anc_interview_project/blob/main/LICENSE) file.

---

[**Return**](#Top)

---
