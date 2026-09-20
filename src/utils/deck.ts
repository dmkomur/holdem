import type { PlayingCard, Rank, Suit } from "../types/poker";

const SUITS: Suit[] = ["hearts", "diamonds", "clubs", "spades"];

const RANKS: { rank: Rank; value: number }[] = [
    { rank: "2", value: 2 },
    { rank: "3", value: 3 },
    { rank: "4", value: 4 },
    { rank: "5", value: 5 },
    { rank: "6", value: 6 },
    { rank: "7", value: 7 },
    { rank: "8", value: 8 },
    { rank: "9", value: 9 },
    { rank: "10", value: 10 },
    { rank: "J", value: 11 },
    { rank: "Q", value: 12 },
    { rank: "K", value: 13 },
    { rank: "A", value: 14 },
];

// Oppretter en ny, komplett kortstokk med 52 spillkort.
export const createDeck = (): PlayingCard[] => {
    const deck: PlayingCard[] = [];

    for (const suit of SUITS) {
        for (const { rank, value } of RANKS) {
            deck.push({
                id: `${rank}-${suit}`,
                suit,
                rank,
                value,
            });
        }
    }

    return deck;
};

// Stokker kortstokken ved hjelp av Fisher-Yates-algoritmen.
export const shuffleDeck = (deck: PlayingCard[]): PlayingCard[] => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};
