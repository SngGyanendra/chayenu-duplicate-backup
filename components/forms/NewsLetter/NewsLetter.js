import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { toastTemplate } from '/components/common';
import Styles from './Newsletter.module.scss';

export function NewsLetter({ setPopupState }) {
  return (
    <div className={Styles.form}>
      <MailchimpSubscribe
        url={process.env.NEXT_PUBLIC_MAILCHIMP_URL}
        render={({ subscribe, status, message }) => (
          <>
            <NewsLetterForm
              status={status}
              message={message}
              onValidated={(formData) => subscribe(formData)}
              setPopupState={setPopupState}
            />
          </>
        )}
      />
    </div>
  );
}

function NewsLetterForm({ status, message, onValidated, setPopupState }) {
  const [error, setError] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState();

  useEffect(() => {
    if (status === 'success') {
      toastTemplate(toast.success, `You are successfully subscribed!`);
      setPopupState(undefined);
    } else if (status === 'error') {
      toastTemplate(toast.error, `${getMessage(message)}`);
    }
  }, [message, status]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!email || email.indexOf('@') === -1) {
      setError('Please enter a valid email address');
      {
        error && toastTemplate(toast.error, `${getMessage(error)}`);
      }
      return null;
    }
    if (!firstName || !lastName) {
      setError('Please enter your first and last name');
      {
        error && toastTemplate(toast.error, `${getMessage(error)}`);
      }
      return null;
    }
    email &&
      firstName &&
      lastName &&
      email.indexOf('@') > -1 &&
      onValidated({
        EMAIL: email,
        MERGE1: firstName,
        MERGE2: lastName,
      });
  };

  const handleInputKeyEvent = (event) => {
    setError(null);
    if (event.keyCode === 13) {
      event.preventDefault();
      handleFormSubmit();
    }
  };

  const getMessage = (message) => {
    if (!message) {
      return null;
    }
    const result = message?.split('-') ?? null;
    if ('0' !== result?.[0]?.trim()) {
      return message;
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? formattedMessage : null;
  };

  return (
    <div>
      <div className={Styles.loginContainer}>
        <form
          className={Styles.loginInput}
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <div className={Styles.loginText}>Signup to the Newsletter</div>
          <label>
            <input
              type="text"
              placeholder="First Name"
              required={true}
              name="firstname"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              for="MERGE1"
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Last Name"
              required={true}
              for="MERGE2"
              name="lastname"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </label>
          <label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              for="MERGE0"
              onChange={(event) => setEmail(event?.target?.value ?? '')}
              onKeyUp={(event) => handleInputKeyEvent(event)}
            />
          </label>
          <input
            type="submit"
            className={status === 'sending' ? `${Styles.disabled}` : ''}
            disabled={status === 'sending'}
            value={status === 'sending' ? 'Submitting...' : 'Sign Up'}
          />
        </form>
        <div className={Styles.messages}></div>
      </div>
    </div>
  );
}
