import './index.scss';
import router from './router/index';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <RouterProvider router={router} />
)
