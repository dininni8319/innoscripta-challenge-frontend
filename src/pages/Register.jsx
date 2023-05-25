import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftContainer from '@/components/LeftContainer'
import FormSignUp from '@/components/FormElements/FormSignUp'
import { useHttpClient } from "@/hooks/http-hook"
import { useForm } from "@/hooks/form-hook";

import ErrorModal from '@/components/UIElements/ErrorModal'
import { AuthLayout } from "@/style/globalWrappers"
import { base_url } from "@/utils";

const Signup = () => {
  const navigate = useNavigate();
  
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
        value: "",
        isValid: false
      },
      password_confirmation: {
        value: '',
        isValid: false
      }
    },
    false
  )
  
  const {
    loading,
    error,
    sendRequest,
    clearError,
  } = useHttpClient();
  const { password, password_confirmation } = formState.inputs

  const signupHandler = async event => {
    event.preventDefault();

      if (password.value !== password_confirmation.value) {
        alert("The passwords are not the same")
        return
      }

      let response;
      try {
        response = await sendRequest(
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
      } catch (err) { 
      }
      if (response) {
        const user = localStorage.setItem("email", formState.inputs.email.value);
        
        navigate("/");
      }
  };

  return ( 
    <AuthLayout>
      <ErrorModal onClear={clearError} error={error} />
      <LeftContainer/>
      <FormSignUp 
         signupHandler={signupHandler}
         inputHandler={inputHandler}
         loading={loading}
         formState={formState}
      />
    </AuthLayout>
  );
}
 
export default Signup;