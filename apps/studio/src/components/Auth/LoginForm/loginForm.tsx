import { Button, Input } from "@blog/ui";
import { Link } from "react-router";
import styles from "./loginForm.module.css";
import { useAuth } from "@blog/features";
import { ZLoginUser, type TLoginUser } from "@blog/lib";

export default function LoginForm() {
  const { login } = useAuth();

  // generic handleSubmit
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // get data

    const data = Object.fromEntries(formData.entries()) as TLoginUser;

    // validate with zod
    const result = ZLoginUser.safeParse(data);

    if (!result.success) {
      return console.error(result.error);
    }
    console.log("is successful: ", result);
    console.log("sending data:", result.data);
    // send req
    await login(result.data);
  };
  return (
    <form className={styles.base} onSubmit={handleSubmit}>
      <div className="form-header">
        <h1 className="form-title">Login to your account</h1>
        <p className="form-description">
          Enter your username below to login to your account
        </p>
      </div>

      <div className="form-groups">
        <div className="field">
          <label className={"label"} htmlFor="username">
            Username
          </label>

          <Input type="text" id="username" name="username" />
        </div>
        <div className="field">
          <label className={"label"} htmlFor="pwd">
            Password
          </label>
          <Input type="password" id="pwd" name="pwd" />
        </div>
        <div className="field">
          <Button type="submit">Login</Button>
        </div>
      </div>
      <div className="field">
        <span>
          Don't have an account? <Link to={"/register"}> Sign up</Link>
        </span>
      </div>
    </form>
  );
}
