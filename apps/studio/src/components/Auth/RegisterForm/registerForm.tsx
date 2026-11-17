import { ZLoginUser } from "@blog/lib";
import { Button, Input } from "@blog/ui";
import { Link } from "react-router";

// TODO: Registration form
export default function RegisterForm() {
//   const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     // get data

//     const data = Object.fromEntries(formData.entries()) as TLoginUser;

//     // validate with zod
//     const result = ZLoginUser.safeParse(data);

//     if (!result.success) {
//       return console.error(result.error);
//     }
//     console.log("is successful: ", result);
//     console.log("sending data:", result.data);
//     // send req
//     await login(result.data);
//   };
  return (
    <form className="form-group">
      <div className="form-header">
        <h1 className="form-title">Create to your account</h1>
        <span className="form-description">
          Fill in the form below to create your account
        </span>
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
          <Button type="submit">Create Account</Button>
        </div>
      </div>
      <div className="field">
        <span>
          Have have an account? <Link to={"/login"}> Sign In</Link>
        </span>
      </div>
    </form>
  );
}
