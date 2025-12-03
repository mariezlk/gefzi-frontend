import { Box, Flex, Text } from '@mantine/core';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function CalendarElement({index, day}) {

    const weekendIndex = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34];

    return (
        <> 
            <Flex h="calc(60.5vh / 5)" direction='column' style={{ backgroundColor: day.isCurrentMonth ? "#fff" : "#F5F5F5", border: "2px solid rgb(0,198,178)", borderRadius: "5px", position: "relative" }}>
                <Box style={{ position: "absolute", top: 0, left: 4 }}>
                    {day.day}
                </Box>
                {weekendIndex.includes(index) &&
                    <Box align="center">
                        <Flex  justify="center" align="center" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                            <CloseOutlinedIcon style={{color: "#F5F5F5", fontSize: 100, padding: 0}}/>
                        </Flex>
                        <Box style={{ position: "absolute", bottom: 0, left: 0 }}>
                            {day.isCurrentMonth && <Text fz={23}>🌻</Text>}
                        </Box>
                    </Box>
                }
            </Flex>
        </>
    );
}

export default CalendarElement;