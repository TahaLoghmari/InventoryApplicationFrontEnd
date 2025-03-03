import App from "./App";
import Categories from "./Categories";
import Category from "./Category";
import EditCategory from "./EditCategory";
import CreateCategory from "./CreateCategory";
import DeleteCategory from "./DeleteCategory";

import Games from "./Games";
import Game from "./Game";
import EditGame from "./EditGame";
import CreateGame from "./CreateGame";
import DeleteGame from "./DeleteGame";

import Home from "./Home";
import ErrorPage from "./ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },

      {
        path: "categories",
        element: <Categories />,
        children: [{ path: "delete/:id", element: <DeleteCategory /> }],
      },
      { path: "categories/create", element: <CreateCategory /> },
      { path: "categories/edit/:id", element: <EditCategory /> },
      { path: "categories/:id", element: <Category /> },

      {
        path: "games",
        element: <Games />,
        children: [{ path: "delete/:id", element: <DeleteGame /> }],
      },
      { path: "games/create", element: <CreateGame /> },
      { path: "games/edit/:id", element: <EditGame /> },
      { path: "games/:id", element: <Game /> },
    ],
  },
];

export default routes;
