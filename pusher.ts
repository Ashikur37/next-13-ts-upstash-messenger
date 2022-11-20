import Pusher from 'pusher';
import ClientPusher from 'pusher-js';

export const serverPusher=new Pusher({
    appId: "1509075",
    key: "1bd2a452ad08306a6746",
    secret: "aca20f8f75814ad4739b",
    cluster: "ap2",
    useTLS: true
  });

export const clientPusher=new ClientPusher('1bd2a452ad08306a6746', {
    cluster: 'ap2',
    forceTLS: true
  });