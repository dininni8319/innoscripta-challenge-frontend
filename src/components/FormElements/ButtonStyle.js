import styled from 'styled-components';
import { rem } from 'polished';
import { Button } from '@/style/globalButtons';

export const AuthButton = styled(Button)`
  width: ${rem("300px")};
  height: ${rem("50px")};
  margin-top: 10%;
  background: ${props => props.formIsValid ? "#ccc" : props.theme.purpleColor};
  color: ${props => props.formIsValid ? "#979797" : "white"};
  border: none;
  outline: none;
  padding-top: ${props => props.successBtn ? "5px" : 0};
  font-size:  ${props => props.successBtn ? "14px" : "12px"};

  &:hover {
    background: ${props => props.formIsValid ? "#ccc" : props.theme.LinearGradientHover};
  }
`;