'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { P } from '@repo/ui/typography';
import { Input } from '@repo/ui/input';

import useGameState from '@/state/game-state';
import { set } from 'react-hook-form';

import { completeChessContextMessage } from '@/lib/chat';

export default function ChatCard() {
    const [message, setMessage] = useState('');
    const [coachMessage, setCoachMessage] = useState('');
    const [generating, setGenerating] = useState(false);
    const [messageList, setMessageList] = useState<string[]>([]);
    const { fen } = useGameState();

    const sendMessageToLLM = async (message: string) => {
        // clear coach message

        if (!message) return;
        if (generating) return;

        setGenerating(true);
        setCoachMessage('');

        try {
            console.log(`Sending message to LLM: ${message}`);

            const response = await fetch('/api/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, fen }),
            }); 

            const data = await response.text();

            console.log('Data:', data);

            setCoachMessage(data);
            
           
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
