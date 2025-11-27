import { Title, Flex, Box, Button } from '@mantine/core';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ChangeMonth from './ChangeMonth';
import Calendar from './Calendar';
import FreeTimeSlots from './FreeTimeSlots';
import TeamDetailsBtn from './TeamDetailsBtn';

function Gruppenkalender({setUserIdParams}) {

    const { userId } = useParams()
    
    useEffect(() => {
        setUserIdParams(userId);
    }, [userId, setUserIdParams]);

    return (
        <Box w="100vw" h="100vh" px={30} pt={30}>
            <Flex w="100%" align="center" justify="space-between">
                <Box/>
                <Flex>
                    <CalendarMonthIcon sx={{ fontSize: 45, color: "rgb(0,198,178)", marginRight: "10px"}}/>
                    <Title c="rgb(0,198,178)" size={35}>Gruppenkalender</Title>
                </Flex>
                <TeamDetailsBtn />
            </Flex> 
            <ChangeMonth />
            <Calendar />
            <FreeTimeSlots />
        </Box> 
    );
}

export default Gruppenkalender;