export function App() {
    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>SPACE TEXAS</h1>
            <p
                style={{
                    margin: "1.5rem 0",
                    color: "var(--neon-cyan)",
                    fontSize: "0.8rem",
                }}
            >
                RETRO VIDEO POKER
            </p>

            <div
                className="pixel-border"
                style={{ maxWidth: "420px", margin: "0 auto 2rem" }}
            >
                <p style={{ color: "var(--text-main)", fontSize: "0.7rem" }}>
                    SYSTEM: READY
                </p>
                <p
                    style={{
                        marginTop: "0.8rem",
                        color: "var(--neon-gold)",
                        fontSize: "0.8rem",
                    }}
                >
                    COINS: 100
                </p>
            </div>

            <button className="pixel-button">DEAL HAND</button>
        </div>
    );
}

export default App;
