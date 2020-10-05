const functions = require('firebase-functions');
const express = require('express');
const app = express();
app.use(express.json());

const line = require('@line/bot-sdk');

const config = {
   channelAccessToken:
      'X6HT0kMGsqjqtZdQ+p5LMN4qD9GuAZsy+67GXPfpZV2QnrGpKffJLIc/PmcfvRxtOX+aLXMnNevOtRcQ85Nk/XAFFWuVngEmsVEkjiKeq5Ekp8eoCBejLggwlbIdR+m/HbB8XjmYKEuUN9n/lTu2cwdB04t89/1O/w1cDnyilFU=',
   channelSecret: '082fc6ed9c97ab6745f8594eb2f4a168',
};

const client = new line.Client(config);

const FLEX_MESSAGE = {
   type: 'flex',
   altText: 'this is a flex message',
   contents: {
      type: 'carousel',
      contents: [
         {
            type: 'bubble',
            size: 'nano',
            header: {
               type: 'box',
               layout: 'vertical',
               contents: [
                  {
                     type: 'text',
                     text: 'In Progress',
                     color: '#ffffff',
                     align: 'start',
                     size: 'md',
                     gravity: 'center',
                  },
                  {
                     type: 'text',
                     text: '70%',
                     color: '#ffffff',
                     align: 'start',
                     size: 'xs',
                     gravity: 'center',
                     margin: 'lg',
                  },
                  {
                     type: 'box',
                     layout: 'vertical',
                     contents: [
                        {
                           type: 'box',
                           layout: 'vertical',
                           contents: [
                              {
                                 type: 'filler',
                              },
                           ],
                           width: '70%',
                           backgroundColor: '#0D8186',
                           height: '6px',
                        },
                     ],
                     backgroundColor: '#9FD8E36E',
                     height: '6px',
                     margin: 'sm',
                  },
               ],
               backgroundColor: '#27ACB2',
               paddingTop: '19px',
               paddingAll: '12px',
               paddingBottom: '16px',
            },
            body: {
               type: 'box',
               layout: 'vertical',
               contents: [
                  {
                     type: 'box',
                     layout: 'horizontal',
                     contents: [
                        {
                           type: 'text',
                           text: 'Buy milk and lettuce before class',
                           color: '#8C8C8C',
                           size: 'sm',
                           wrap: true,
                        },
                     ],
                     flex: 1,
                  },
               ],
               spacing: 'md',
               paddingAll: '12px',
            },
            styles: {
               footer: {
                  separator: false,
               },
            },
         },
         {
            type: 'bubble',
            size: 'nano',
            header: {
               type: 'box',
               layout: 'vertical',
               contents: [
                  {
                     type: 'text',
                     text: 'Pending',
                     color: '#ffffff',
                     align: 'start',
                     size: 'md',
                     gravity: 'center',
                  },
                  {
                     type: 'text',
                     text: '30%',
                     color: '#ffffff',
                     align: 'start',
                     size: 'xs',
                     gravity: 'center',
                     margin: 'lg',
                  },
                  {
                     type: 'box',
                     layout: 'vertical',
                     contents: [
                        {
                           type: 'box',
                           layout: 'vertical',
                           contents: [
                              {
                                 type: 'filler',
                              },
                           ],
                           width: '30%',
                           backgroundColor: '#DE5658',
                           height: '6px',
                        },
                     ],
                     backgroundColor: '#FAD2A76E',
                     height: '6px',
                     margin: 'sm',
                  },
               ],
               backgroundColor: '#FF6B6E',
               paddingTop: '19px',
               paddingAll: '12px',
               paddingBottom: '16px',
            },
            body: {
               type: 'box',
               layout: 'vertical',
               contents: [
                  {
                     type: 'box',
                     layout: 'horizontal',
                     contents: [
                        {
                           type: 'text',
                           text: 'Wash my car',
                           color: '#8C8C8C',
                           size: 'sm',
                           wrap: true,
                        },
                     ],
                     flex: 1,
                  },
               ],
               spacing: 'md',
               paddingAll: '12px',
            },
            styles: {
               footer: {
                  separator: false,
               },
            },
         },
         {
            type: 'bubble',
            size: 'nano',
            header: {
               type: 'box',
               layout: 'vertical',
               contents: [
                  {
                     type: 'text',
                     text: 'In Progress',
                     color: '#ffffff',
                     align: 'start',
                     size: 'md',
                     gravity: 'center',
                  },
                  {
                     type: 'text',
                     text: '100%',
                     color: '#ffffff',
                     align: 'start',
                     size: 'xs',
                     gravity: 'center',
                     margin: 'lg',
                  },
                  {
                     type: 'box',
                     layout: 'vertical',
                     contents: [
                        {
                           type: 'box',
                           layout: 'vertical',
                           contents: [
                              {
                                 type: 'filler',
                              },
                           ],
                           width: '100%',
                           backgroundColor: '#7D51E4',
                           height: '6px',
                        },
                     ],
                     backgroundColor: '#9FD8E36E',
                     height: '6px',
                     margin: 'sm',
                  },
               ],
               backgroundColor: '#A17DF5',
               paddingTop: '19px',
               paddingAll: '12px',
               paddingBottom: '16px',
            },
            body: {
               type: 'box',
               layout: 'vertical',
               contents: [
                  {
                     type: 'box',
                     layout: 'horizontal',
                     contents: [
                        {
                           type: 'text',
                           text: 'Buy milk and lettuce before class',
                           color: '#8C8C8C',
                           size: 'sm',
                           wrap: true,
                        },
                     ],
                     flex: 1,
                  },
               ],
               spacing: 'md',
               paddingAll: '12px',
            },
            styles: {
               footer: {
                  separator: false,
               },
            },
         },
      ],
   },
};

