import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, SignIn, SignUp, AdminDashboard, TravelPackages, Booking, Profile } from './pages';
import { Provider } from 'react-redux';
import store from './store';
const App = () => {
    return (
        <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/travel-packages" element={<TravelPackages />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
        </Router>
        </Provider>
    );
};

export default App;
