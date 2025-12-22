import { Title, Flex, Text } from '@mantine/core';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function Hilfe({setUserIdParams}) {

    const { userId } = useParams()
    
    useEffect(() => {
        setUserIdParams(userId)
    }, [userId, setUserIdParams])

    return (
        <Flex w="95vw" h="100vh" align="center" justify="center" direction="column">
            <Flex>
                <HelpOutlineIcon sx={{ fontSize: 45, color: 'rgb(0,198,178)', marginRight: "10px"}}/>
                <Title c="rgb(0,198,178)" size={35}>Hilfe</Title>
            </Flex>
            <Flex mt={50} p={50} w="37vw" direction="column" style={{ border: "4px solid rgb(0,198,178)", borderRadius: "10px" }}>
               <Text c="rgb(0,198,178)" fz="20px" mb={30}>
                    Bei Fragen helfen wir Ihnen gerne telefonisch oder per Mail weiter.
                </Text> 
                <Flex mb={30} align="center" direction={{ base: "column", md: "row" }}>
                    <Text w={{ base: "100%", md:"35%", lg: "50%" }} c="rgb(0,198,178)" fz="20px">E-Mail:</Text>
                    <Text w={{ base: "100%", md:"65%", lg: "50%" }} fz={{ base: "15px", lg: "20px"}}>find-time@outlook.com</Text>
                </Flex>
                <Flex align="center" direction={{ base: "column", md: "row" }}>
                    <Text w={{ base: "100%", md:"35%", lg: "50%" }} c="rgb(0,198,178)" fz="20px">Telefon:</Text>
                    <Text w={{ base: "100%", md:"65%", lg: "50%" }} fz={{ base: "15px", lg: "20px"}}>+49 0987 1234567</Text>
                </Flex>
            </Flex>
        </ Flex>  
    );
}

export default Hilfe;