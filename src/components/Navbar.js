import { Button, Flex } from "@mantine/core";
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar({userId}) {

    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <Flex w="6vw" h="100vh"  bg="rgb(0,198,178)" justify="center" align="center" pt="15vh" direction="column">
            <Flex h="100vh" justify="space-between" direction="column">
                <Button variant="transparent" title="mein Konto" h="6vh" onClick={() => navigate(`/persoenlicheDaten/${userId}`)}>
                    <PersonIcon sx={{ fontSize: "50px", color: currentPath.includes("/persoenlicheDaten") ? 'rgb(249, 203, 0)' : 'rgb(256, 256, 256)'}}/>
                </Button>
                <Button variant="transparent" title="Gruppenkalender" h="6vh" onClick={() => navigate(`/gruppenkalender/${userId}`)}>
                    <CalendarMonthIcon sx={{ fontSize: "50px", color: currentPath.includes("/gruppenkalender") ? 'rgb(249, 203, 0)' : 'rgb(256, 256, 256)'}}/>
                </Button>
                <Button variant="transparent" title="Hilfe" h="6vh" onClick={() => navigate(`/hilfe/${userId}`)}>
                    <HelpOutlineIcon sx={{ fontSize: "50px", color: currentPath.includes("/hilfe") ? 'rgb(249, 203, 0)' : 'rgb(256, 256, 256)'}}/>
                </Button>
            </Flex>
            <img src={`${process.env.PUBLIC_URL}/assets/fom-logo.svg`} alt="FOM Logo" onClick={() => navigate(`/${userId}`)} style={{ height: "10vh", marginTop: 200, cursor: "pointer" }} />
        </Flex>
    );
}

export default Navbar;