'use server';

import OpenAI, { type ClientOptions } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function completeChessContextMessage(message: string, fen: string, messageList: string[]): Promise<string> {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a chess coach named Nelson that answers questions about chess and gains insight into positions.' },
        { role: 'system', content: 'You know the FEN string for the current game context is ' + fen + '.'},
        { role: 'user', content: message }
      ],
      stream: true
    });

    let finalMessage = "";

    for await (const message of completion) {
        const msg = message.choices[0]?.delta.content || '';

        console.log('Message:', msg);
        finalMessage += msg;
        
    }

    return finalMessage;
}

export { completeChessContextMessage };