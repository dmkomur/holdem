import React from "react";
import { useGameStore } from "../../store/useGameStore";
import { Card } from "../Card/Card";
import "./Hand.css";

const DUMMY_CARDS = Array.from({ length: 5 });

export const Hand: React.FC = () => {
    const hand = useGameStore((state) => state.hand);
    const status = useGameStore((state) => state.status);
    const toggleHold = useGameStore((state) => state.toggleHold);

    const canHold = status === "dealt";
    const isIdle = status === "idle" || hand.length === 0;

    if (isIdle) {
        return (
            <div className="hand-container">
                {DUMMY_CARDS.map((_, index) => (
                    <Card key={`face-down-${index}`} isFaceDown={true} />
                ))}
            </div>
        );
    }

    return (
        <div className="hand-container">
            {hand.map((cardState, index) => (
                <Card
                    key={cardState.card.id || index}
                    card={cardState.card}
                    isHeld={cardState.held}
                    onClick={() => canHold && toggleHold(index)}
                />
            ))}
        </div>
    );
};
