import { useState, useContext } from 'react'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH
} from '@/utils/validators'
import './Auth.css'
import { useForm } from '@/hooks/form-hook'
import { useHttpClient } from '@/hooks/http-hook'
import { base_url } from '@/utils'
import Input from '@/components/FormElements/Input'
import { AuthButton } from '@/components/FormElements/ButtonStyle'
import Card from '@/components/UIElements/Card'
import LoadingSinner from '@/components/UIElements/Loader'
import ErrorModal from '@/components/UIElements/ErrorModal'
import { AuthContext } from '@/context/auth-context';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const { login } = useContext(AuthContext)

  const { loading, error, sendRequest, clearError } = useHttpClient()

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  )

  const loginSubmitHandler = async (event) => {
    event.preventDefault()

    if (isLoginMode) {
      try {
        const response = await sendRequest(
          `${base_url}/users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        )
        login(response?.id, response?.token, response?.email, response?.user)
      } catch (err) {}
    } else {
      try {
        const response = await sendRequest(
          `${api_url.backend}/users/regiter`,
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            password_confirmation: formState.inputs.password_confirmation.value
          }),
          {
            'Content-Type': 'application/json'
          }
        )
        login(response?.id, response?.token, response?.email, response?.name)
      } catch (err) {}
    }
  }

  const switchToSignUp = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          password_confirmation: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.value
      )
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          password_confirmation: {
            value: '',
            isValid: false
          },
        },
        false
      )
    }
    setIsLoginMode((prevMode) => !prevMode)
  }

  return (
    <div className="align-card-auth">
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        <form onSubmit={loginSubmitHandler}>
          {loading && <LoadingSinner asOverlay />}
          <h2>Login Required</h2>
          <hr />
          {!isLoginMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              errorText="Please enter a name."
            />
          )}
          {!isLoginMode && (
            <Input
              id="password_confirmation"
              type="password"
              element="input"
              label="Confirm Password"
              validators={[VALIDATOR_MINLENGTH(8)]}
              onInput={inputHandler}
              errorText="Please enter a valid password (at least 6 characters!)"
            />
          )}

          <Input
            id="email"
            element="input"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
            errorText="Please enter a valid email!"
          />
          <Input
            id="password"
            type="password"
            element="input"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            onInput={inputHandler}
            errorText="Please enter a valid password (at least 6 characters!)"
          />

          <AuthButton type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'REGISTER'}
          </AuthButton>
        </form>

        <AuthButton inverse onClick={switchToSignUp}>
          SWITCH TO REGISTER
        </AuthButton>
      </Card>
    </div>
  )
}

export default Auth
