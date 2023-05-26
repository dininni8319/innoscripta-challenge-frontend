import Input from '@/components/FormElements/Input'
import LoadingSpinner from '@/components/UIElements/Loader'
import {
  AuthButton,
  FormWrapper,
  SignUpMessage,
  FormContainer,
  TopLoginButton,
  SingInTitle
} from '../FormSignin/style'
import { TopTitleWrapper } from '@/style/globalWrappers'
import email from '@/assets/svgs/email.png'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '@/utils/validators'
import { Link } from 'react-router-dom'

const FormRegister = ({ signupHandler, inputHandler, loading, formState }) => {
  return (
    <FormContainer>
      <TopTitleWrapper>
        <SignUpMessage>You already have an occunt?</SignUpMessage>
        <TopLoginButton>
          <Link to="/login">SIGN IN</Link>
        </TopLoginButton>
      </TopTitleWrapper>
      <FormWrapper onSubmit={signupHandler}>
        {loading && <LoadingSpinner asOverlay />}
        <SingInTitle>Sign Up</SingInTitle>
        <Input
          id="name"
          inputElement="input"
          type="text"
          label="Your Name"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please enter a name."
        />
        <Input
          id="email"
          type="email"
          label="Email"
          inputElement="input"
          email={email}
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
          errorText="Email required"
        />
        <Input
          id="password"
          type="password"
          inputElement="input"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          onInput={inputHandler}
          errorText="Please enter a valid password (at least 6 characters!)"
        />
        <Input
          id="password_confirmation"
          type="password"
          inputElement="input"
          label="Confirm Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          onInput={inputHandler}
          errorText="Please enter a valid password (at least 6 characters!)"
        />
        <AuthButton onClick={signupHandler} formIsValid={!formState?.isValid}>
          {loading ? <LoadingSpinner asOverlay /> : 'SIGN UP'}
        </AuthButton>
      </FormWrapper>
    </FormContainer>
  )
}

export default FormRegister
