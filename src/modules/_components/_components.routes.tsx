import { RouteObject } from "react-router-dom";
import { lazyLoadRoute } from "@/router/RouteLazy";

const componentRoutes: ComponentRoutes[] = [
  {
    label: 'Cards',
    path: 'cards',
    element: lazyLoadRoute(() => import(`./pages/CardPage`)),
  },
  {
    label: 'Button',
    path: 'buttons',
    element: lazyLoadRoute(() => import(`./pages/ButtonPage`)),
  },
  {
    label: 'Dropdown',
    path: 'dropdowns',
    element: lazyLoadRoute(() => import(`./pages/DropdownPage`)),
  },
  {
    label: 'Tooltip',
    path: 'tooltips',
    element: lazyLoadRoute(() => import(`./pages/TooltipPage`)),
  },
  {
    label: 'Form Validation',
    path: 'form/validation',
    element: lazyLoadRoute(() => import(`./pages/FormPage`)),
  },
  {
    label: 'Form Input & Text Area',
    path: 'form/input',
    element: lazyLoadRoute(() => import(`./pages/FormInputPage`)),
  },
];

export default componentRoutes;


/** __TYPE DEFINITIONS__ */

export type ComponentRoutes = RouteObject & {
  label?: string;
};