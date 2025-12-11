import { Text, Flex } from '@mantine/core';

function FreeSlotElement({slot}) {

    return (
        <Flex h="140%" justify="space-between" align="center" bg="white" px={20} style={{borderRadius: "10px"}}>
            <Text fz="18px">{new Date(slot.date).toLocaleDateString("de-DE", { day: "numeric", month: "long" })}</Text>
            <Text fz="18px">{slot?.start} - {slot?.end} Uhr</Text>
        </Flex>
    );
}

export default FreeSlotElement;