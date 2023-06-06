import { AppButton, AppCard, AppForm, AppFormCheckbox, AppFormError, AppFormInput, AppTooltip } from "@/components/app";
import { Users } from "@/services";
import { AxiosError } from "axios";
import { useState } from "react";

export default function Login() {
  // Data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');


  // Login Function
  async function loginUser(errors?: string[]) {
    if (errors?.length) return;
    setLoading(true);
    setError('');
    try {
      const response = await Users.login({ 
        email, 
        password,
        remember: isRemember, 
      });
      const loggedUser = response.data.success.data;
      // authStore.setUser(loggedUser)
      
      setSuccess(true);
      alert('Login Success: Dashboard Page Under Maintenance')
      // router.push({ name: 'DashboardHome' })
    } catch (e) {

      console.error('Login: Something went wrong', e);
      const err = (e as AxiosError<{ error: { message: string } }>).response?.data.error
      setError(err?.message || '');
    }
    setLoading(false);
  }

  return (
    <div 
      className="
        h-full w-full
        flex flex-col md:flex-row
      "
    >
    
    
      {/* Login Card Column */}
      <div 
        className="
          order-2 md:order-1 
          flex-grow
          p-5 
          bg-secondary-50
          md:w-1/2 
          flex items-center justify-center
        "
      >
        <AppCard className="login-card p-4 lg:px-10">
        <h1 className="text-3xl font-bold text-primary-500">
            <span>Login</span> 
            <AppTooltip
              className="ml-3"
              tooltipText="email: test@email.com | password: pass123"
            ></AppTooltip>
          </h1>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>


          <AppForm 
            className="mt-6 flex flex-col gap-2"
            onSubmit={ loginUser }
          >
            <AppFormInput
              value={ email }
              onValueChange={ setEmail }
              disabled={ loading }
              label="Email"
              name="Email"
              placeholder="username_1@email.com"
              validations="required | email"
            ></AppFormInput>

            <AppFormInput
              value={ password }
              onValueChange={ setPassword }
              disabled={ loading }
              name="Password"
              type="password"
              label="Password"
              placeholder="******"
              validations="required"
            ></AppFormInput>


            <div 
              className="
                mt-5 
                flex flex-col md:flex-row 
                items-end md:items-center justify-between

              "
            >
              {/* Remember Checkbox */}
              <AppFormCheckbox
                value={ isRemember }
                onValueChange={ setIsRemember }
                label="Remember Me"
                toggleInput
                className="flex-shrink-0"
              ></AppFormCheckbox>

              {/* Actions Buttons */}
              <div 
                className="
                  md:ml-auto mt-8 md:mt-0 
                  flex justify-center items-center
                "
              >
                {/* Signup Button */}
                <AppButton
                  variant="text"
                  className="mr-1"
                  disabled={ loading }
                  // :to="{ name: 'SignUp' }"
                >
                  Sign up
                </AppButton>

                {/* Submit Button */}
                <AppButton
                  className="px-7"
                  type="submit"
                  loading={ loading }
                >
                  Login
                </AppButton>
              </div>
            </div>

            <AppFormError aria-label="form-error">
              { error }
            </AppFormError>

          </AppForm>
        </AppCard>
      </div>

      {/* Brand Column */}
      <div 
        className="
          order-1 md:order-2
          p-5
          bg-primary-500 md:flex-grow
          flex flex-col items-center justify-center
          bg-gradient-to-br 
          from-primary-500  
          to-secondary-600
        "
      >
        <h1 className="uppercase drop-shadow-lg text-center text-2xl md:text-4xl text-white font-semibold">
          Do It Yourself
        </h1>
        <p className="hidden md:block mt-5 text-lg text-primary-100">
          Sample Dashboard for React 18 Component Kits
        </p>
      </div>
  </div>
  )
}
