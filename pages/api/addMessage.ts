// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { serverPusher } from '../../pusher';
import redis from '../../redis';
import { Message } from '../../typing';

type Data = {
  message: Message
}
type ErrorData={
    name:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data|ErrorData>
) {

    if(req.method!=='POST'){
        res.status(405).json({name:'Bad Request'});
        return
    }
  const {message} =req.body;
  const newMessage={
    ...message,
    createdAt:Date.now(),
  }
  //push to redis
  await redis.hset('messages',message.id,JSON.stringify(newMessage));
 await serverPusher.trigger('messages','new-message',newMessage);
  res.status(200).json({ message: newMessage })

}
