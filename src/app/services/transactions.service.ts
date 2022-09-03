
import { dependency } from "@foal/core";
import { Currency, Transaction, Wallet } from "../entities";
import { IBscScanTransaction } from "../interfaces/bscscan-transactions-interface";
import { Wallets } from "./wallets.service";
import {BigNumber} from "bignumber.js";

export class Transactions {

    @dependency
    private wallets: Wallets;

   async processTransactions (apiTransactions: IBscScanTransaction[]) {
    const currencies = await Currency.find();

    for(const apiTransaction of apiTransactions) {

        const currency = currencies.find(m => m.contract.toLowerCase() == apiTransaction.contractAddress.toLowerCase());
        if (currency) {
         const wallet = await this.wallets.findWallet(apiTransaction.from);
            if (wallet) {
                const transaction = Transaction.create();
                transaction.id = `rv-${apiTransaction.hash}`;
                transaction.date = new Date(apiTransaction.timeStamp * 1000);
                transaction.description = '';
                transaction.from = apiTransaction.from;
                transaction.to = apiTransaction.to;
                transaction.currency = currency;
                transaction.wallet = wallet;

                const amount = new BigNumber(apiTransaction.value).div(new BigNumber(10).pow(currency.decimals));
                transaction.amount = amount.toNumber();


                await transaction.save();
            }
        }
        }
    }
}
