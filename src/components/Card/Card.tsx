import React from "react";
import type { PlayingCard, Suit } from "../../types/poker";
import "./Card.css";

interface CardProps {
    card?: PlayingCard;
    isFaceDown?: boolean;
    isHeld?: boolean;
    onClick?: () => void;
}

const getSuitSymbol = (suit: Suit): string => {
    switch (suit) {
        case "hearts":
            return "♥";
        case "diamonds":
            return "♦";
        case "clubs":
            return "♣";
        case "spades":
            return "♠";
    }
};

// Komponent som viser et enkelt kort og håndterer logikken for kortet.

export const Card: React.FC<CardProps> = ({
    card,
    isFaceDown = false,
    isHeld = false,
    onClick,
}) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (onClick && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            onClick();
        }
    };

    if (isFaceDown || !card) {
        return (
            <div
                className="card card--face-down"
                onClick={onClick}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={onClick ? 0 : -1}
                aria-label="Face down card"
            >
                <div className="card__back-emblem">ST</div>
            </div>
        );
    }

    const isRed = card.suit === "hearts" || card.suit === "diamonds";
    const suitSymbol = getSuitSymbol(card.suit);

    const cardClasses = [
        "card",
        isRed ? "card--red" : "card--black",
        isHeld ? "card--held" : "",
    ].join(" ");

    return (
        <div
            className={cardClasses}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={onClick ? 0 : -1}
            aria-label={`${card.rank} of ${card.suit}${isHeld ? " held" : ""}`}
        >
            <div className="card__top">
                <span>{card.rank}</span>
                <span>{suitSymbol}</span>
            </div>

            <div className="card__center">
                <span>{suitSymbol}</span>
            </div>

            <div className="card__bottom">
                <span>{card.rank}</span>
                <span>{suitSymbol}</span>
            </div>
        </div>
    );
};
