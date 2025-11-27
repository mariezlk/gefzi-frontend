import { Title, Flex, Box, Button } from '@mantine/core';
import NewFreeSlotBtn from './NewFreeSlotBtn';

function FreeTimeSlots() {

    return (
        <Flex mx={-30} px={30} py={5} h="21.8%" bg="#F5F5F5">
            <Flex w="100%" justify="space-between">
                <Title c="rgb(0,198,178)" size={20} mt={5}>freie Zeiträume</Title>
                <NewFreeSlotBtn />
            </Flex> 
        </Flex> 
    );
}

export default FreeTimeSlots;