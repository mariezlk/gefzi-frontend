import { Button } from '@mantine/core';
import AddIcon from '@mui/icons-material/Add';

function NewFreeSlotBtn() {

    return (
        <>
            <Button px={15} color="rgb(249, 203, 0)" variant="outline" radius={7} fz={16} leftSection={<AddIcon sx={{ color: "rgb(249, 203, 0)"}} />} style={{ borderWidth: 3 }} >Termin hinzufügen</Button>
        </>
    );
}

export default NewFreeSlotBtn;