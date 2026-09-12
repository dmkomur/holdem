import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";
import "./LobbyPage.css";

export const LobbyPage: React.FC = () => {
    const navigate = useNavigate();
    const userName = useGameStore((state) => state.userName);
    const balance = useGameStore((state) => state.balance);

    const canPlay = Boolean(userName?.trim()) && balance >= 1;

    return (
        <div className="lobby-card">
            <section className="player-status-card">
                {userName ? (
                    <div className="player-details">
                        <div className="player-info-row">
                            <span className="label">Player:</span>
                            <span className="value name">{userName}</span>
                        </div>
                        <div className="player-info-row">
                            <span className="label">Credits:</span>
                            <span className="value balance">${balance}</span>
                        </div>
                        {balance < 1 && (
                            <p className="status-alert">
                                You have run out of credits! Create a new player
                                to get $100.
                            </p>
                        )}
                    </div>
                ) : (
                    <p className="status-alert">
                        Create a new player to get $100.
                    </p>
                )}
            </section>

            <section className="rules-card">
                <h3 className="rules-title">Brief Rules</h3>
                <ul className="rules-list">
                    <li>
                        <strong>Goal:</strong> Build a hand of at least a pair
                        of Jacks (or better).
                    </li>
                    <li>
                        <strong>Deal:</strong> Click <strong>DEAL</strong>
                        to receive 5 cards.
                    </li>
                    <li>
                        <strong>Draw:</strong> Select cards to hold (
                        <strong>HOLD</strong>) and click <strong>DRAW</strong>.
                    </li>
                    <li>
                        <strong>Payout:</strong> The payout table is multiplied
                        by the size of your bet (1–5).
                    </li>
                </ul>
            </section>

            <footer className="lobby-actions">
                <button
                    type="button"
                    className="btn btn-primary btn-play"
                    onClick={() => navigate("/game")}
                    disabled={!canPlay}
                >
                    PLAY
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/player")}
                >
                    Create New Player{" "}
                </button>
            </footer>
        </div>
    );
};
