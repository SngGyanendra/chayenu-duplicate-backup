import Styles from "./signup.module.scss";

const SignUp = () => {
  return (
    <div className={Styles.loginContainer}>

      <form className={Styles.loginInput}>
        <div className={Styles.loginText}>Signup to the Newsletter</div>
        <label>
          <input type="text" placeholder="First Name" name="firstname" />
        </label>
        <label>
          <input type="text" placeholder="Last Name" name="lastname" />
        </label>
        <label>
          <input type="email" placeholder="Email" name="email" />
        </label>
        <input type="submit" value="SIGNUP" />
      </form>
    </div>
  );
};

export default SignUp;
