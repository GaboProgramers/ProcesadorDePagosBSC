import { Env } from '@foal/core/lib/core';
import * as axios from 'axios';
import { IBscScanResponse } from '../interfaces/bscscan-response.interfaces';
import { IBscScanTransaction } from '../interfaces/bscscan-transactions-interface';


const apiUrl = "https://api.bscscan.com/api";

export class BscScanApi {

    private key: string;
    private wallet: string;

    constructor() {
        this.loadSettings();
    }

    async listTransactions(initialBlock = 0) {
        const action = `module=account&action=tokentx`
        const url = `${apiUrl}?${action}&address=${this.wallet}&startblock=${initialBlock}&endBlock=999999999&sort=desc&apiKey=${this.key}`

        const response = await axios.default.get(url);
        if(response.status !== 200) {
            throw new Error(`Error Code ${response.status} - ${response.statusText}`)
        }

        const bscScanResponse = response.data as IBscScanResponse<IBscScanTransaction[]>;
        return bscScanResponse.result;
    }

    private loadSettings() {
        const key = Env.get("BSCSCAN_KEY")
    if(!key) {
        throw new Error('BSCscan key is undefine');
        
    }

    this.key = key;

    const wallet = Env.get("WALLET");
    if(!wallet) {
        throw new Error('Wallet is undefine');
        
    }

    this.wallet = wallet;
    }
}
