# Welcome to OB Next! 
Your one stop shop for checking your BRC20 token balances and order statues. Please read on to find out more how to get started.

## Getting Started

First install dependencies
```bash
npm install
```

Now run the development server:

```bash
npm run dev
```

You will be greeted to a welcome page where you are able to navigate to check your order status and token balance of a BRC20 token.

>IMPORTANT!: In order to utilize application, please obtain active API key from the OrdinalsBot team as well as API keys from Coingecko and  .env file.

## Getting to know the app

### Welcome Page
You are able to select which part of the app you want to navigate to! There are two options today: "Check Order Status" and "Check Token Balance". You will also find the current bitcoin price and block. 

>IMPORTANT!: In order to visualize the current bitcoin price, you will need a CoinGecko API key. If you have access to another source, feel free to change API KEY referenced in the `getBitcoinPriceData` function under the `actions` directory.

### Order Status
Enter an order id and be presented information on the order such as:
- Payment Status
- Order Type
- Inscribed Count
And more!

>IMPORTANT! OrdinalsBot API Key required

### Token Balance
Enter a ticker (ex. TRIO) and a wallet address to check the current balance and available balance to transer of a BRC20 token. You will be presented with information such as:

>IMPORTANT! OrdinalsBot API Key required


## Thoughts behind the Code
Throughout the codebase you will find the use of the following implementations for the respective reasons:

- Route Grouping to provide different layouts and enhance the user experience.

- Server actions to be used within forms and other Client Components now and in the future. NOTE! `actions.ts` uses imports `server-only` to ensure API keys do not get accidentatly exposed to the users. [Read Next.js documentation to learn more](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment)

- Also within `actions.ts`, we sanitize the user input

- Component for project organization and clarity



## Future DLC

- Enhanced Error handling and Typing
- Visuliszations of ticker and ticker information
- Updated styling
- Implement caching on 

