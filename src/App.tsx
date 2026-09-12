import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { LobbyPage } from "./pages/LobbyPage";
import { NewPlayerPage } from "./pages/NewPlayerPage";
import { GamePage } from "./pages/GamePage";

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<LobbyPage />} />
                    <Route path="/player" element={<NewPlayerPage />} />
                    <Route path="/game" element={<GamePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
