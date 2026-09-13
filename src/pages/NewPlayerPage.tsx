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
            <h2 className="card-title">New Player</h2>
            <p className="card-subtitle">
                {currentUser
                    ? `Current player: "${currentUser}". Creating a new player will reset previous progress and issue $100.`
                    : "Enter a name to start a new game with $100 credits."}
            </p>

            <form onSubmit={handleSubmit} className="player-form">
                <div className="form-group">
                    <label htmlFor="user-name" className="form-label">
                        Player Name
                    </label>
                    <input
                        id="user-name"
                        name="userName"
                        type="text"
                        className="form-input"
                        defaultValue="" /* Всегда пустой инпут для ввода НОВОГО имени */
                        placeholder="Enter name..."
                        maxLength={15}
                        autoFocus
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className=" btn-primary">
                        START WITH $100
                    </button>
                </div>

                <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => navigate("/")}
                >
                    {currentUser
                        ? "Cancel & Return to Lobby"
                        : "Return to Lobby"}
                </button>
            </form>
        </div>
    );
};
