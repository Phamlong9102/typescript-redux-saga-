import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

export interface StatisticsItemProps {
    icon: React.ReactElement; 
    label: string; 
    value: string | number; 
}

export default function StatisticsItem ({icon, label, value}: StatisticsItemProps) {
  return (
    <>
        <Paper className="flex justify-between items-center	p-2 border-[1px] border-black border-solid ">
            <Box>{icon}</Box>
            <Box>
                <Typography variant="h5" align="right" >{value}</Typography>
                <Typography variant="caption">{label}</Typography>
            </Box>
        </Paper>
    
    
    
    </>
  );
}
