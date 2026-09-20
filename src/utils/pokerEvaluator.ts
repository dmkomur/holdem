import { PAYOUT_TABLE } from "../types/poker";
import type { HandEvaluation, PlayingCard, PokerHand } from "../types/poker";

// Evaluerer de fem kortene på hånden og bestemmer den beste vinnende pokerhånden.
export const evaluateHand = (cards: PlayingCard[]): HandEvaluation => {
    if (cards.length !== 5) {
        return { hand: "Lose", payoutMultiplier: 0 };
    }

    const sorted = [...cards].sort((a, b) => a.value - b.value);
    const values = sorted.map((c) => c.value);
    const suits = sorted.map((c) => c.suit);

    // Sjekker om alle fem kortene på hånden har samme kortfarge (Flush).
    const isFlush = suits.every((s) => s === suits[0]);

    // Sjekker om kortene på hånden danner en sekvens (Straight).
    const isStraightStandard = values.every(
        (val, idx) => idx === 0 || val === values[idx - 1] + 1,
    );

    // Sjekker om kortene danner en lav Straight med ess som laveste kort (A-2-3-4-5).
    const isAceLowStraight =
        values[0] === 2 &&
        values[1] === 3 &&
        values[2] === 4 &&
        values[3] === 5 &&
        values[4] === 14;
    const isStraight = isStraightStandard || isAceLowStraight;

    // Teller opp forekomster av hver kortverdi på hånden.
    const countsMap = new Map<number, number>();
    values.forEach((v) => countsMap.set(v, (countsMap.get(v) || 0) + 1));
    const counts = Array.from(countsMap.values()).sort((a, b) => b - a);

    //Hjelpefunksjon som setter sammen og returnerer det endelige evalueringsresultatet for pokerhånden.
    const win = (hand: PokerHand): HandEvaluation => ({
        hand,
        payoutMultiplier: PAYOUT_TABLE[hand],
    });

    //Sjekk vinnende kombinasjoner

    if (isFlush && isStraightStandard && values[0] === 10 && values[4] === 14) {
        return win("Royal Flush");
    }

    if (isFlush && isStraight) {
        return win("Straight Flush");
    }

    if (counts[0] === 4) {
        return win("Four of a Kind");
    }

    if (counts[0] === 3 && counts[1] === 2) {
        return win("Full House");
    }

    if (isFlush) {
        return win("Flush");
    }

    if (isStraight) {
        return win("Straight");
    }

    if (counts[0] === 3) {
        return win("Three of a Kind");
    }

    if (counts[0] === 2 && counts[1] === 2) {
        return win("Two Pair");
    }

    if (counts[0] === 2) {
        const pairValue = Array.from(countsMap.entries()).find(
            ([, count]) => count === 2,
        )?.[0];
        if (pairValue && pairValue >= 11) {
            return win("Jacks or Better");
        }
    }

    return { hand: "Lose", payoutMultiplier: 0 };
};
