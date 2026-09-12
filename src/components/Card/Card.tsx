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

export const Card: React.FC<CardProps> = ({
    card,
    isFaceDown = false,
    isHeld = false,
    onClick,
}) => {
    if (isFaceDown || !card) {
        return (
            <div
                className="card card--face-down"
                onClick={onClick}
                role="button"
                tabIndex={0}
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
            role="button"
            tabIndex={0}
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
