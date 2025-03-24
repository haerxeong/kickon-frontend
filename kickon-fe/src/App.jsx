import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import Home from "./pages/Home/home";
import Community from "./pages/Community/community.jsx";
import News from "./pages/News/news.jsx";

function App() {
    return (
        <Router>
            <RootLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/news" element={<News />} />
                </Routes>
            </RootLayout>
        </Router>
    )
}

export default App;