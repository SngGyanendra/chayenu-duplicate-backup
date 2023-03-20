import { useState, useEffect } from 'react';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import Styles from '/styles/transactions.module.scss';
import { useSelector } from 'react-redux';
import { TransactionCard } from '/components/cards';

export default function Transactions() {
  const APIs = new AuthencticatedUserAPI();
  const [transactionsList, setTransactionsList] = useState([]);

  const { transactions_list } = useSelector((state) => state.user);

  useEffect(() => {
    const getData = async () => {
      const transactions = await APIs.getAllUserTransactions();
      setTransactionsList(transactions);
    };
    if (transactions_list.length === 0) {
      getData();
    } else {
      setTransactionsList(transactions_list);
    }
  }, []);
  
  return (
    <section className={Styles.page}>
      {transactionsList?.map((transaction,index) => (
        <TransactionCard key={index} transaction={transaction} />
      ))}
    </section>
  );
}
