import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Shipping({policy}) {
  return (
    <div>
      <Accordion sx={{
        position: 'relative',
        width: '100%',
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          dir='rtl'
        >
          <Typography>מדיניות משלוחים והזמנות</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body2' sx={{whiteSpace: 'pre-line'}}>{policy? policy : "טרם פורסמה מדיניות משלוחים והזמנות"}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}