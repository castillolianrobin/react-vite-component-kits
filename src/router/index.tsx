import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from '../App';
import componentRoutes from "@/modules/_components/_components.routes";
import LayoutDashboardComponent from "@/layout/LayoutDashboardComponent";
import HomePage from "@/pages/public/HomePage";
import sampleRoutes from "@/modules/Sample/sample.routes";
import LayoutDefault from "@/layout/LayoutDefault";

const routes:RouteObject[] = [
  {
    path: '/',
    element: <App />,
    loader() {
      console.log('asd')
      return null;
    },
    children: [
      {
        path: '/_component',
        element: <LayoutDashboardComponent />,
        children: [ ...componentRoutes ],
      },
      {
        path: '/_sample',
        element: <LayoutDefault />,
        children: [ ...sampleRoutes ],
      },    
      {
        path: '/',
        element: <HomePage />,
      },
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
