# YelpCamp

Full-stack application, where users can share and review campground locations built with the [MERN stack](https://www.mongodb.com/mern-stack).

<div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:1rem;">

![home](./project-images/home-page.png)

![main](./project-images/campgrounds-page.png)

![show](./project-images/show-page.png)

</div>

## Technologies Used

<div style="display:flex; gap: 1rem;">

<div>

### Frontend

| Technology                                            | Purpose                   |
| ----------------------------------------------------- | ------------------------- |
| [React](https://reactjs.org/)                         | Frontend framework        |
| [React Router](https://reactrouter.com/)              | Routing                   |
| [React Query](https://react-query.tanstack.com/)      | Data fetching and caching |
| [React-Bootstrap](https://react-bootstrap.github.io/) | UI components and styling |
| [Mapbox](https://www.mapbox.com/)                     | Map API                   |
| [Vite](https://vitejs.dev/)                           | Frontend build tool       |

</div>

<div>

### [Backend](https://github.com/tariqs26/yelpcamp-server)

| Technology                          | Purpose           |
| ----------------------------------- | ----------------- |
| [Express](http://expressjs.com/)    | Web framework     |
| [MongoDB](https://mongodb.com/)     | Database          |
| [Mongoose](https://mongoosejs.com/) | ODM               |
| [Passport](http://passportjs.org/)  | Authentication    |
| [Swagger](https://swagger.io/)      | API documentation |

</div>

</div>

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

| Script            | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| `npm run dev`     | Run the app in the development mode (<http://localhost:3001>) |
| `npm run lint`    | Lint the app                                                  |
| `npm run format`  | Format the app                                                |
| `npm run build`   | Build the app for production                                  |
| `npm run preview` | Preview the production build                                  |
