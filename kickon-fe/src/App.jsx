import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import RootLayout from "./layout/root-layout";
import Home from "./pages/Home/home";
import Community from "./pages/Community/community.jsx";
import News from "./pages/News/news.jsx";
import NotFound from "./pages/not-found";
import LoginModal from "./components/LoginModal/loginModal.jsx";
import Signup from "./pages/Signup/signup.jsx";
import ProfileSettings from "./pages/ProfileSettings/profileSettings.jsx";
import PostEditor from "./components/PostEditer/postEditor.jsx";
import NewsDetail from "./components/PostDetail/postDetail.jsx";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route index element={<Home />} />
                        <Route path="community" element={<Community />} />
                        <Route path="news" element={<News />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="profile" element={<ProfileSettings />} />
                        <Route path="news/write" element={<PostEditor type="news" />} />
                        <Route path="community/write" element={<PostEditor type="community" />} />
                        <Route path="news/detail" element={<NewsDetail type="news" />} />
                        <Route path="community/detail" element={<NewsDetail type="community" />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <LoginModal />
            </Router>
        </Provider>
    );
}

export default App;