import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHttpClient } from '@/hooks/http-hook'
import { useForm } from '@/hooks/form-hook'
import { AuthContext } from '@/context/auth-context'
import { Flex } from '@/style/globalWrappers'
import { base_url } from '@/utils'
import ErrorModal from '@/components/UIElements/ErrorModal'
import FormLogin from '@/components/FormElements/FormSignin'
import LeftContainer from '@/components/LeftContainer'

const Signin = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
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

  const { loading, error, sendRequest, clearError } = useHttpClient()

  const loginHandler = async (event) => {
    event.preventDefault()
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

      if (!response.success) {
        toast.error(response.message)
        return
      }

      login(
        response.data.id,
        response.token,
        response.data.email,
        response.data.name
      )
      navigate('/')
    } catch (err) {}
  }

  return (
    <Flex>
      <ErrorModal onClear={clearError} error={error} />
      <LeftContainer />
      <FormLogin
        loginHandler={loginHandler}
        inputHandler={inputHandler}
        loading={loading}
        formState={formState}
      />
    </Flex>
  )
}

export default Signin
