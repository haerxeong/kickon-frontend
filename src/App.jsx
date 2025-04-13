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
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings.jsx";
import PostEditor from "./components/PostEditer/postEditor.jsx";
import ReportModal from "./components/ReportModal/reportModal.jsx";
import NewsDetailPage from "./pages/News/newsDetail.jsx";
import CommunityDetailPage from "./pages/Community/communityDetail.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LeagueTeamProvider } from "./context/LeagueTeamContext.jsx";

function App() {
    return (
        <Provider store={store}>
            <AuthProvider>
                <LeagueTeamProvider>
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
                                <Route path="news/detail" element={<NewsDetailPage />} />
                                <Route path="community/detail" element={<CommunityDetailPage />} />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                        <LoginModal />
                        <ReportModal />
                    </Router>
                </LeagueTeamProvider>
            </AuthProvider>
        </Provider>
    );
}

export default App;