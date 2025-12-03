import { Box, Flex, Text } from '@mantine/core';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function CalendarElement({index}) {

    const weekendIndex = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34]

    return (
        <> 
            <Flex direction='column' h="14vh" style={{ border: "2px solid rgb(0,198,178)", borderRadius: "5px", position: "relative" }}>
                <Box style={{ position: "absolute", top: 0, left: 4 }}>
                    {index}
                </Box>
                {weekendIndex.includes(index) &&
                    <Box align="center">
                        <Flex  justify="center" align="center" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                            <CloseOutlinedIcon style={{color: "#F5F5F5", fontSize: 100, padding: 0}}/>
                        </Flex>
                        <Box style={{ position: "absolute", bottom: 0, left: 0 }}>
                            <Text fz={23}>🌻</Text>
                        </Box>
                    </Box>
                }
            </Flex>
        </>
    );
}

export default CalendarElement;