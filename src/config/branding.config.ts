import { ANSI } from "./apps/terminal.config";

export const NAME = "ProzillaOS";
export const TAG_LINE = "Web-based Operating System";

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

export const ANSI_LOGO_COLOR = ANSI.fg.cyan;
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