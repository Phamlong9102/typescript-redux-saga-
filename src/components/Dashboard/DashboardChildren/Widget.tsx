import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

export interface WidgetProps {
    title: string; 
    children: any; 

}

export default function Widget ({title, children}: WidgetProps) {
  return (
   <>
    <Paper sx={{ padding: '16px 16px', border: '1px solid #000'  }}>
        <Typography variant="button">{title}</Typography>
        <Box mt={2}>
            {children}
        </Box>
    </Paper>
   
   
   </>
  );
}
