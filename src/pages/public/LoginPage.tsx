import {  useState } from "react";
import { AppButton, AppForm, AppFormInput, AppModal } from "../../components/app";

export default function LoginPage() {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const validation = [
    (val: string) => val ? false : 'This field is required',
  ]
  return (
    <div className="h-full w-full flex items-center justify-center bg-primary-100">
      <div className="p-3 shadow-lg bg-white">
        <h3 className="text-lg font-semibold text-primary-900">LOGIN</h3>
        <AppForm 
          className="p-3 d-flex flex-col"
        >
          <>
            <AppFormInput
              type="text" 
              label="Username"
              value={username}
              onValueChange={setUsername}
              validations={validation}
            ></AppFormInput>

            <AppFormInput
              color="error"
              label="Password"
              type="password" 
              value={password}
              onValueChange={setPassword}
              validations={validation}
            ></AppFormInput>

            <AppButton type="submit">
              Submit
            </AppButton>
          </>
        </AppForm>

        <AppModal mountToApp>
          asdasd
        </AppModal>
      
      </div>
    </div>
  )
}
