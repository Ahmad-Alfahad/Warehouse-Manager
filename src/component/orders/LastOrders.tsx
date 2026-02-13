'use client';
import { Box, Typography , Card} from "@mui/material";
import { getEvents } from '@/lib/service/storage';
import { useEffect, useState } from 'react';
export default function LastOrders() {
    const [lastEvents, setLastEvents] = useState<{ type: string, message: string }[]>([]);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLastEvents(getEvents());
    }, []);
    const last = lastEvents.filter(event => event.type === 'confirmOrder');
    return (
        <Box>
        <Box border={2} borderColor={'gray'} borderRadius={2}  p={2} bgcolor={'background.paper'}>
         <Typography variant="h5" fontWeight={'bold'} textAlign={'center'} >
                Last Orders
            </Typography>

            <Box 
               sx={{
    height: 300,
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
                     
                        <Typography variant="h6">
                            {event.type}: {event.message}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
        </Box>
    )
}