import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home/home.jsx"
import RootLayout from "./layout/root-layout.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;