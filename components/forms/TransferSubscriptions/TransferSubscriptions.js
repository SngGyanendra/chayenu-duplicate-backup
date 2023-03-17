import { Formik } from 'formik';
import Styles from './transfersubscriptions.module.scss';

export function TransferSubscriptions() {
  return (
    <form className={Styles.form}>
      <div>Transfer Subscription</div>
      <select name="reason" id=""></select>
    </form>
  );
}
