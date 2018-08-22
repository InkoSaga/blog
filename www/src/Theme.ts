import * as colors from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import generateAcrylicTexture from './utils/generateAcrylicTexture';
import { isMobile } from 'is-mobile';

export const defaultTheme = createMuiTheme();

export const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: colors.blueGrey,
        action: {
            hover: '#0078D7'
        }
    }
});


const chromeLow = "#171717";
const chromeMediumLow = "#2b2b2b";
const chromeMedium = "#1f1f1f";
const chromeHigh ="#767676";

const baseBackground = '/assets/background.png';

export let background = {
    acrylic0: `url(${baseBackground}) left top / 100% 100% no-repeat fixed`,
    acrylic20: `url(${baseBackground}) left top / 100% 100% no-repeat fixed`,
    acrylic40: `url(${baseBackground}) left top / 100% 100% no-repeat fixed`,
    acrylic60: `url(${baseBackground}) left top / 100% 100% no-repeat fixed`,
    acrylic80: `url(${baseBackground}) left top / 100% 100% no-repeat fixed`,
    acrylic90: `url(${baseBackground}) left top / 100% 100% no-repeat fixed`,
};

export async function prepareBackground() {
    if(isMobile()) {
        background.acrylic20 = 'rgba(0,0,0,0.2)';
        background.acrylic40 = 'rgba(0,0,0,0.4)';
        background.acrylic60 = 'rgba(0,0,0,0.6)';
        background.acrylic80 = 'rgba(0,0,0,0.8)';
        background.acrylic90 = 'rgba(0,0,0,0.9)';
    } else {
        background.acrylic20 = `url(${await generateAcrylicTexture(baseBackground, chromeLow,0.2, 3)}) no-repeat fixed top left / 100% 100%`;
        background.acrylic40 = `url(${await generateAcrylicTexture(baseBackground, chromeMediumLow,0.4)}) no-repeat fixed top left / 100% 100%`;
        background.acrylic60 = `url(${await generateAcrylicTexture(baseBackground, chromeLow,0.6)}) no-repeat fixed top left / 100% 100%`;
        background.acrylic80 = `url(${await generateAcrylicTexture(baseBackground, chromeLow,0.8)}) no-repeat fixed top left / 100% 100%`;
        background.acrylic90 = `url(${await generateAcrylicTexture(baseBackground, chromeLow,0.9)}) no-repeat fixed top left / 100% 100%`;
    }
    
}
