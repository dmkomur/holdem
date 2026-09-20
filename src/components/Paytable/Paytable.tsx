import React from "react";
import { PAYOUT_TABLE, POKER_HANDS } from "../../types/poker";
import { useGameStore } from "../../store/useGameStore";
import "./Paytable.css";

// Beregner gevinst og viser utbetalingstabellen med vinnerkombinasjoner, innsats og potensiell utbetaling.

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
                {POKER_HANDS.map((handName) => {
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
