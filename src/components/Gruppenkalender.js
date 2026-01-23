import { Title, Flex, Box } from '@mantine/core';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChangeMonth from './ChangeMonth';
import Calendar from './Calendar';
import FreeTimeSlots from './FreeTimeSlots';
import TeamDetailsBtn from './TeamDetailsBtn';

function Gruppenkalender({setUserIdParams, calendar, events, freeSlots, currentYear, setCurrentYear, userList, currentMonth, setCurrentMonth}) {

    //setzt userId in App-Komponente um das Laden, des dazugeörigen Users zu ermöglichen
    const { userId } = useParams()

    //Liste mit Monaten, um zwischen diesen wechseln zu können
    const months = [
        {nr: 0,
        name: "Januar"},
        {nr: 1,
        name: "Februar"},
        {nr: 2,
        name: "März"},
        {nr: 3,
        name: "April"},
        {nr: 4,
        name: "Mai"},
        {nr: 5,
        name: "Juni"},
        {nr: 6,
        name: "Juli"},
        {nr: 7,
        name: "August"},
        {nr: 8,
        name: "September"},
        {nr: 9,
        name: "Oktober"},
        {nr: 10,
        name: "November"},
        {nr: 11,
        name: "Dezember"}
    ]
    
    //setzt userId in App-Komponente um das Laden, des dazugeörigen Users zu ermöglichen
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
                         setCurrentYear={setCurrentYear} months={months}/>
            {!events ? (
                <Flex h="100%" justify="center" align="center">Lade Kalender…</Flex>
            ):
                <>
                    <Calendar currentMonth={currentMonth} currentYear={currentYear} events={events} 
                              calendar={calendar} freeSlots={freeSlots}/>
                    <FreeTimeSlots calendar={calendar} events={events} freeSlots={freeSlots} months={months} 
                                   currentMonth={currentMonth}/>
                </>
            }
        </Flex> 
    );
}

export default Gruppenkalender;