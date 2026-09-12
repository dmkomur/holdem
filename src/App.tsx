import { Card } from "./components/Card/Card";
import { Paytable } from "./components/Paytable/Paytable";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";

export function App() {
    return (
        <div style={{ padding: "1rem", textAlign: "center" }}>
            <h1 style={{ fontSize: "1.2rem" }}>SPACE TEXAS</h1>
            <div
                style={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "2rem",
                    maxWidth: "1200px",
                    margin: "2rem auto 0",
                }}
            >
                <Paytable />
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "2rem",
                    width: "100%",
                    maxWidth: "600px",
                    margin: "2rem auto 0",
                }}
            >
                <Card
                    card={{ id: "1", suit: "hearts", rank: "A", value: 14 }}
                />
                <Card
                    card={{ id: "2", suit: "spades", rank: "K", value: 13 }}
                    isHeld={true}
                />
                <Card
                    card={{ id: "3", suit: "diamonds", rank: "10", value: 10 }}
                />
                <Card
                    card={{ id: "4", suit: "clubs", rank: "J", value: 11 }}
                    isHeld={true}
                />
                <Card isFaceDown />
            </div>
            <div
                style={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "2rem",
                    maxWidth: "1200px",
                    margin: "2rem auto 0",
                }}
            >
                <ControlPanel />
            </div>
        </div>
    );
}

export default App;
