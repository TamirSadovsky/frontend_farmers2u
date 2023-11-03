import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Work({days}) {
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
          <Typography>ימי ושעות עבודה</Typography>
        </AccordionSummary>
          {days.sunday === 'סגור' && days.monday === 'סגור' && days.tuesday === 'סגור' && days.wednesday === 'סגור'
          && days.thursday === 'סגור' && days.friday === 'סגור' && days.saturday === 'סגור'
          ? <AccordionDetails><Typography variant='body2'>טרם עודכנו שעות העבודה</Typography></AccordionDetails>
          :
          <AccordionDetails>
          <Typography variant='body2'>
            ראשון: {days.sunday}
          </Typography>
          <Typography variant='body2'>
          שני: {days.monday}
          </Typography>
          <Typography variant='body2'>
          שלישי: {days.tuesday}
          </Typography>
          <Typography variant='body2'>
          רביעי: {days.wednesday}
          </Typography>
          <Typography variant='body2'>
          חמישי: {days.thursday}
          </Typography>
          <Typography variant='body2'>
          שישי: {days.friday}
          </Typography>
          <Typography variant='body2'>
          שבת: {days.saturday}
          </Typography>
          </AccordionDetails>
          }
      </Accordion>
    </div>
  );
}