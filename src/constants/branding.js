import { ANSI } from "./applications/terminal.js";

export const NAME = "ProzillaOS";

export const ASCII_LOGO = `
              :.           
             -==.          
           .=====:         
   ---::..:=======-.       
   :===+=----------::..    
    =+=---------------:..  
    --------------------:. 
.:-+=----*###*--*####=---. 
:==+----#%+-+%#-##%*+----:.
  .=----#%+-+%#-*+-%#+---:.
   ==----*###*--*###*----. 
  ==+-------------------:. 
  ...::---------------:.   
       .::---------::..    
          ....::...        `;

export const ANSI_LOGO_COLOR = ANSI.fg.green;
export const ANSI_ASCII_LOGO = `
              :.           
             -==.          
           .=====:         
   ---::..:=======-.       
   :===+=----------::..    
    =+=---------------:..  
    --------------------:. 
.:-+=----${ANSI.fg.white}*###*${ANSI_LOGO_COLOR}--${ANSI.fg.white}*####=${ANSI_LOGO_COLOR}---. 
:==+----${ANSI.fg.white}#%+${ANSI_LOGO_COLOR}-${ANSI.fg.white}+%#${ANSI_LOGO_COLOR}-${ANSI.fg.white}##%*+${ANSI_LOGO_COLOR}----:.
  .=----${ANSI.fg.white}#%+${ANSI_LOGO_COLOR}-${ANSI.fg.white}+%#${ANSI_LOGO_COLOR}-${ANSI.fg.white}*+${ANSI_LOGO_COLOR}-${ANSI.fg.white}%#+${ANSI_LOGO_COLOR}---:.
   ==----${ANSI.fg.white}*###*${ANSI_LOGO_COLOR}--${ANSI.fg.white}*###*${ANSI_LOGO_COLOR}----. 
  ==+-------------------:. 
  ...::---------------:.   
       .::---------::..    
          ....::...        `;