import { RouteObject } from "react-router-dom";
import { lazyLoadRoute } from "@/router/RouteLazy";

const sampleRoutes: RouteObject[] = [
  {
    path: 'login',
    element: lazyLoadRoute(() => import(`./pages/LoginPage`)),
  },
];


export default sampleRoutes;