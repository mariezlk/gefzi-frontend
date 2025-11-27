import { Button, Popover, Text, Flex } from '@mantine/core';
import TeamDetails from './TeamDetails';

function TeamDetailsBtn({calendar}) {

    return (
        <Popover
            shadow="md"
            withOverlay
            overlayProps={{ zIndex: 10000, blur: '10px' }}
            zIndex={10001}
        >
            <Popover.Target>
                <Button px={15} color="rgb(249, 203, 0)" variant="outline" radius={7} fz={16} style={{ borderWidth: 3 }} >{calendar?.name}</Button>
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
                <TeamDetails calendar={calendar} />
            </Popover.Dropdown>
        </ Popover>
    );
}

export default TeamDetailsBtn;