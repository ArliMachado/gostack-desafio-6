import path from 'path';
import csvtojson from 'csvtojson';

import uploadConfig from '../config/upload';

import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

type Typestransaction = 'income' | 'outcome';

class ImportTransactionsService {
  async execute(filename: string): Promise<Transaction[]> {
    const transactionsFilePath = path.join(uploadConfig.directory, filename);

    const data = await csvtojson().fromFile(transactionsFilePath);
    const createTransaction = new CreateTransactionService();

    const transactions: Transaction[] = [];

    for (const element of data) {
      transactions.push(await createTransaction.execute(element));
    }

    return transactions;
  }
}

export default ImportTransactionsService;
