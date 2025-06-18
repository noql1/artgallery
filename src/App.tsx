import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import ImageDetails from "./pages/ImageDetails.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                 <Route path="/photo/:id" element={<ImageDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
