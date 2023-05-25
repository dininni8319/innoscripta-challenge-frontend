import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLogin from '@/components/FormElements/FormSignin';
import { useHttpClient } from "@/hooks/http-hook"
import { useForm } from "@/hooks/form-hook";
import { AuthContext } from "@/context/auth-context";
import ErrorModal from '@/components/UIElements/ErrorModal'
import { AuthLayout } from "@/style/globalWrappers"
import { base_url } from '@/utils'

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)
  const [ formState, inputHandler, setFormData ] = useForm({
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false
    }
  }, false)
  
  const {
    loading,
    error,
    sendRequest,
    clearError,
  } = useHttpClient();
  
  const loginHandler = async event => {
    event.preventDefault();
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
        login(
          response.userName.first_name,
          response.userName.last_name,
          response.token
        );
        navigate("/")
      } catch (err) {  
      } 
  };

  return ( 
    <AuthLayout>
      <ErrorModal onClear={clearError} error={error} />
      <FormLogin 
        loginHandler={loginHandler} 
        inputHandler={inputHandler}
        loading={loading}
        formState={formState}
      />
    </AuthLayout>
  );
}
 
export default Signin;