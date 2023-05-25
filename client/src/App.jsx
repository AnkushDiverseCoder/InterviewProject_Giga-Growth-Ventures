import './App.css'
import {
  createBrowserRouter,
  // redirect,
  RouterProvider,
} from "react-router-dom";
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

function App() {

  const router = createBrowserRouter([
    {
      path: "/signIn",
      element: <SignIn />,
    },
    {
      path: "/",
      element: <Dashboard />,
    }
  ]);


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
