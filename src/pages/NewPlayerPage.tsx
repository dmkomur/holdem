import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";
import "./NewPlayerPage.css";

export const NewPlayerPage: React.FC = () => {
    const navigate = useNavigate();
    const startNewPlayerSession = useGameStore(
        (state) => state.startNewPlayerSession,
    );
    const currentUser = useGameStore((state) => state.userName);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = (formData.get("userName") as string)?.trim();

        if (!name) return;

        startNewPlayerSession(name);
        navigate("/game");
    };

    return (
        <div className="new-player-card">
            <h2 className="card-title">Player Name</h2>
            <p className="card-subtitle">
                Enter your name and get 100 credits.
            </p>

            <form onSubmit={handleSubmit} className="player-form">
                <div className="form-group">
                    <label htmlFor="user-name" className="form-label">
                        Name{" "}
                    </label>
                    <input
                        id="user-name"
                        name="userName"
                        type="text"
                        className="form-input"
                        defaultValue={currentUser}
                        placeholder="Enter your name..."
                        maxLength={15}
                        autoFocus
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        READY ($100)
                    </button>
                </div>

                <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => navigate("/")}
                >
                    Return to Lobby
                </button>
            </form>
        </div>
    );
};
