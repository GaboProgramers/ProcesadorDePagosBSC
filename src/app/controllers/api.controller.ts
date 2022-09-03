import { Context, dependency, Get, HttpResponseOK } from '@foal/core';
import { BscScanApi } from '../services';

export class ApiController {
  @dependency
  private bscScanApi: BscScanApi;

  @Get('/')
  async index(ctx: Context) {
    const transaction = await this.bscScanApi.listTransactions();
    return new HttpResponseOK({transaction});
  }

}
