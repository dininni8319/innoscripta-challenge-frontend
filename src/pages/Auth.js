import { useState, useContext } from 'react'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH
} from '@/util/validators'
import './Auth.css'
import Input from '@/components/FormElements/Input'
import Button from '@/components/FormElements/Button'
import { useForm } from '@/hooks/form-hook'
import Card from '@/components/UIElements/Card'
import LoadingSinner from '@/components/UIElements/LoadingSpinner'
import ErrorModal from '@/components/UIElements/ErrorModal'
import { useHttpClient } from '@/hooks/http-hook'
import ImageUpload from '@/components/FormElements/ImageUpload'
import { base_url } from '@/utils'

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
        // here we are formatting the data like multipart/form-data
        // because the image is in binary format, json will not work
        const formData = new FormData()
        formData.append('email', formState.inputs.email.value)
        formData.append('name', formState.inputs.name.value)
        formData.append('password', formState.inputs.password.value)
        formData.append('image', formState.inputs.image.value)
        const response = await sendRequest(
          `${api_url.backend}/user/signup`,
          'POST',
          formData
        )
        login(response?.id, response?.token, response?.email, response?.user)
      } catch (err) {}
    }
  }

  const switchToSignUp = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
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
          image: {
            value: {
              value: null,
              isValid: false
            }
          }
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
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please provide a valid image"
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
            errorText="Please enter a valid password (at least 8 characters!)"
          />

          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>

        <Button inverse onClick={switchToSignUp}>
          SWITCH TO SIGNUP
        </Button>
      </Card>
    </div>
  )
}

export default Auth