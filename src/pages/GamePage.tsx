import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";
import { Paytable } from "../components/Paytable/Paytable";
import { Hand } from "../components/Hand/Hand";
import { ControlPanel } from "../components/ControlPanel/ControlPanel";
import "./GamePage.css";

// Spillside som samler og viser alle komponentene for spilleautomaten.

export const GamePage: React.FC = () => {
    const navigate = useNavigate();
    const userName = useGameStore((state) => state.userName);

    useEffect(() => {
        if (!userName.trim()) {
            navigate("/", { replace: true });
        }
    }, [userName, navigate]);

    if (!userName.trim()) return null;

    return (
        <div className="game-page">
            <section className="section-paytable">
                <Paytable />
            </section>

            <section className="section-hand">
                <Hand />
            </section>

            <section className="section-controls">
                <ControlPanel />
            </section>
        </div>
    );
};
