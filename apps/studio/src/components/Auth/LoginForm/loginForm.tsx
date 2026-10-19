import { Button, Input } from "@blog/ui";
import { Link } from "react-router";
import styles from "./loginForm.module.css"

export default function LoginForm() {
  return (
    <div className={styles.base}>
      <div className="form-header">
        <h1 className="form-title">Login to your account</h1>
        <p className="form-description">Enter your username below to login to your account</p>
      </div>

      <div className="form-group">
        <div className="field">
          <label className={"label"} htmlFor="username">Username</label>

          <Input type="text" id="username" name="username" />
        </div>
        <div className="field">
          <label className={"label"} htmlFor="password">Password</label>
          <Input type="password" id="password" name="password" />
        </div>
        <div className="field">
          <Button>Login</Button>
        </div>
      </div>
      <div className="field">
        <span>
          Don't have an account? <Link to={"auth/register"}> Sign up</Link>
        </span>
      </div>
    </div>
  );
}
