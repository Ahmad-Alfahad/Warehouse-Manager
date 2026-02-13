/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import { Box } from '@mui/material'
import { getEvents } from '@/lib/service/storage';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
export default function LastProcesses() {
    // const lastEvents = JSON.parse(localStorage.getItem('lastEvents') || '[]');
    const [lastEvents, setLastEvents] = useState<{ type: string, message: string }[]>([]);
    useEffect(
        () => {
            setLastEvents(getEvents());
        }
        , [])
       const last = lastEvents.filter(event => event.type !== 'confirmOrder');
    return (

        <Box border={2} borderColor={'gray'} borderRadius={2}  p={2} bgcolor={'background.paper'}>
            <Typography variant="h5" fontWeight={'bold'}>
                Last Processes
            </Typography>
            <Box
                     sx={{
    height: 250,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 1,
    p: 1,

    "&::-webkit-scrollbar": { display: "none" },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }}
            >
                {last.map((event, index) => (
                    <Box key={index} border={'solid 1px gray'} borderRadius={1} p={1} bgcolor={'background.default'} >
                        <Typography variant="h6" >
                            {event.type}: {event.message}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}