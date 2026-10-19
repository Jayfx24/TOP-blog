import { Button, Input } from "@blog/ui";
import { Link } from "react-router";

export default function LoginForm() {
  return (
    <div className="">
      <div className="">
        <h1>Create to your account</h1>
        <span>Fill in the form below to create your account</span>
      </div>

      <div className="form-group">
        <div className="field">
          <label htmlFor="firstName">First-Name</label>
          <Input type="text" id="firstName" name="firstName" />
        </div>
        <div className="field">
          <label htmlFor="lastName">Last-Name</label>
          <Input type="text" id="lastName" name="lastName" />
        </div>
        <div className="field">
          <label htmlFor="username">Username</label>
          <Input type="text" id="username" name="username" />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <Input type="password" id="password" name="password" />
        </div>
        <div className="field">
          <label htmlFor="cpwd">cpwd</label>
          <Input type="passport" id="cpwd" name="cpwd " />
        </div>

        <div className="field">
          <Button>Create Account</Button>
        </div>
      </div>
      <div className="field">
        <span>
          Have have an account? <Link to={"auth/login"}> Sign In</Link>
        </span>
      </div>
    </div>
  );
}
