import { Flex, Button, Text } from '@mantine/core';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useState } from 'react';

function ChangeMonth({currentMonth, setCurrentMonth, currentYear, setCurrentYear}) {

    const months = [
        {nr: 0,
        name: "Januar",
        days: "31"},
        {nr: 1,
        name: "Februar",
        days: "30"},
        {nr: 2,
        name: "März",
        days: "31"},
        {nr: 3,
        name: "April",
        days: "28"},
        {nr: 4,
        name: "Mai",
        days: "31"},
        {nr: 5,
        name: "Juni",
        days: "30"},
        {nr: 6,
        name: "Juli",
        days: "31"},
        {nr: 7,
        name: "August",
        days: "31"},
        {nr: 8,
        name: "September",
        days: "30"},
        {nr: 9,
        name: "Oktober",
        days: "31"},
        {nr: 10,
        name: "November",
        days: "30"},
        {nr: 11,
        name: "Dezember",
        days: "31"}
    ]

    function changeMonth (changeOperator) {

        if(changeOperator == "+"){
            if(currentMonth < 11){
                return setCurrentMonth(currentMonth + 1)
            }
            setCurrentMonth(0)  
            setCurrentYear(currentYear + 1)
        }
        if(changeOperator == "-"){
            if(currentMonth > 0){
                return setCurrentMonth(currentMonth - 1)
            }
            setCurrentMonth(11)  
            setCurrentYear(currentYear - 1)
        }

    }

    return (
        <Flex align="center" ml={20} mt={5}>
            <Button c="rgb(1,1,1)" p={5} variant="transparent" onClick={() => changeMonth("-")}><ArrowBackIosNewIcon sx={{ height: "15px", marginRight: "5px" }}/></Button>
            <Text w="10vw" align="center" fz={20}>{months.find((month) => month.nr == currentMonth).name} {currentYear}</Text>
            <Button c="rgb(1,1,1)" p={5} variant="transparent" onClick={() => changeMonth("+")}><ArrowForwardIosIcon sx={{ height: "15px", marginLeft: "5px" }}/></Button>
        </Flex> 
    );
}

export default ChangeMonth;