import React from "react";
import "./Header.css";

export const Header: React.FC = () => {
    return (
        <header className="app-header">
            <a href="/" className="brand-logo" aria-label="Go to lobby">
                <h1 className="brand-title">'.♦ SPACE TEXAS ♦.'</h1>
            </a>
        </header>
    );
};
