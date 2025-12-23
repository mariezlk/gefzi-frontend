import { Title, Flex, Box } from '@mantine/core';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChangeMonth from './ChangeMonth';
import Calendar from './Calendar';
import FreeTimeSlots from './FreeTimeSlots';
import TeamDetailsBtn from './TeamDetailsBtn';

function Gruppenkalender({setUserIdParams, calendar, events, freeSlots, currentYear, setCurrentYear, userList}) {

    const { userId } = useParams()

    const [currentMonth, setCurrentMonth] = useState(11)
    
    useEffect(() => {
        setUserIdParams(userId)
    }, [userId, setUserIdParams])

    return (
        <Flex w="95vw" h="100vh" px={30} pt={30} direction="column" style={{overflowX: "hidden"}}>
            <Flex w="100%" align="center" justify="space-between">
                <Box/>
                <Flex>
                    <CalendarMonthIcon sx={{ fontSize: 45, color: "rgb(0,198,178)", marginRight: "10px"}}/>
                    <Title c="rgb(0,198,178)" size={35}>Gruppenkalender</Title>
                </Flex>
                <TeamDetailsBtn calendar={calendar} userList={userList}/>
            </Flex> 
            <ChangeMonth currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} currentYear={currentYear} 
                         setCurrentYear={setCurrentYear}/>
            {!events || !freeSlots.some((fs) => fs.holiday == true)  ? (
                <Flex h="100%" justify="center" align="center">Lade Kalender…</Flex>
            ):
                <>
                    <Calendar currentMonth={currentMonth} currentYear={currentYear} events={events} 
                              calendar={calendar} freeSlots={freeSlots}/>
                    <FreeTimeSlots calendar={calendar} events={events} freeSlots={freeSlots}/>
                </>
            }
        </Flex> 
    );
}

export default Gruppenkalender;