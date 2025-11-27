import { Title, Flex } from '@mantine/core';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';

function Home({setUserIdParams}) {

    const { userId } = useParams()

    useEffect(() => {
        setUserIdParams(userId);
    }, [userId, setUserIdParams]);

    return (
        <Flex w="100vw" align="center" justify="center">
            <Flex w="40vw">
                <Title c="rgb(0,198,178)" ta="center" fz={{ base: "50px", sm: "70px", md: "95px"}}>Gemeinsam freie Zeit finden!</Title>
            </Flex>
        </ Flex> 
    );
}

export default Home;