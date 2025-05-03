import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";

const App = () => {
  const router = createHashRouter([
    { path: "/", element: <Home /> },
    { path: "/pokemon/:id", element: <Detail /> },
    { path: "/favorites", element: <Favorites/>},
    { path: "/compare", element: <Compare/>},
  ]);

  return <RouterProvider router={router} />;
};

export default App;
