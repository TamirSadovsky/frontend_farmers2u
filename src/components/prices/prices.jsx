import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Price({prices}) {
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
          <Typography>מחירון</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body2' sx={{whiteSpace: 'pre-line'}}>{prices? prices : 'טרם פורסם המחירון'}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}