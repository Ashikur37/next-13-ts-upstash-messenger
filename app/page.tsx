import { unstable_getServerSession } from "next-auth";
import { Message } from "../typing";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { Providers } from "./auth/signin/providers"
async function Home() {
  const data = await fetch(`${process.env.VERCEL_URL}/api/getMessages`).then(res => res.json());
  const messages: Message[] = data.messages;
  const session = await unstable_getServerSession();
  return (
    <Providers session={session}>
      <main >
        <MessageList initialMessages={messages} />
        <ChatInput session={session} />
      </main>
    </Providers>
  )
}
export default Home;