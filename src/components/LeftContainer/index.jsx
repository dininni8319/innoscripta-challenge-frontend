import { 
   BottomContainer,
   MainContainer,
   MotionTitle, 
   Slogan, 
   TitleContainer, 
   AppButtons,
   IconContainer,
   Signature,
   SocialButtons
} from './style';

import logo from "@/assets/images/logo_white.png";
import google from "@/assets/svgs/google.svg";
import apple from "@/assets/svgs/apple.svg";
import facebook from '@/assets/svgs/facebook_icon.svg';
import instagram from '@/assets/svgs/instagram_icon.svg';
import twitter from '@/assets/svgs/twitter_icon.svg';
import { Icon } from '@/style/globalIcons';

const LeftContainer = () => {
  return ( 
    <MainContainer>
      <TitleContainer>
            <img src={logo} alt="Motion logo" />
            <MotionTitle>Motion</MotionTitle>
            <Slogan>Connect with friends and the world around you with Motion</Slogan>
            <IconContainer>
               <AppButtons>
                  <Icon src={google} alt="Google logo" />
               </AppButtons>
               <AppButtons>
                  <Icon src={apple} alt="Apple logo" />
               </AppButtons>
            </IconContainer>
      </TitleContainer>
      <BottomContainer>
            <IconContainer>
               <SocialButtons src={facebook}></SocialButtons>
               <SocialButtons src={twitter}></SocialButtons>
               <SocialButtons src={instagram}></SocialButtons>
            </IconContainer>
            <Signature>© Motion 2018. All right reserved</Signature>
      </BottomContainer>
    </MainContainer>
   );
}

export default LeftContainer;