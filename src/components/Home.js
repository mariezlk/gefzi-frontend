import { Title, Flex } from '@mantine/core';


function Home() {
    return (
        <Flex w="100vw" align="center" justify="center">
            <Flex w="40vw">
                <Title c="rgb(0,198,178)" ta="center" size={95}>Gemeinsam freie Zeit finden!</Title>
            </Flex>
        </ Flex> 
    );
}

export default Home;