import { Title, Flex, Text } from '@mantine/core';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function Hilfe({setUserIdParams}) {

    const { userId } = useParams()
    
    useEffect(() => {
        setUserIdParams(userId);
    }, [userId, setUserIdParams]);

    return (
        <Flex w="100vw" align="center" justify="center" direction="column">
            <Flex>
                <HelpOutlineIcon sx={{ fontSize: 45, color: 'rgb(0,198,178)', marginRight: "10px"}}/>
                <Title c="rgb(0,198,178)" size={35}>Hilfe</Title>
            </Flex>
            <Flex mt={50} p={60} w="37vw" direction="column" style={{ border: "4px solid rgb(0,198,178)", borderRadius: "10px" }}>
               <Text c="rgb(0,198,178)" fz="20px" mb={30}>
                    Bei Fragen helfen wir Ihnen gerne telefonisch oder per Mail weiter.
                </Text> 
                <Flex mb={30}>
                    <Text w="50%" c="rgb(0,198,178)" fz="20px">E-Mail:</Text>
                    <Text w="50%" fz="20px" ta="left">find-time@outlook.com</Text>
                </Flex>
                <Flex>
                    <Text w="50%" c="rgb(0,198,178)" fz="20px">Telefon:</Text>
                    <Text w="50%" fz="20px">+49 0987 1234567</Text>
                </Flex>
            </Flex>
        </ Flex>  
    );
}

export default Hilfe;