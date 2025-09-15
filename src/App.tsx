import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import Layout from "./layout/Layout"
import Home from "./pages/home/Home"
import GenPage from "./pages/genPage/GenPage"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/gen/:genId" element={<GenPage />} />
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
