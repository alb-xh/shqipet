import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Path } from './app/constants';
import { Root, PrivacyPolicy, Login } from './app/routes';
import { ErrorPage, ComingSoonPage } from './app/pages';

import App from "./app/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: Path.Root,
        element: <App />,
      },
      {
        path: Path.PrivacyPolicy,
        element: <PrivacyPolicy />,
      },
      {
        path: Path.Login,
        element: <Login />,
      }
    ]
  },
  {
    path: Path.Games,
    element: <ComingSoonPage />,
  },
  {
    path: Path.Chat,
    element: <ComingSoonPage />,
  },
]);

root.render(
  <RouterProvider router={router} />
);
