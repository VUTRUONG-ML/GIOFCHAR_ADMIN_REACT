import { RouterProvider } from "react-router";
import "./App.css";
import { router } from "./routes/appRoute";
function App() {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
