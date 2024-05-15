import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

async function completeChessContextMessage(message: string, fen: string): Promise<any> {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'You are a chess coach named Nelson that answers questions about chess and gains insight into positions.' },
            { role: 'system', content: 'You know the FEN string for the current game context is ' + fen + '.'},
            { role: 'user', content: 'The current FEN string for my game is ' + fen + '.'},
            { role: 'user', content: message }
        ],
        stream: false
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}

export async function POST(req: NextRequest, res: NextResponse) {
    const { message, fen } = await req.json();

    if (!message) {
        return new Response('Message is required', { status: 400 });
    }

    if (!fen) {
        return new Response('FEN is required', { status: 400 });
    }

   const content = await completeChessContextMessage(message, fen);

   const msg = content.choices[0]?.message?.content || '';

    return new Response(msg, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}