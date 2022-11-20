'use client'

import { unstable_getServerSession } from "next-auth";
import { FormEvent, useState } from "react";
import useSwr from "swr";
import { v4 as uuid } from 'uuid';
import { Message } from "../typing";
import fetcher from "../utils/fetchMessages";
type Props = {
    session: Awaited<ReturnType<typeof unstable_getServerSession>>
}
function ChatInput({ session }: Props) {
    //1.41.33
    const [input, setInput] = useState('');
    const { data: messages, error, mutate } = useSwr('/api/getMessages', fetcher);
    console.log(messages, error);
    const addMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input || !session) return;
        const messageToSend = input;
        setInput('');
        const id = uuid();
        const message: Message = {
            id,
            message: messageToSend,
            createdAt: Date.now(),
            username: session?.user?.name!,
            profilePic: session?.user?.image!,
            email: session?.user?.email!
        }
        const uploadMessageToUpstash = async () => {
            const data = await fetch('/api/addMessage',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message })
                }
            ).then(res => res.json());
            return [data.message, ...messages!];
        }
        await mutate(uploadMessageToUpstash, {
            optimisticData: [message, ...messages!],
            rollbackOnError: true
        });
        // uploadMessageToUpstash();
    }
    return (
        <form onSubmit={addMessage} className='bg-white flex px-10 py-5 space-x-2 border-t fixed bottom-0 z-50 border-gray-100'>
            <input disabled={!session} value={input} placeholder='Enter message.....' className='flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300
            focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed
            ' type="text"
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
            disabled:opacity-50 disabled:cursor-not-allowed rounded'
                disabled={!input}
            >
                Send
            </button>
        </form>
    )
}

export default ChatInput