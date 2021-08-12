# Setup
In this file, I will show you how to configure the project locally.

- [Dependencies](#Dependencies)
- [.env](#.env)
  - [BOT_TOKEN](#BOT_TOKEN)
  - [LARA_API](#LARA_API)
  - [PROD_DATABASE](#PROD_DATABASE)
  - [IBM](#IBM)

---

## Dependencies
- Install [Node.js](https://nodejs.org/) (latest version)
- Install [Python]() (version 3.9.6)
  > NOTE: You only need to install Python if you want to use Lara's API.
- Install all dependencies:

   ```npm install```

   ```pip install -r requirements.txt```
---

## .env
The .env file has the following variables:
```
// BOT
BOT_TOKEN= ***
BOT_TOKEN_TEST=" ***
LARA_API=http://127.0.0.1:5000/


// DATABASE
PROD_DATABASE= ***
TEST_DATABASE= ***


// API URL
IBM_TRANSLATE_HOST= ***
IBM_TEXT_TO_SPEECH_HOST= ***

// API KEY
IBM_TRANSLATE_APIKEY= ***
IBM_TEXT_TO_SPEECH_APIKEY= ***
```
Next, I'll explain what each of these variables is for:

- ### <strong>BOT_TOKEN</strong>
  O BOT_TOKEN (produção) e o BOT_TOKEN_TEST (teste) são os tokens do bot no Telegram. Você pode criar os bots a partir do [BotFather](t.me/BotFather).

  Watch this [tutorial](https://www.youtube.com/watch?v=nqUp-yLH92c) to learn how to create a bot in the botfather.

- ### <strong>LARA_API</strong>
  This variable is the Lara API URL, which you will run locally.

- ### <strong>PROD_DATABASE</strong>
  O PROD_DATABASE (produção) e o TEST_DATABASE (teste) são as variáveis que representam a URI do banco de dados [MongoDB](https://www.mongodb.com/).

- ### <strong>IBM</strong>
  All environment variables that start with IBM are credentials of the IBM resources we use. [See here](https://cloud.ibm.com/)