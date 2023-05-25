import Input from '../Input';
import LoadingSpinner from '@/components/UIElements/Loader'
import { AuthButton, FormWrapper, SignUpMessage, FormContainer, TopLoginButton, SingInTitle } from './style';
import { TopTitleWrapper } from '@/style/globalWrappers';
import avatar from "@/assets/svgs/avatar.svg";
import password from "@/assets/svgs/password.svg";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '@/utils/validators';
import { Link } from 'react-router-dom';

const FormLogin = ({ loginHandler, inputHandler, loading, formState }) => {
  
  return ( 
    <FormContainer>
      <TopTitleWrapper>
         <SignUpMessage>Do you have an account?</SignUpMessage>
         <TopLoginButton>
           <Link to="/register">
             SIGN UP
           </Link>
         </TopLoginButton>
      </TopTitleWrapper>
      <FormWrapper onSubmit={loginHandler}>
          <SingInTitle>Sign In</SingInTitle>
          <Input
            id="email"
            type="email"
            label="Email"
            inputElement="input"
            icon={avatar}
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
            errorText="Email required"
          />
          <Input
            id="password"
            type="password"
            label="Password"
            inputElement="input"
            icon={password}
            validators={[VALIDATOR_MINLENGTH(8)]}
            onInput={inputHandler}
            errorText="Please enter a valid password"
          />
          <AuthButton onClick={loginHandler} formIsValid={!formState.isValid} disabled={!formState.isValid}>
            
            {loading ? <LoadingSpinner asOverlay /> : "SIGN IN"}
          </AuthButton>
      </FormWrapper>
    </FormContainer>
   );
}
 
export default FormLogin;