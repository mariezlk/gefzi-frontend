import { Button, Popover, Text, Flex } from '@mantine/core';
import AddIcon from '@mui/icons-material/Add';
import NewFreeSlot from "./NewFreeSlot";

function NewFreeSlotBtn({calendar}) {

    return (
        <Popover
            shadow="md"
            withOverlay
            withinPortal={true}
            overlayProps={{ zIndex: 10000, blur: '10px' }}
            zIndex={10001}
        >
            <Popover.Target>
                <Button px={15} color="rgb(249, 203, 0)" variant="outline" radius={7} fz={16} leftSection={<AddIcon sx={{ color: "rgb(249, 203, 0)"}} />} style={{ borderWidth: 3 }} >Termin hinzufügen</Button>
            </Popover.Target>
            <Popover.Dropdown
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: "7px solid rgb(0,198,178)",
                    borderRadius: 12,
                    padding: 20,
                }}
            >
                <NewFreeSlot calendar={calendar} />
            </Popover.Dropdown>
        </ Popover>
    );
}

export default NewFreeSlotBtn;