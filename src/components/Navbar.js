import { Button, Flex } from "@mantine/core";
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <Flex w="11vh" h="100vh"  bg="rgb(0,198,178)" justify="center" align="center" pt="15vh" direction="column">
            <Flex h="100vh" justify="space-between" direction="column">
                <Button variant="transparent" title="mein Konto" h={45} onClick={() => navigate("/persoenlicheDaten")}>
                    <PersonIcon sx={{ fontSize: 45, color: currentPath == "/persoenlicheDaten" ? 'rgb(249, 203, 0)' : 'rgb(256, 256, 256)'}}/>
                </Button>
                <Button variant="transparent" title="Gruppenkalender" h={45} onClick={() => navigate("/gruppenkalender")}>
                    <CalendarMonthIcon sx={{ fontSize: 45, color: currentPath == "/gruppenkalender" ? 'rgb(249, 203, 0)' : 'rgb(256, 256, 256)'}}/>
                </Button>
                <Button variant="transparent" title="Hilfe" h={45} onClick={() => navigate("/hilfe")}>
                    <HelpOutlineIcon sx={{ fontSize: 45, color: currentPath == "/hilfe" ? 'rgb(249, 203, 0)' : 'rgb(256, 256, 256)'}}/>
                </Button>
            </Flex>
            <img src={`${process.env.PUBLIC_URL}/assets/fom-logo.svg`} alt="FOM Logo" style={{ width: 75, height: 75, marginTop: 200 }} />
        </Flex>
    );
}

export default Navbar;