import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import LeftContainer from '@/components/LeftContainer'
import FormSignUp from '@/components/FormElements/FormSignUp'
import { useHttpClient } from '@/hooks/http-hook'
import { useForm } from '@/hooks/form-hook'
import { AuthContext } from '@/context/auth-context'
import { Flex } from '@/style/globalWrappers'
import { base_url } from '@/utils'
import ErrorModal from '@/components/UIElements/ErrorModal'

const Signup = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const [message, setMessage] = useState('')
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      name: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      },
      password_confirmation: {
        value: '',
        isValid: false
      }
    },
    false
  )

  const { loading, error, sendRequest, clearError } = useHttpClient()
  const { password, password_confirmation } = formState.inputs

  const signupHandler = async (event) => {
    event.preventDefault()

    if (password.value !== password_confirmation.value) {
      alert('The passwords are not the same')
      return
    }

    const response = await sendRequest(
      `${base_url}/users/register`,
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
    if (!response.success) {
      setMessage(response.message)
      return
    }

    let resp = await sendRequest(
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
    if (!resp.success) {
      setMessage(resp.message)
      return
    }
    login(resp.data.id, resp.token, resp.data.email, resp.data.name)
    navigate('/')
  }

  return (
    <Flex>
      <ErrorModal onClear={clearError} error={error || message} />
      <LeftContainer />
      <FormSignUp
        signupHandler={signupHandler}
        inputHandler={inputHandler}
        loading={loading}
        formState={formState}
      />
    </Flex>
  )
}

export default Signup
