import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinnerOverlay = styled.div`
  display: inline-block;
  
  &::after {
    content: ' ';
    display: block;
    width: 35px;
    height: 35px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid white;
    border-color: white transparent white transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`;