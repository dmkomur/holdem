export type Suit = "hearts" | "diamonds" | "clubs" | "spades";

export type Rank =
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "J"
    | "Q"
    | "K"
    | "A";

export interface PlayingCard {
    id: string;
    suit: Suit;
    rank: Rank;
    value: number;
}

export type PokerHand =
    | "Lose"
    | "Jacks or Better"
    | "Two Pair"
    | "Three of a Kind"
    | "Straight"
    | "Flush"
    | "Full House"
    | "Four of a Kind"
    | "Straight Flush"
    | "Royal Flush";

export type GameStatus = "idle" | "dealt" | "evaluated";

export const POKER_HANDS: PokerHand[] = [
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

export const PAYOUT_TABLE: Record<PokerHand, number> = {
    Lose: 0,
    "Jacks or Better": 1,
    "Two Pair": 2,
    "Three of a Kind": 3,
    Straight: 4,
    Flush: 6,
    "Full House": 9,
    "Four of a Kind": 25,
    "Straight Flush": 50,
    "Royal Flush": 250,
};

export interface Player {
    name: string;
    coins: number;
}

export interface HandEvaluation {
    hand: PokerHand;
    payoutMultiplier: number;
}
