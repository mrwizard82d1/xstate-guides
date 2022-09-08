import { A } from '@mobily/ts-belt';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {CssBaseline} from '@mui/material';
import Navbar from './Navbar';
import {routes} from './routes';

function App() {
    return (
        <>
            <CssBaseline/>
            <Router>
                <Navbar />
                <Routes>
                    {A.map(routes, (route) => (
                        <Route key={route.key}
                               path={route.path}
                               element={<route.component />}>
                        </Route>
                    ))}
                </Routes>
            </Router>
        </>
    );
}

export default App;
