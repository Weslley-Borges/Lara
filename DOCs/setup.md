# Setup
In this file, I will show you how to configure the project locally.

- [Dependencies](#Dependencies)
- [.env](#.env)
  - [BOT_TOKEN](#BOT_TOKEN)
  - [LARA_API](#LARA_API)
  - [MONGO_DATABASE](#MONGO_DATABASE)
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
MONGO_HOST_PROD="localhost/lara"
MONGO_USERNAME_PROD= ***
MONGO_PASSWORD_PROD= ***

MONGO_PORT_LOCAL=27017
```
Next, I'll explain what each of these variables is for:

- ### <strong>BOT_TOKEN</strong>
  The BOT_TOKEN (production) and the BOT_TOKEN_TEST (test) are the bot's tokens in Telegram. You can create bots from [BotFather](t.me/BotFather).

  Watch this [tutorial](https://www.youtube.com/watch?v=nqUp-yLH92c) to learn how to create a bot in the botfather.

- ### <strong>LARA_API</strong>
  This variable is the Lara API URL, which you will run locally.

- ### <strong>MONGO_DATABASE</strong>
  These are the variables that represent the credentials of the database [MongoDB](https://www.mongodb.com/).