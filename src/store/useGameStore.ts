import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlayingCard, HandEvaluation } from "../types/poker";
import { createDeck, shuffleDeck } from "../utils/deck";
import { evaluateHand } from "../utils/pokerEvaluator";
import type { GameStatus } from "../types/poker";

// Oppretter og returnerer starttilstanden for en ny spillrunde med standardverdier.
const createRoundState = () => ({
    status: "idle" as GameStatus,
    deck: [],
    hand: [],
    evaluation: null,
    winAmount: 0,
});

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

// Oppretter Zustand-store for spillets tilstand og bruker persist-middleware for automatisk lagring i localStorage.
export const useGameStore = create<GameStore>()(
    persist(
        (set, get) => ({
            userName: "",
            balance: 100,
            bet: 1,
            ...createRoundState(),

            // Oppretter en ny spillsesjon og klargjør tilstanden for en ny runde.
            startNewPlayerSession: (name: string) => {
                set({
                    userName: name,
                    balance: 100,
                    ...createRoundState(),
                });
            },

            // Tilbakestiller den nåværende spillsesjonen til starttilstanden.
            resetSession: () => {
                set({
                    userName: "",
                    balance: 100,
                    bet: 1,
                    ...createRoundState(),
                });
            },

            // Oppdaterer og setter størrelsen på spillerens innsats for runden.
            setBet: (amount) => {
                const { status, balance } = get();
                if (status !== "idle") return;
                if (amount >= 1 && amount <= 5 && amount <= balance) {
                    set({ bet: amount });
                }
            },

            // Deler ut de første 5 kortene fra kortstokken til spillerens hånd.
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

            // Veksler hold-statusen for et valgt kort på hånden mellom utdelinger.
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

            // Deler ut nye kort for å erstatte kortene som ikke er holdt, og evaluerer sluttresultatet og gevinsten for runden.
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

            // Tilbakestiller runden og gjør klar kortstokken for en ny utdeling.
            resetGame: () => {
                const { balance, bet } = get();
                set({
                    ...createRoundState(),
                    bet: balance < bet ? Math.max(1, balance) : bet,
                });
            },
        }),
        {
            // Konfigurerer persist-middleware ved å velge hvilke tilstandsvariabler som skal lagres i localStorage.
            name: "space-texas-poker-storage",
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
