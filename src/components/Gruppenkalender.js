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

    const [currentMonth, setCurrentMonth] = useState(11);
    const [currentYear, setCurrentYear] = useState(2025);
    const [freeTimeSlotList, setFreeTimeSlotList] = useState([]);
    const [holiday, setHoliday] = useState([])

    useEffect(() => {
        fetch(`https://get.api-feiertage.de?years=${currentYear}&all_states=true`) 
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setHoliday(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [currentYear]);
    
    useEffect(() => {
        setUserIdParams(userId);
    }, [userId, setUserIdParams]);

    return (
        <Flex w="95vw" h="100vh" px={30} pt={30} direction="column" style={{overflowX: "hidden"}}>
            <Flex w="100%" align="center" justify="space-between">
                <Box/>
                <Flex>
                    <CalendarMonthIcon sx={{ fontSize: 45, color: "rgb(0,198,178)", marginRight: "10px"}}/>
                    <Title c="rgb(0,198,178)" size={35}>Gruppenkalender</Title>
                </Flex>
                <TeamDetailsBtn calendar={calendar}/>
            </Flex> 
            <ChangeMonth currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} currentYear={currentYear} setCurrentYear={setCurrentYear}/>
            <Calendar currentMonth={currentMonth} currentYear={currentYear} events={events} holiday={holiday} calendar={calendar} freeTimeSlotList={freeTimeSlotList} setFreeTimeSlotList={setFreeTimeSlotList}/>
            <FreeTimeSlots calendar={calendar} events={events} freeTimeSlotList={freeTimeSlotList}/>
        </Flex> 
    );
}

export default Gruppenkalender;