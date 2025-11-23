import { Title, Flex, Text, Button } from '@mantine/core';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


function PersoenlicheDaten() {
    return (
        <Flex w="100vw" align="center" justify="center" direction="column">
            <Flex w="100vw" align="center" justify="center">
                <PersonIcon sx={{ fontSize: 45, color: 'rgb(0,198,178)', marginRight: "10px"}}/>
                <Title c="rgb(0,198,178)" size={35}>Persönliche Daten</Title>
            </Flex>  
            <Flex mt={50} p={50} w="37vw" direction="column" style={{ border: "4px solid rgb(0,198,178)", borderRadius: "10px" }}>
                <Flex justify="space-between" mb={15}>
                    <Text c="rgb(0,198,178)" fz="20px">Name:</Text>
                    <Text fz="20px">Mustermann</Text>
                </Flex>
                <Flex justify="space-between" mb={15}>
                    <Text c="rgb(0,198,178)" fz="20px">Vorname:</Text>
                    <Text fz="20px">Max</Text>
                </Flex>
                <Flex justify="space-between" mb={15}>
                    <Text c="rgb(0,198,178)" fz="20px">E-Mail:</Text>
                    <Text fz="20px">max-mustermann@gmail.com</Text>
                </Flex>
                <Flex justify="space-between" mb={15}>
                    <Text c="rgb(0,198,178)" fz="20px">Telefonnummer:</Text>
                    <Text fz="20px">+49 1234 0123456</Text>
                </Flex>
                <Flex justify="space-between" mb={45}>
                    <Text c="rgb(0,198,178)" fz="20px">Gruppenkalender:</Text>
                    <Text fz="20px">Arbeit Team 1</Text>
                </Flex>
                <Flex justify="center">
                    <Button w="10vw" color="rgb(249, 203, 0)" variant="outline" radius={7} fz={16} leftSection={<ExitToAppIcon sx={{ color: "rgb(249, 203, 0)"}} />} style={{ borderWidth: 3 }} >Abmelden</Button>
                </Flex>
            </Flex>
        </ Flex>  
    );
}

export default PersoenlicheDaten;