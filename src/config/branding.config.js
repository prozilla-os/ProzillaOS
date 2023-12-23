import { ANSI } from "./apps/terminal.config.js";

export const NAME = "Prozilla OS";
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