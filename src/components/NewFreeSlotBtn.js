import { Button, Popover, Modal, Flex } from '@mantine/core';
import AddIcon from '@mui/icons-material/Add';
import { useDisclosure } from '@mantine/hooks';
import NewFreeSlot from "./NewFreeSlot";

function NewFreeSlotBtn({calendar, events, freeSlots}) {

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Button px={15} color="rgb(249, 203, 0)" variant="outline" radius={7} fz={16} leftSection={<AddIcon sx={{ color: "rgb(249, 203, 0)"}} />} style={{ borderWidth: 3 }} onClick={open}>Termin hinzufügen</Button>
            <Modal size="auto" opened={opened} onClose={close} withCloseButton={false} centered styles={{ content: {border: "7px solid rgb(0,198,178)", borderRadius: 12, padding: 20} }}>
                <NewFreeSlot calendar={calendar} events={events} freeSlots={freeSlots}/>
            </Modal>
        </>
    );
}

export default NewFreeSlotBtn;