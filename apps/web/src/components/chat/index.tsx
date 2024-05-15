'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { P } from '@repo/ui/typography';
import { Input } from '@repo/ui/input';

import useGameState from '@/state/game-state';
import { set } from 'react-hook-form';

export default function ChatCard() {
    const [message, setMessage] = useState('');
    const [coachMessage, setCoachMessage] = useState('');
    const [generating, setGenerating] = useState(false);
    const { fen } = useGameState();

    const sendMessageToLLM = async (message: string) => {
        // clear coach message

        if (!message) return;
        if (generating) return;

        setGenerating(true);
        setCoachMessage('');

        try {
            console.log(`Sending message to LLM: ${message}`);

            const body = {
                model: 'lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF',
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are a chess coach named Nelson that answers questions about chess and gains insight into positions.',
                    },
                    {
                        role: 'system',
                        content:
                            "Don't talk about the FEN unless the user asks about it. Only provide insight about the game. Assume the user knows what the FEN string is and what it means.",
                    },
                    {
                        role: 'system',
                        content:
                            'You can provide insights about the game, suggest moves, and answer questions about chess.',
                    },
                    {
                        role: 'system',
                        content:
                            'You can also ask questions to the user to gain more insight into the position.',
                    },
                    {
                        role: 'system',
                        content:
                            'You can also provide general advice about chess.',
                    },
                    {
                        role: 'user',
                        content:
                            'Assume the user is intermediate chess player that knows what the FEN string is and what it means.',
                    },
                    { role: 'user', content: 'The fen string is: ' + fen },
                    {
                        role: 'user',
                        content:
                            "Don't talk about the FEN unless I ask about it. Only provide insight about the game.",
                    },
                    { role: 'user', content: message },
                ],
                temperature: 0.8,
                max_tokens: -1,
                stream: true,
            };

            const response = await fetch(
                'http://localhost:1234/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                },
            );

            const reader = response.body?.getReader();

            if (!reader) {
                throw new Error('Response body is not readable');
            }

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    setGenerating(false);
                    break;
                }

                // Convert the stream chunk to text
                const text = new TextDecoder().decode(value);

                const jsonObjectString = text.substring(text.indexOf('{'));

                // Handle the stream data (e.g., update UI)
                console.log(text);

                try {
                    const data = JSON.parse(jsonObjectString);

                    // Handle the parsed JSON object (e.g., update UI)
                    console.log(data);

                    if (data && data.choices) {
                        data.choices.forEach((choice: any) => {
                            const newToken = choice.delta.content;
                            setCoachMessage(
                                (prevCoachMessage) =>
                                    prevCoachMessage + newToken,
                            );
                        });
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    // Optionally handle the error, e.g., retrying or logging
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error);
        } finally {
            setGenerating(false);
        }
    };

    const submitMessage = (e: FormEvent) => {
        e.preventDefault();

        if (!message) return;
        if (generating) return;

        console.log(message);

        sendMessageToLLM(message);

        setMessage('');
    };

    return (
        <div
            className={
                'bg-neutral-100 rounded-lg p-4 h-full w-full flex-1 flex flex-col gap-4 col-span-2'
            }
        >
            <div className={'flex gap-4'}>
                <Image
                    src={'/images/coach.svg'}
                    alt={'Isometric chess board'}
                    width={56}
                    height={56}
                    className={
                        'rounded-lg bg-neutral-600 aspect-square w-16 h-16 pt-1'
                    }
                />

                <div
                    className={
                        'flex flex-col justify-center text-sm self-start'
                    }
                >
                    <div className={''}>
                        <P className={'font-semibold'}>Coach Nelson</P>
                    </div>

                    <P className={'text-neutral-900'}>
                        {coachMessage ||
                            "Ask me anything about chess! I'll help you out."}
                    </P>
                </div>
            </div>

            <form onSubmit={submitMessage}>
                <Input
                    disabled={generating}
                    type={'text'}
                    placeholder={'Type your message here'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={
                        'bg-neutral-200 text-neutral-900 placeholder-neutral-500'
                    }
                />
            </form>
        </div>
    );
}