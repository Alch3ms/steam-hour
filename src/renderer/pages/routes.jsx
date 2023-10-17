import { Routes, Route} from 'react-router-dom';

import Menu from '../components/menu';
import Version from '../components/version';

import Login from "./Login";
import Library from "./Library";
import Boosting from './boosting';

function routes() {
    return (
        <>
            <Menu/>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/library" element={<Library />} />
                <Route path="/boosting" element={<Boosting />} />
            </Routes>
            <Version/>
        </>
    )
}

export default routes;