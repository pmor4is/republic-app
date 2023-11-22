import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from '../view/screens/Home/Home.jsx';

export function AppRoutes() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
        </Router>
    )
}