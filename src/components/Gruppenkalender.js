import { Title, Flex, Box, Button } from '@mantine/core';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChangeMonth from './ChangeMonth';
import Calendar from './Calendar';
import FreeTimeSlots from './FreeTimeSlots';
import TeamDetailsBtn from './TeamDetailsBtn';

function Gruppenkalender({setUserIdParams, calendar, events}) {

    const { userId } = useParams()

    const [currentMonth, setCurrentMonth] = useState(0);
    const [currentYear, setCurrentYear] = useState(2025);
    
    useEffect(() => {
        setUserIdParams(userId);
    }, [userId, setUserIdParams]);

    return (
        <Flex w="100vw" h="100vh" px={30} pt={30} direction="column">
            <Flex w="100%" align="center" justify="space-between">
                <Box/>
                <Flex>
                    <CalendarMonthIcon sx={{ fontSize: 45, color: "rgb(0,198,178)", marginRight: "10px"}}/>
                    <Title c="rgb(0,198,178)" size={35}>Gruppenkalender</Title>
                </Flex>
                <TeamDetailsBtn calendar={calendar}/>
            </Flex> 
            <ChangeMonth currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} currentYear={currentYear} setCurrentYear={setCurrentYear}/>
            <Calendar currentMonth={currentMonth} currentYear={currentYear}/>
            <FreeTimeSlots calendar={calendar} events={events}/>
        </Flex> 
    );
}

export default Gruppenkalender;