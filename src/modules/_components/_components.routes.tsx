import { RouteObject } from "react-router-dom";
import { lazyLoadRoute } from "@/router/RouteLazy";

const componentRoutes: ComponentRoutes[] = [
  {
    label: 'Home',
    path: 'home',
    element: lazyLoadRoute(() => import(`./pages/HomePage`)),
  },
  {
    label: 'Cards',
    path: 'cards',
    element: lazyLoadRoute(() => import(`./pages/CardPage`)),
  },
  {
    label: 'Buttons',
    path: 'buttons',
    element: lazyLoadRoute(() => import(`./pages/ButtonPage`)),
  },
  {
    label: 'Dropdowns',
    path: 'dropdowns',
    element: lazyLoadRoute(() => import(`./pages/DropdownPage`)),
  },
  {
    label: 'Tooltips',
    path: 'tooltips',
    element: lazyLoadRoute(() => import(`./pages/TooltipPage`)),
  },
  {
    label: 'Tabs',
    path: 'tabs',
    element: lazyLoadRoute(() => import(`./pages/TabsPage`)),
  },
  {
    label: 'Stepper',
    path: 'steps',
    element: lazyLoadRoute(() => import(`./pages/StepsPage`)),
  },
  {
    label: 'Modals',
    path: 'modal',
    element: lazyLoadRoute(() => import(`./pages/ModalPage`)),
  },
  {
    label: 'Paginations',
    path: 'form/pagination',
    element: lazyLoadRoute(() => import(`./pages/PaginationPage`)),
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
  {
    label: 'Form Select',
    path: 'form/select',
    element: lazyLoadRoute(() => import(`./pages/SelectPage`)),
  },
  {
    label: 'Form Checbox & Radio',
    path: 'form/checkbox-radio',
    element: lazyLoadRoute(() => import(`./pages/FormRadioPage`)),
  },
  {
    label: 'Form File Upload',
    path: 'form/file-upload',
    element: lazyLoadRoute(() => import(`./pages/FormFilePage`)),
  },
  
];

export default componentRoutes;


/** __TYPE DEFINITIONS__ */

export type ComponentRoutes = RouteObject & {
  label?: string;
};