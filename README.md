# YelpCamp

Full-stack application, where users can share and review campground locations built with the [MERN stack](https://www.mongodb.com/mern-stack).

![home](./project-images/home-page.png)

<details>

<summary>More Screenshots</summary>

![main](./project-images/campgrounds-page.png)

![show](./project-images/show-page.png)

</details>

## Technologies Used

**Frontend:** [React.js](https://reactjs.org/), [React Router](https://reactrouter.com/), [React Query](https://react-query.tanstack.com/), [React-Bootstrap](https://react-bootstrap.github.io/), [Mapbox](https://www.mapbox.com/), [Vite](https://vitejs.dev/)

**[Backend](https://github.com/tariqs26/yelpcamp-server):** [Node.js](https://nodejs.org/), [Express.js](http://expressjs.com/), [Mongoose](https://mongoosejs.com/), [Passport](http://passportjs.org/), [MongoDB](https://mongodb.com/), [Swagger](https://swagger.io/)

## Setup

### Clone the repository

```bash
git clone https://github.com/tariqs26/yelpcamp-client.git
cd yelpcamp-client
```

### Install dependencies

```bash
npm i
```

### Configure environment variables

Create a `.env` file in the root directory and add the following environment variables:

```bash
VITE_API_URL=      # Backend API URL
VITE_MAPBOX_TOKEN= # Mapbox API token
```

## Available Scripts

| Script            | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| `npm run dev`     | Run the app in the development mode (<http://localhost:3001>) |
| `npm run lint`    | Lint the app                                                  |
| `npm run format`  | Format the app                                                |
| `npm run build`   | Build the app for production                                  |
| `npm run preview` | Preview the production build                                  |