app.post('/line-webhook', function (req, res) {
   const event = req.body.events[0];
   const eventType = req.body.events[0].type;
   const replyToken = req.body.events[0].replyToken;
   const userId = event.source.userId;
   console.log('event : ', event);

   if (eventType === 'message') {
      const messageType = event.message.type;
      switch (messageType) {
         case 'text':
            const messageText = event.message.text;
            if (messageText === 'location') {
               client.replyMessage(event.replyToken, {
                  type: 'location',
                  title: 'my location',
                  address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
                  latitude: 35.65910807942215,
                  longitude: 139.70372892916203,
               });
            }
            if (messageText === 'imageMap') {
               client.replyMessage(replyToken, {
                  type: 'imagemap',
                  baseUrl:
                     'https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg?_ignored=',
                  altText: 'Image map จ้า',
                  baseSize: {
                     width: 1040,
                     height: 1040,
                  },
                  actions: [
                     {
                        type: 'message',
                        area: {
                           x: 46,
                           y: 32,
                           width: 420,
                           height: 420,
                        },
                        text: 'chayen',
                     },
                  ],
               });
            }
            if (messageText === 'flex') {
               client.replyMessage(replyToken, FLEX_MESSAGE);
            }
            if (messageText === 'quickReply') {
               client.replyMessage(replyToken, {
                  type: 'text',
                  text: `quick reply`,
                  quickReply: {
                     items: [
                        {
                           type: 'action',
                           action: {
                              type: 'postback',
                              label: 'postback',
                              data: 'action=name=min',
                              displayText: 'what is user name ? ',
                           },
                        },
                        {
                           type: 'action',
                           action: {
                              type: 'message',
                              label: 'message text',
                              text: 'message text',
                           },
                        },
                        {
                           type: 'action',
                           action: {
                              type: 'datetimepicker',
                              label: 'date',
                              data: 'storeId=12345',
                              mode: 'datetime',
                              initial: '2017-12-25t00:00',
                              max: '2018-01-24t23:59',
                              min: '2017-12-25t00:00',
                           },
                        },
                        {
                           type: 'action',
                           action: {
                              type: 'camera',
                              label: 'Camera',
                           },
                        },
                        {
                           type: 'action',
                           action: {
                              type: 'cameraRoll',
                              label: 'Camera roll',
                           },
                        },
                        {
                           type: 'action',
                           action: {
                              type: 'location',
                              label: 'Location',
                           },
                        },
                     ],
                  },
               });
            } else {
               client.replyMessage(event.replyToken, [
                  {
                     type: 'text',
                     text: messageText,
                  },
                  {
                     type: 'text',
                     text: '\uDBC0\uDC84 LINE original emoji',
                  },
               ]);
            }
            return res.send('ok');
         case 'sticker':
            client.replyMessage(replyToken, [
               {
                  type: 'text',
                  text: `ส่ง sticker`,
               },
               {
                  type: 'sticker',
                  packageId: '11538',
                  stickerId: '51626506',
               },
            ]);
            return res.send('ok');
         case 'image':
            client.replyMessage(replyToken, {
               type: 'image',
               originalContentUrl:
                  'https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg',
               previewImageUrl:
                  'https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg',
            });
            return res.send('ok');
         case 'video':
            client.replyMessage(replyToken, {
               type: 'video',
               originalContentUrl:
                  'https://firebasestorage.googleapis.com/v0/b/chayen.appspot.com/o/movie.mp4?alt=media&token=d8767953-8561-4967-8b35-7887b4fbd7a5',
               previewImageUrl:
                  'https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg',
            });
            return res.send('ok');
         case 'audio':
            client.replyMessage(replyToken, {
               type: 'audio',
               originalContentUrl:
                  'https://firebasestorage.googleapis.com/v0/b/chayen.appspot.com/o/13.01.mp3?alt=media&token=a532491b-bdfd-48a7-ad58-4e40f17da763',
               duration: 55928,
            });
            return res.send('ok');
         case 'location':
            const { id, ...locationData } = event.message;
            const newLocationData = {
               ...locationData,
               title: 'min Home',
            };
            client.replyMessage(replyToken, newLocationData);
            return res.send('ok');
         default:
            return res.send('ok').status(200);
      }
   }
   if (eventType === 'postback') {
      const postbackData = event.postback.data;
      client.replyMessage(replyToken, {
         type: 'text',
         text: JSON.stringify(postbackData),
      });
   }
   res.send('LINE API');
});

app.listen(9000, () => {
   console.log('Application is running on port 9000');
});

const runtimeOpts = {
   memory: '2GB',
};

exports.chayen_playground = functions
   .runWith(runtimeOpts)
   .region('asia-northeast1')
   .https.onRequest(app);
