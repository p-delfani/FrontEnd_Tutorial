import { RouterProvider } from "react-router";
import router from "./routes";
import { ScrollRestoration } from "react-router";
import AuthProvider from "./context/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router}>
        <ScrollRestoration />
      </RouterProvider>
    </AuthProvider>
  );
};

export default App;
