import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlayingCard, HandEvaluation } from "../types/poker";
import { createDeck, shuffleDeck } from "../utils/deck";
import { evaluateHand } from "../utils/pokerEvaluator";

export type GameStatus = "idle" | "dealt" | "evaluated";

export interface CardState {
    card: PlayingCard;
    held: boolean;
}

interface GameStore {
    userName: string;
    balance: number;

    bet: number;
    status: GameStatus;
    deck: PlayingCard[];
    hand: CardState[];
    evaluation: HandEvaluation | null;
    winAmount: number;

    startNewPlayerSession: (name: string) => void;
    resetSession: () => void;
    setBet: (amount: number) => void;
    deal: () => void;
    toggleHold: (index: number) => void;
    draw: () => void;
    resetGame: () => void;
}

export const useGameStore = create<GameStore>()(
    persist(
        (set, get) => ({
            userName: "",
            balance: 100,
            bet: 1,
            status: "idle",
            deck: [],
            hand: [],
            evaluation: null,
            winAmount: 0,

            startNewPlayerSession: (name: string) => {
                set({
                    userName: name,
                    balance: 100,
                    status: "idle",
                    deck: [],
                    hand: [],
                    evaluation: null,
                    winAmount: 0,
                });
            },

            resetSession: () => {
                set({
                    userName: "",
                    balance: 100,
                    bet: 1,
                    status: "idle",
                    deck: [],
                    hand: [],
                    evaluation: null,
                    winAmount: 0,
                });
            },

            setBet: (amount) => {
                const { status, balance } = get();
                if (status !== "idle") return;
                if (amount >= 1 && amount <= 5 && amount <= balance) {
                    set({ bet: amount });
                }
            },

            deal: () => {
                const { balance, bet, status } = get();
                if (status !== "idle" || balance < bet) return;

                const shuffledDeck = shuffleDeck(createDeck());
                const dealtCards = shuffledDeck.slice(0, 5);
                const remainingDeck = shuffledDeck.slice(5);

                const initialHand: CardState[] = dealtCards.map((card) => ({
                    card,
                    held: false,
                }));

                set({
                    balance: balance - bet,
                    status: "dealt",
                    deck: remainingDeck,
                    hand: initialHand,
                    evaluation: null,
                    winAmount: 0,
                });
            },

            toggleHold: (index) => {
                const { status, hand } = get();
                if (status !== "dealt") return;

                const newHand = [...hand];
                newHand[index] = {
                    ...newHand[index],
                    held: !newHand[index].held,
                };

                set({ hand: newHand });
            },

            draw: () => {
                const { status, hand, deck, bet, balance } = get();
                if (status !== "dealt") return;

                let currentDeck = [...deck];

                const finalHand = hand.map((slot) => {
                    if (slot.held) return slot;

                    const newCard = currentDeck[0];
                    currentDeck = currentDeck.slice(1);
                    return { card: newCard, held: false };
                });

                const cardsToEvaluate = finalHand.map((slot) => slot.card);
                const evaluation = evaluateHand(cardsToEvaluate);

                const winAmount = bet * evaluation.payoutMultiplier;
                const newBalance = balance + winAmount;

                set({
                    status: "evaluated",
                    hand: finalHand,
                    deck: currentDeck,
                    evaluation,
                    winAmount,
                    balance: newBalance,
                });
            },

            // Переход к следующей сделке (Next Hand)
            resetGame: () => {
                const { balance, bet } = get();
                set({
                    status: "idle",
                    hand: [],
                    deck: [],
                    evaluation: null,
                    winAmount: 0,
                    bet: balance < bet ? Math.max(1, balance) : bet,
                });
            },
        }),
        {
            name: "space-texas-poker-storage",
            // При F5/перезагрузке сохраняем ВСЕ: имя, баланс и незавершенную раздачу!
            partialize: (state) => ({
                userName: state.userName,
                balance: state.balance,
                bet: state.bet,
                status: state.status,
                deck: state.deck,
                hand: state.hand,
                evaluation: state.evaluation,
                winAmount: state.winAmount,
            }),
        },
    ),
);
