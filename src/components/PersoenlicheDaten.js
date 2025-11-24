import { Title, Flex, Text, Button } from '@mantine/core';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PersoenlicheDaten({user}) {

    const navigate = useNavigate();
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/user') 
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    console.log(data)

    return (
        <Flex w="100vw" align="center" justify="center" direction="column">
            <Flex w="100%" align="center" justify="center">
                <PersonIcon sx={{ fontSize: 45, color: 'rgb(0,198,178)', marginRight: "10px"}}/>
                <Title c="rgb(0,198,178)" size={35}>Persönliche Daten</Title>
            </Flex>  
            <Flex mt={50} p={50} w="37vw" direction="column" style={{ border: "4px solid rgb(0,198,178)", borderRadius: "10px" }}>
                <Flex justify="space-between" mb={15}>
                    <Text c="rgb(0,198,178)" fz="20px">Name:</Text>
                    <Text fz="20px">{user?.lastName}</Text>
                </Flex>
                <Flex justify="space-between" mb={15}>
                    <Text c="rgb(0,198,178)" fz="20px">Vorname:</Text>
                    <Text fz="20px">{user?.firstName}</Text>
                </Flex>
                <Flex justify="space-between" mb={15}>
                    <Text c="rgb(0,198,178)" fz="20px">E-Mail:</Text>
                    <Text fz="20px">{user?.email}</Text>
                </Flex>
                <Flex justify="space-between" mb={15}>
                    <Text c="rgb(0,198,178)" fz="20px">Telefonnummer:</Text>
                    <Text fz="20px">{user?.phone}</Text>
                </Flex>
                <Flex justify="space-between" mb={45}>
                    <Text c="rgb(0,198,178)" fz="20px">Gruppenkalender:</Text>
                    <Text fz="20px">Arbeit Team 1</Text>
                </Flex>
                <Flex justify="center">
                    <Button w="10vw" color="rgb(249, 203, 0)" variant="outline" radius={7} fz={16} onClick={() => navigate("/login")} leftSection={<ExitToAppIcon sx={{ color: "rgb(249, 203, 0)"}} />} style={{ borderWidth: 3 }} >Abmelden</Button>
                </Flex>
            </Flex>
        </ Flex>  
    );
}

export default PersoenlicheDaten;