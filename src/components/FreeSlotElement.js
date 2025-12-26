import { Text, Flex, Box, Modal } from '@mantine/core';
import { useHover, useDisclosure } from '@mantine/hooks';
import NewFreeSlot from "./NewFreeSlot";

function FreeSlotElement({slot, calendar, events, freeSlots}) {

    //Konstante zur Behandlung der Elemente, wenn sie gehovert werden
    const { hovered, ref } = useHover()
    //Konstante zur Behnadlung des Aufrufens des Formulars zum Anlegen neuer Termine
    const [opened, { open, close }] = useDisclosure(false)

    return (
        <>
            <Box ref={ref} component="button" w="100%" h="140%" p={0} bg="transparent" bd="none" onClick={open}>
                <Flex h="100%" px={20} justify="space-between" align="center" bg="white" 
                      style={{border: hovered ? '3px solid rgb(0,198,178)' : '3px solid transparent', borderRadius: "10px", 
                      cursor: "pointer", transition: "border 0.2s ease-in-out"}}> 
                    <Text c={hovered ? 'rgb(0,198,178)' : 'black'} fz="18px" style={{transition: "color 0.2s ease-in-out"}}>
                        {new Date(slot.date).toLocaleDateString("de-DE", { day: "numeric", month: "long" })}
                    </Text> 
                    <Text c={hovered ? 'rgb(0,198,178)' : 'black'} fz="18px" style={{transition: "color 0.2s ease-in-out"}}>
                        {slot?.start} - {slot?.end} Uhr
                    </Text> 
                </Flex> 
            </Box>
            <Modal size="auto" opened={opened} onClose={close} withCloseButton={false} centered 
                   styles={{ content: {border: "7px solid rgb(0,198,178)", borderRadius: 12, padding: 20} }}>
                <NewFreeSlot calendar={calendar} events={events} freeSlots={freeSlots} date={slot.date} 
                             fromTime={slot.start} untilTime={slot.end}/>
            </Modal>
        </>
    );
}

export default FreeSlotElement;