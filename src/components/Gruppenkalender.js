import { Title, Flex } from '@mantine/core';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function Gruppenkalender({setUserIdParams}) {

    const { userId } = useParams()
    
    useEffect(() => {
        setUserIdParams(userId);
    }, [userId, setUserIdParams]);

    return (
        <Flex w="100vw" align="center" justify="center">
            <CalendarMonthIcon sx={{ fontSize: 45, color: "rgb(0,198,178)", marginRight: "10px"}}/>
            <Title c="rgb(0,198,178)" size={35}>Gruppenkalender</Title>
        </Flex>  
    );
}

export default Gruppenkalender;