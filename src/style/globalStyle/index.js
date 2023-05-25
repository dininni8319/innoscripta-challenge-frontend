import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      font-size: 16px;
      font-family: "Roboto",serif;
      box-sizing: border-box;
    }
`

export const theme = {
  LinearGradient:
    'linear-gradient(110deg, rgba(196,104,255,0.76), rgba(110,145,246,0.78))',
  LinearGradientHover:
    'linear-gradient(110deg, rgba(201,60,243,0.76), rgba(71,109,226,0.78))',
  BorderBottomInput: 'solid rgba(149,149,149,0.21) 1.5px',
  grayColor: '#F8F8F8',
  purpleColor: 'linear-gradient(132.96deg, #C468FF 3.32%, #6E91F6 100%)',
  // cover: "rgb(255,255,255, 80%)"
  LinearGradient2: "linear-gradient(0deg, rgba(0,0, 0,0.383820564516129) 14%, rgba(0,0,0,0.3) 39%)"
}
