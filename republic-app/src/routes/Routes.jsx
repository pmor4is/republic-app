import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from '../view/screens/Home/Home.jsx';
import { Financial } from '../view/screens/Financial/Financial.jsx';
import { Infrastructure } from '../view/screens/Infrastructure/Infrastructure.jsx';
import { Market } from '../view/screens/Market/Market.jsx';
import { Tasks } from '../view/screens/Tasks/Tasks.jsx';
import { Members } from '../view/screens/Members/Members.jsx';


export function AppRoutes() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/financial" element={<Financial />} />
                    <Route path="/infrastructure" element={<Infrastructure />} />
                    <Route path="/market" element={<Market />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/members" element={<Members />} />
                </Routes>
        </Router>
    )
}