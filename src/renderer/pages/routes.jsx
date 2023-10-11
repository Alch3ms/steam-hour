import { Routes, Route} from 'react-router-dom';

import Login from "./Login";
import Library from "./Library";


function routes() {
    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/library" element={<Library />} />
        </Routes>
    )
}

export default routes;