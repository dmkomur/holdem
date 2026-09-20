import React from "react";
import { useGameStore } from "../../store/useGameStore";
import "./ControlPanel.css";

// Komponent som styrer spillets gang og viser kontrollknappene for spillet.

export const ControlPanel: React.FC = () => {
    const { balance, bet, status, winAmount, setBet, deal, draw, resetGame } =
        useGameStore();

    const handleBetOne = () => {
        const nextBet = bet >= 5 ? 1 : bet + 1;
        setBet(nextBet);
    };

    const handleBetMax = () => {
        setBet(5);
    };

    return (
        <div className="control-panel" role="region" aria-label="Game Controls">
            <div className="status-bar">
                {[
                    ["BALANCE", balance],
                    ["WIN", winAmount],
                    ["BET", bet],
                ].map(([label, value]) => (
                    <div className="status-item highlight" key={label}>
                        <span className="status-label">{label}</span>
                        <span className="status-value">${value}</span>
                    </div>
                ))}
            </div>

            <div className="action-buttons">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleBetOne}
                    disabled={status !== "idle" || balance < 1}
                    aria-label="Increase bet"
                >
                    BET ONE
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleBetMax}
                    disabled={status !== "idle" || balance < 5}
                    aria-label="Set maximum bet"
                >
                    BET MAX
                </button>

                {status === "idle" && (
                    <button
                        type="button"
                        className="btn btn-deal"
                        onClick={deal}
                        disabled={balance < bet}
                        aria-label="Deal new hand"
                    >
                        DEAL
                    </button>
                )}

                {status === "dealt" && (
                    <button
                        type="button"
                        className="btn btn-deal"
                        onClick={draw}
                        aria-label="Draw new cards"
                    >
                        DRAW
                    </button>
                )}

                {status === "evaluated" && (
                    <button
                        type="button"
                        className="btn btn-deal"
                        onClick={resetGame}
                        aria-label="Start next hand"
                    >
                        NEXT HAND
                    </button>
                )}
            </div>
        </div>
    );
};
