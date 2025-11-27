import { Text, Flex, Box, Button } from '@mantine/core';

function FreeSlotElement({slot}) {

    return (
        <Flex h="140%" justify="space-between" align="center" bg="white" px={20} style={{borderRadius: "10px"}}>
            <Text fz="18px">{slot.date}</Text>
            <Text fz="18px">{slot.time} Uhr</Text>
        </Flex>
    );
}

export default FreeSlotElement;