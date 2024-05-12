'use client';

import { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import type { Move } from 'chess.js';

type MoveParam =
    | string
    | {
          from: string;
          to: string;
          promotion?: string | undefined;
      };

type PlayRandomMoveEngineProps = {
    gameStarted?: boolean;
};

export default function PlayRandomMoveEngine({
    gameStarted = false,
}: PlayRandomMoveEngineProps) {
    const [game, setGame] = useState(new Chess());

    function makeAMove(move: MoveParam) {
        try {
            const result = game.move(move as Move);
            if (result === null) return null;
            setGame(new Chess(game.fen()));
            return result; // null if the move was illegal, the move object if the move was legal
        } catch (e) {
            return null;
        }
    }

    function makeRandomMove() {
        const possibleMoves = game.moves();
        if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
            alert('Game over');
            return; // exit if the game is over
        }
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        makeAMove(possibleMoves[randomIndex] as MoveParam);
    }

    function onDrop(sourceSquare: string, targetSquare: string) {
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q', // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return false;
        setTimeout(makeRandomMove, 200);
        return true;
    }

    return (
        <div className={'w-full rounded-lg shadow-lg overflow-hidden'}>
            <Chessboard
                autoPromoteToQueen
                arePremovesAllowed
                position={game.fen()}
                onPieceDrop={onDrop}
            />
        </div>
    );
}
