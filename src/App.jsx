import { RouterProvider } from "react-router"; // Sửa thành react-router-dom cho chuẩn
import "./App.css";
import { router } from "./routes/appRoute";


function App() {

  return <RouterProvider router={router} />;
}

export default App;