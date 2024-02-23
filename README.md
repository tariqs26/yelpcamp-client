# YelpCamp

Full-stack application, where users can create, edit, delete and view and review campgrounds locations built with the [MERN](https://www.mongodb.com/mern-stack) stack.

![home](./project-images/home-page.png)

![main](./project-images/campgrounds-page.png)

![show](./project-images/show-page.png)

## Technologies Used

### Frontend

| Technology                                            | Purpose                           |
| ----------------------------------------------------- | --------------------------------- |
| [React](https://reactjs.org/)                         | Frontend framework                |
| [React Router](https://reactrouter.com/)              | Routing                           |
| [React Query](https://react-query.tanstack.com/)      | Data fetching and caching         |
| [React-Bootstrap](https://react-bootstrap.github.io/) | UI components and styling         |
| [TypeScript](https://www.typescriptlang.org/)         | Primary language for the frontend |
| [Mapbox](https://www.mapbox.com/)                     | Map API                           |
| [Vite](https://vitejs.dev/)                           | Frontend build tool               |

### [Backend](https://github.com/tariqs26/yelpcamp-server)

| Technology                                                                     | Purpose                                  |
| ------------------------------------------------------------------------------ | ---------------------------------------- |
| [Express](http://expressjs.com/)                                               | Web framework                            |
| [MongoDB](https://mongodb.com/)                                                | Database                                 |
| [Mongoose](https://mongoosejs.com/)                                            | ODM                                      |
| [Passport](http://passportjs.org/)                                             | Authentication                           |
| [Express-Session](https://npmjs.com/package/express-session)                   | Session management                       |
| [Express-Mongo-Sanitize](https://www.npmjs.com/package/express-mongo-sanitize) | Preventing NoSQL injections              |
| [Express-Rate-Limit](https://www.npmjs.com/package/express-rate-limit)         | Rate limiting                            |
| [Cors](https://npmjs.com/package/cors)                                         | Cross-origin resource sharing middleware |
| [Dotenv](https://npmjs.com/package/dotenv)                                     | Environment variables                    |
| [Helmet](https://helmetjs.github.io/)                                          | Setting security-related HTTP headers    |
| [Swagger](https://swagger.io/)                                                 | API documentation                        |
| [Zod](https://zod.dev/)                                                        | Validation Library                       |

## Setup

### Install dependencies

```bash
npm i
```

### Configure environment variables

```bash
VITE_API_URL=      # Backend API URL
VITE_MAPBOX_TOKEN= # Mapbox API token
```

## Available Scripts

| Script             | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| `npm run dev`      | Run the app in the development mode (<http://localhost:3001>) |
| `npm run lint`     | Lint the app                                                  |
| `npm run lint:fix` | Lint the app and fix issues                                   |
| `npm run format`   | Format the app                                                |
| `npm run build`    | Build the app for production                                  |
| `npm run preview`  | Preview the production build                                  |
