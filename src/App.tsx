import React from 'react';
import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom';
import './main.scss';
import Top from './components/top/top';
import NewText from './components/sections/new';
import Texts from './components/sections/texts';
import Single from './components/sections/single';
import Queue from './components/sections/queue';
import useWriteStates from 'state';

export default function App() {

    const { states, setStates } = useWriteStates();

    return (
        <Router>
            <Top />
            <Routes>
                <Route path="/" element={<NewText />} />
                <Route path="/texts/:name" element={<Single texts={states["texts"]} />} />
                <Route path="/texts/" element={<Texts texts={states["texts"]} />} />
                <Route path="/queue/" element={<Queue writes={states["writes"]} deletes={states["deletes"]} />} />
            </Routes>
        </Router>
    );
}
