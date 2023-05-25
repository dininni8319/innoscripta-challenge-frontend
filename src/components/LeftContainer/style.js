import styled from "styled-components";
import backgroundImg from '@/assets/images/background_image.png';
import { Title } from "@/style/globalTitles";
import { Icon } from '@/style/globalIcons';
import { Button } from '@/style/globalButtons'


export const MainContainer = styled.div`
  width: 40%;
  height: 100vh;
  box-sizing: border-box;
  margin-bottom: 0px;
  background: ${props => props.theme.LinearGradient}, url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover;

  @media screen and (max-width: 700px) {
    display: none
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

export const MotionTitle = styled(Title)`
  font-size: 28px;
  font-weight: 400;
  letter-spacing: 0.8px;
  color: white;
  opacity: 0.6;
  margin-top: 4%;
  text-align: center;
`;

export const Slogan = styled(Title)`
  color: rgba(255, 255, 255, 0.82);
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.2px;
  text-align: center;
`;

export const BottomContainer = styled.div`
  height: 34%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const IconContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 15px;
  justify-content: center;
  align-items: center;
  margin: 5% 0;
`;

export const AppButtons = styled(Button)`
  border: 1px solid rgba(255, 255, 255, 0.22);

  &:hover {
   transition: 0.3s;
   background-color: rgba(255, 255, 255, 0.22);
  }
`;

export const Signature = styled(Title)`
  color: rgba(255, 255, 255, 0.98); 
  font-size: 12px;
  font-weight: 400;
  `;

export const SocialButtons = styled(Icon)`
  height: 40px;
  width: 40px;
  margin-top: 10%;
  cursor: pointer;
`;