import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from '../App';
import { lazyLoadRoute } from "./RouteLazy";

const routes:RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: lazyLoadRoute(() => import(`../pages/public/LoginPage`)),
      }
    ],
  },
];


const router =  createBrowserRouter([
  ...routes,
]);

export default router;
