import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import RootLayout from "./layout/root-layout";
import Home from "./pages/Home/home";
import Community from "./pages/Community/community.jsx";
import News from "./pages/News/news.jsx";
import NotFound from "./pages/not-found";
import LoginModal from "./components/LoginModal/loginModal.jsx";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route index element={<Home />} />
                        <Route path="community" element={<Community />} />
                        <Route path="news" element={<News />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <LoginModal />
            </Router>
        </Provider>
    );
}

export default App;