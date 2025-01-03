const require = global.require || global.process.mainModule.constructor._load;
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const tgtoken = process.env.TOKEN

// replace the value below with the Telegram token you receive from @BotFather
const token = tgtoken;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const roastList = [
    'تکرار نشه عشقم😘',
    'دیگه از این گها نخورريا، فهمیدی؟😒',
    'نبینم تکرار بشه😐',
    'دیگه از این غلطا نکن!🙄',
    'خو یه واژه نامه که خود کونیتون نوشتید انقد سخته دنبال کردنش؟؟😒',
    'ک*کش واژه نامه رو بخون🤬',
    'مگه افغانی نمیتونی عین آدم حرف بزنی؟',
    'گوساله اون واژه نامه لعنتی رو بخون تا بهت فروش نکردم😡',
    'خدایا مارو از دست این روانیا نجات بده، بیناموس اون واژه نامه رو بخون😤',
    'چه گیری کردیم ربات این احمقا شدیم، خدایی کنج کاوم یه واژه نامه دنبال کردن انقد سخته؟',
    'کی بشه داشم چت جی پی تی دنیاتونو بگیره منو از شر شما خرا نجات بده',
    'تکرار نشه😑'
];

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const { message_id: originalMessageId, from: userid } = msg;
  const chatId = msg.chat.id;
  fs.readFile('words.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  
    // Parse the JSON data
    const jsonData = JSON.parse(data);
  
    // Get the sentence from process.argv
  
    // Replace value1 with value2 in the sentence
    let modifiedSentence = msg.text;
    var y = false;
    for (const [key, value] of Object.entries(jsonData)) {
      if( modifiedSentence.includes(key)) {
        y = true
      }
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      modifiedSentence = modifiedSentence.replace(key, value);
    }
  
    // Output the modified sentence
    var finalmessage = "درستش:\n" + modifiedSentence
    if (y==true) {
        bot.sendMessage(chatId, finalmessage, {reply_to_message_id: originalMessageId})
        new Promise(resolve => setTimeout(resolve, 1000));
        bot.sendMessage(chatId, roastList[Math.floor(Math.random() * roastList.length)])
    };
  });
  // send a message to the chat acknowledging receipt of their message
  //bot.sendMessage(chatId, 'Received your message');
});
