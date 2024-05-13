import { create } from 'zustand';
import { combine } from 'zustand/middleware';

import { Chess } from 'chess.js';

import type { Move } from 'chess.js';

interface GameState {
    game: Chess;
    setGame: (game: Chess) => void;

    fen: string;
    setFen: (fen: string) => void;

    history: Move[];
    setHistory: (history: Move[]) => void;
    clearHistory: () => void;

    makeMove: (move: Move) => void;
}

const useGameState = create<GameState>((set) => ({
    game: new Chess(),
    setGame: (game) => set({ game }),

    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    setFen: (fen: string) => set({ fen }),

    history: [],
    setHistory: (history) => set({ history }),
    clearHistory: () => set({ history: [] }),

    makeMove: (move: Move) => {
        set((state) => {
            state.fen = state.game.fen();
            state.history.push(move);
            return state;
        });
    },
}));

export default useGameState;
