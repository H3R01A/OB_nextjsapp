# Welcome to OB NEXT! 
Your one stop shop for checking your order statues and BRC20 token balances. Please read on to find out more how to get started.

## Getting started

First install dependencies
```bash
npm install
```


Create a `.env` file with the following API keys:
```bash
OB_API_KEY
BITCOIN_PRICE
```
>IMPORTANT!: In order to utilize the application, please obtain an active API key from the OrdinalsBot team for the `OB_API_KEY` API key and an active API key from a data source of your choice for the  `BITCOIN_PRICE` API key.




Now run the development server:

```bash
npm run dev
```

You will be greeted to a welcome page where you are able to get started with OB NEXT!


## Getting to know the app

### Welcome Page
Users have the ability to connect their Bitcoin Web3 wallet as well as have the ability to check order status, token balances and their saved favorite tokens. Users will also find the current bitcoin price and block height being updated in real time as well as a chart showing historic prices and heights from the past 6 months. 

>NOTE: Bicoin price should update every 1 minute and the current Bitcoin block should update every 10 mins based on caching implementation.

>NOTE: "Check Favorites" section is available to users AFTER they have connected their Web3 wallet.

>IMPORTANT!: In order to visualize the current bitcoin price, you will need access to an API that will provide the data. Please refer to the `getBitcoinPriceData` server action functions within the `actions` directory for more information on how to configure your data fetch calls.



### Order Status
Enter an order id and be presented information on the order such as:
- Payment Status
- Order Type
- Inscribed Count
And more!

>IMPORTANT! OrdinalsBot API Key required

### Token Balance
Enter a BR20 ticker (ex. TRIO) and an active wallet address to check the current and available balance to transer of a token. You will be presented with information such as:
- Max Supply
- Remaining Supply
- Limit Per Mint
- Current Block Height
- Wallet overall balance and transferable balance (if any)

>IMPORTANT! OrdinalsBot API Key required

### Favorites
As part of the January 2025 update, after users successfully connect their Bitcoin wallet, they will now have the ability to favorite tokens while reviewing token balances. These favorite tokens will then appear in the brand new favorites section.

>HOW TO ADD FAVORITE TOKEN: After searching for a token balance, select "Add Token to Favorites" and you will see a heart appear on the token info card. Once added, a user will be able to navigate to the "Favorites" section to review saved tokens. 

>IMPORTANT! A user must connect their wallet first in order to use this feature

## Thoughts behind the code
Throughout the codebase you will find the use of the following implementations for the respective reasons:

- Route Grouping to provide different layouts and enhance the user experience.

- Server actions to be used within forms and other Client Components now and in the future. NOTE! `actions.ts` uses imports `server-only` to ensure API keys do not get accidentatly exposed to the users. [Read Next.js documentation to learn more](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment)

- Also within `actions.ts`, we sanitize the user input through the use of the npm package `xss`. [Read here for more inforamtion on the npm package](https://www.npmjs.com/package/xss)

- Component for project organization and clarity.



## January 2025 Release Notes

New Features and New UI/UX!

Highlights
- Ability to connect your Bitcoin Web3 wallet!
- Ability to favorite tokens to review later in the new favorites section
- UI/UX Revamp 
- Improved Type Safety

Made possible by the below tech stack additions

- LaserEyes - [Read more here](https://www.lasereyes.build/)
- Supabase - [Read more here](https://supabase.com/docs)
- ShadCN - [Read more here](https://ui.shadcn.com/)
- Tailwind - [Read more here](https://tailwindcss.com/)


## Future DLC

- Enhanced Performance, Error Handling and Typing
- Continued Improvements to UX/UI
- Much more


