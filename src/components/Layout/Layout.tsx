import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import "./Layout.css";

// Layoutkomponent som sikrer at alle sider vises under den felles Header-komponenten.

export const Layout: React.FC = () => {
    return (
        <div className="app-layout">
            <Header />
            <main className="app-content">
                <Outlet />
            </main>
        </div>
    );
};
