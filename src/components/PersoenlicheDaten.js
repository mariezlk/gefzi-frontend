import { Title, Flex, Text, Button } from '@mantine/core';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function PersoenlicheDaten({setUserIdParams, user, calendar}) {

    const navigate = useNavigate();
    const { userId } = useParams()

    useEffect(() => {
        setUserIdParams(userId);
    }, [userId, setUserIdParams]);

    return (
        <Flex w="100vw" align="center" justify="center" direction="column">
            <Flex w="100%" align="center" justify="center">
                <PersonIcon sx={{ fontSize: 45, color: 'rgb(0,198,178)', marginRight: "10px"}}/>
                <Title c="rgb(0,198,178)" size={35}>Persönliche Daten</Title>
            </Flex>  
            <Flex mt={50} p={50} w="37vw" direction="column" style={{ border: "4px solid rgb(0,198,178)", borderRadius: "10px" }}>
                <Flex mb={15}>
                    <Text w="42%" c="rgb(0,198,178)" fz="20px">Name:</Text>
                    <Text w="58%" fz="20px">{user?.lastName}</Text>
                </Flex>
                <Flex justify="space-between" mb={15}>
                    <Text w="42%" c="rgb(0,198,178)" fz="20px">Vorname:</Text>
                    <Text w="58%" fz="20px">{user?.firstName}</Text>
                </Flex>
                <Flex justify="space-between" mb={15}>
                    <Text w="42%" c="rgb(0,198,178)" fz="20px">E-Mail:</Text>
                    <Text w="58%" fz="20px">{user?.email}</Text>
                </Flex>
                <Flex justify="space-between" mb={15}>
                    <Text w="42%" c="rgb(0,198,178)" fz="20px">Telefonnummer:</Text>
                    <Text w="58%" fz="20px">{user?.phone}</Text>
                </Flex>
                <Flex justify="space-between" mb={45}>
                    <Text w="42%" c="rgb(0,198,178)" fz="20px">Gruppenkalender:</Text>
                    <Text w="58%" fz="20px">{calendar?.name}</Text>
                </Flex>
                <Flex justify="center">
                    <Button w="10vw" color="rgb(249, 203, 0)" variant="outline" radius={7} fz={16} onClick={() => navigate("/login")} leftSection={<ExitToAppIcon sx={{ color: "rgb(249, 203, 0)"}} />} style={{ borderWidth: 3 }} >Abmelden</Button>
                </Flex>
            </Flex>
        </ Flex>  
    );
}

export default PersoenlicheDaten;