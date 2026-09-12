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
    id: string; // Уникальный ID карты (например, "hearts-A" или "spades-10")
    suit: Suit; // Масть карты ('hearts' | 'diamonds' | 'clubs' | 'spades')
    rank: Rank; // Достоинство карты ('2' .. 'A')
    value: number; // Числовое значение для вычисления комбинаций (от 2 до 14, где A = 14)
}

export type PokerHand =
    | "Jacks or Better" // Пара Валетов, Дам, Королей или Тузов (минимальный выигрыш)
    | "Two Pair" // Две разные пары (например, 8-8 и Q-Q)
    | "Three of a Kind" // Тройка / Сет (три карты одного достоинства)
    | "Straight" // Стрит (5 карт подряд разных мастей)
    | "Flush" // Флеш (5 карт одной масти)
    | "Full House" // Фулл-Хаус (Тройка + Пара)
    | "Four of a Kind" // Каре (4 карты одного достоинства)
    | "Straight Flush" // Стрит-Флеш (5 карт подряд одной масти)
    | "Royal Flush"; // Роял-Флеш (10, J, Q, K, A одной масти)

export const PAYOUT_TABLE: Record<PokerHand, number> = {
    "Jacks or Better": 1, // x1 (возврат ставки при ставке 1)
    "Two Pair": 2, // x2
    "Three of a Kind": 3, // x3
    Straight: 4, // x4
    Flush: 6, // x6
    "Full House": 9, // x9
    "Four of a Kind": 25, // x25
    "Straight Flush": 50, // x50
    "Royal Flush": 250, // x250 (главный джекпот!)
};

export interface Player {
    name: string;
    coins: number;
}

export type GameStage = "idle" | "dealt" | "evaluated";
