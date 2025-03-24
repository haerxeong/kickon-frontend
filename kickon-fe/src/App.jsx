import { createBrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import Home from "./pages/Home/home";
import Community from "./pages/Community/community.jsx";
import News from "./pages/News/news.jsx";
import NotFound from "./pages/not-found";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/community",
                element: <Community />,
            },
            {
                path: "/news",
                element: <News />,
            },
        ],
    },
]);

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RootLayout />}>
                    <Route index element={<Home />} />
                    <Route path="community" element={<Community />} />
                    <Route path="news" element={<News />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App;