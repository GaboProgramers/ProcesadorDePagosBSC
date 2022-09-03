// 3p
import { createConnection } from 'typeorm';
import { Currency } from '../app/entities';

const currencies = [
  {
    name: 'Day Token',
    symbol: 'DAI',
    decimals: '18',
    contract: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
    url: 'https://bscscan.com/token/0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3'
  },

  {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: '18',
    contract: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    url: 'https://bscscan.com/token/0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
  },

  {
    name: 'USD Token',
    symbol: 'USDT',
    decimals: '18',
    contract: '0x55d398326f99059fF775485246999027B3197955',
    url: 'https://bscscan.com/token/0x55d398326f99059fF775485246999027B3197955'
  },

  {
    name: 'BUSD Token',
    symbol: 'BUSD',
    decimals: '18',
    contract: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    url: 'https://bscscan.com/token/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
  }
];

export async function main(args: any) {
  const connection = await createConnection();

  try {
    for(const data of currencies) {
      const exists = await Currency.findOne({ contract: data.contract});
      if (!exists) {
        const newCurrency = Currency.create(data);
        await newCurrency.save();
        console.log('Currency Create', data);
      }
      else {
        console.log(`Currency "${data.name}" already exists."`)
      }
    }
    Currency
    } 
    catch (error: any) {
    console.error(error);
  } finally {
    await connection.close();
  }
}
