export class Wallets {
    static createQueryBullder: any;
    async findWallet(address: string) {
        const wallet = Wallets.createQueryBullder('w')
        .where('LOWER(w.id) = :address', {address})
        .getOne();

        return wallet || null;
    }
}
