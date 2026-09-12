import React from "react";
import { PAYOUT_TABLE } from "../../types/poker";
import type { PokerHand } from "../../types/poker";
import { useGameStore } from "../../store/useGameStore";
import "./Paytable.css";

const HANDS_ORDER: PokerHand[] = [
    "Royal Flush",
    "Straight Flush",
    "Four of a Kind",
    "Full House",
    "Flush",
    "Straight",
    "Three of a Kind",
    "Two Pair",
    "Jacks or Better",
];

export const Paytable: React.FC = () => {
    const bet = useGameStore((state) => state.bet);
    const evaluation = useGameStore((state) => state.evaluation);

    return (
        <div
            className="paytable-container"
            role="region"
            aria-label="Payout Table"
        >
            <div className="paytable-header">
                <span>HAND</span>
                <span>PAYOUT (BET {bet})</span>
            </div>

            <div className="paytable-body">
                {HANDS_ORDER.map((handName) => {
                    const baseMultiplier = PAYOUT_TABLE[handName];
                    const currentPayout = baseMultiplier * bet;
                    const isWinningRow = evaluation?.hand === handName;

                    return (
                        <div
                            key={handName}
                            className={`paytable-row ${isWinningRow ? "winning-row" : ""}`}
                        >
                            <span className="hand-name">{handName}</span>
                            <span className="payout-value">
                                {currentPayout}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
