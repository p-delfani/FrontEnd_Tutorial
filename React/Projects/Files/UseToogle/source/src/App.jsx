import { RouterProvider } from "react-router";
import router from "./routes";
import { ScrollRestoration } from "react-router";

const App = () => {
  return (
    <RouterProvider router={router}>
      <ScrollRestoration />
    </RouterProvider>
  );
};

export default App;
