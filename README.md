# Welcome to OB Next! 
Your one stop shop for checking your order statues and BRC20 token balances. Please read on to find out more how to get started.

## Getting Started

First install dependencies
```bash
npm install
```

Now run the development server:

```bash
npm run dev
```

You will be greeted to a welcome page where you are able to navigate to a "Order Status" page and/or a "Token Balance" page.

>IMPORTANT!: In order to utilize application, please obtain an active API key from the OrdinalsBot team.

## Getting to know the app

### Welcome Page
You are able to select which part of the app you want to navigate to! There are two options available: "Check Order Status" and "Check Token Balance". You will also find the current bitcoin price and block being updated in real time and any time you navigate back to the home page. 
>NOTE: Bicoin price should update every 1 minute and the current Bitcoin block should update every 10 mins based on caching implementation.


>IMPORTANT!: In order to visualize the current bitcoin price, you will need access to APIs that will provide both pieces of data.Please refer to the `getBitcoinPriceData` and `getBicoinBlockData` server action functions within the `actions` directory for more information on how to configure your data fetch calls.



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


## Thoughts behind the Code
Throughout the codebase you will find the use of the following implementations for the respective reasons:

- Route Grouping to provide different layouts and enhance the user experience.

- Server actions to be used within forms and other Client Components now and in the future. NOTE! `actions.ts` uses imports `server-only` to ensure API keys do not get accidentatly exposed to the users. [Read Next.js documentation to learn more](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment)

- Also within `actions.ts`, we sanitize the user input through the use of the npm package `xss`. [Read here for more inforamtion on the npm package](https://www.npmjs.com/package/xss)

- Component for project organization and clarity.



## Future DLC

- Enhanced Error handling and Typing
- Ability to connect your Web3 wallet
- Visuliszations for BRC20 ticker and order information
- Updated overall styling


