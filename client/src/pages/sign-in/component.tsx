import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import InputField from "../../components/input-field";
import PasswordField from "../../components/password-field";
import { useFormManager, usePost } from "../../hooks";
import notification from "../../components/alert"
import { useSetAuthConfigData } from "../../context/auth"
import { validate } from "./constants";

const SignInPage = () => {
  const navigate = useNavigate()
  const { handlePost } = usePost({
    apiId: "POST_LOG_IN_USER"
  })
  const setAuthConfigData = useSetAuthConfigData()


  const handleSubmit = () => {
    handlePost({
      data: {
        user_name,
        password
      },
      cb: (({ error, response, hasError }) => {
        notification(hasError ? "error" : "success", error?.message || "Error with log in")
        if (!hasError) {
          setAuthConfigData(response)
          navigate(response?.default_page || "/home")
        }
      })
    })
  }

  const { values: { user_name, password }, handleChange, errors, submit } = useFormManager({
    initialValues: {},
    onSubmit: handleSubmit,
    validate
  })

  return (
    <div className="w-full h-screen bg-slate-900 shadow-lg flex justify-center items-center">
      <div className="flex justify-center items-center w-1/4 bg-slate-100 rounded-md px-6 flex-col gap-4 py-14">
        <img src="/logo.png" alt="" width={100} className="border-4 rounded-full " />
        <h1 className="text-3xl font-bold">ERP System</h1>
        <p>Welcome, please sign in</p>
        <div className="flex flex-col gap-3 w-4/5">
          <InputField
            label="User name"
            variant="standard"
            required
            name="user_name"
            value={user_name}
            handleChange={handleChange}
            error={errors.user_name}
            helperText={errors.user_name}
          />
          <PasswordField
            id="standard-basic"
            name="password"
            label="Password"
            variant="standard"
            error={errors.password}
            helperText={errors.password}
            required
            value={password}
            handleChange={handleChange}
          />
        </div>
        <Button variant="contained" className="mt-8 bg-orange-500" onClick={submit}>Log In</Button>
      </div>
    </div>
  );
};

export default memo(SignInPage);
