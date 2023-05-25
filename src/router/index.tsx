import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from '../App';
import componentRoutes from "@/modules/_components/_components.routes";
import LayoutDashboardComponent from "@/layout/LayoutDashboardComponent";

const routes:RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/_component',
        element: <LayoutDashboardComponent />,
        children: [ ...componentRoutes ],
      },    
      // {
      //   path: '/',
      //   element: lazyLoadRoute(() => import(`../pages/public/LoginPage`)),
      // },
    ],
  },
];


const router =  createBrowserRouter([
  ...routes,
  {
    loader() {
      console.log('asda');
      return null;
    },
    
  }
]);

export default router;
