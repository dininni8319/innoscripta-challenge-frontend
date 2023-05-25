import styled from 'styled-components'
import { Title, Message } from '@/style/globalTitles'
import { Button } from '@/style/globalButtons'
import { rem } from 'polished'

export const FormContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: ${(props) => (props.formWrap ? 'flex-wrap' : 'flex')};
  flex-direction: ${(props) => (props.formWrap ? 'row' : 'column')};
`

export const FormWrapper = styled.form`
  min-height: 60%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`

export const SignUpMessage = styled(Message)`
  margin-right: ${rem('15px')};
`

export const SingInTitle = styled(Title)`
  margin-bottom: ${rem('40px')};
  text-align: center;
  font-weight: ${(props) => (props.weight ? '400' : '300')};
`

export const AuthButton = styled(Button)`
  width: ${rem('300px')};
  height: ${rem('50px')};
  margin-top: 10%;
  background: ${(props) =>
    props.formIsValid ? '#ccc' : props.theme.purpleColor};
  color: ${(props) => (props.formIsValid ? '#979797' : 'white')};
  border: none;
  outline: none;
  padding-top: ${(props) => (props.successBtn ? '5px' : 0)};
  font-size: ${(props) => (props.successBtn ? '14px' : '12px')};

  &:hover {
    background: ${(props) =>
      props.formIsValid ? '#ccc' : props.theme.LinearGradientHover};
  }
`

export const TopLoginButton = styled(Button)`
  background-color: white;

  &:hover {
    transition: 0.3s;
    background: ${(props) => props.theme.grayColor};
  }
`
