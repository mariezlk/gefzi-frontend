import { Box, Flex, Text, Tooltip, Modal } from '@mantine/core';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import NewFreeSlot from "./NewFreeSlot";
import { useDisclosure } from '@mantine/hooks';

function CalendarElement({day, events, currentMonth, currentYear, calendar, freeSlots}) {

    const [opened, { open, close }] = useDisclosure(false);
    const today = new Date().toISOString().split('T')[0];
    const currentDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`;
    const currentDateFreeSlots = freeSlots.filter((fs) => fs.date == currentDate);

    const eventsOnDay = events?.filter((event) => event.date == currentDate);
    const freeTimes = freeSlots?.filter((fs) => fs.date == currentDate);

    function toMinutes(time) {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
    }

    function offsetForEvent(event) {
        const DAY_START = toMinutes(calendar?.workStart ?? "08:00");
        const start = toMinutes(event.startTime);
        return ((start - DAY_START) / 600) * 88; // wie freeTimes.left
    }

    return (
        <> 
            <Flex h="calc(60.5vh / 5)" direction='column' style={{ backgroundColor: day.isCurrentMonth ? "#fff" : "#F5F5F5", border: currentDate == today ? "3px solid rgb(249, 203, 0)" : "2px solid rgb(0,198,178)", borderRadius: "5px", position: "relative" }}>
                <Box c={currentDate == today ? "rgb(249, 203, 0)" : "black"} style={{ position: "absolute", top: 0, left: 4, cursor: "default"}}>
                    {day.day}
                </Box>
                {(currentDateFreeSlots.some((fs) => fs.weekend == true) || currentDateFreeSlots.some((fs) => fs.holiday == true)) && day.isCurrentMonth &&  currentDate >= today &&
                    <Tooltip c="black" bg="#F5F5F5" fz={14} px={7} offset={-58} label={`Wochenende/ Feiertag`}>
                        <Box align="center">
                            <Flex  justify="center" align="center" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                                <CloseOutlinedIcon style={{color: "#F5F5F5", fontSize: 100, padding: 0}}/>
                            </Flex>
                            <Box style={{ position: "absolute", bottom: 0, left: 0 }}>
                                {day.isCurrentMonth && <Text style={{cursor: "default"}} fz={23}>🌻</Text>}
                            </Box>
                        </Box>
                    </Tooltip>
                }
                {currentDate < today && day.isCurrentMonth && 
                    <Tooltip c="black" bg="#F5F5F5" fz={14} px={7} offset={-60} label={`Tag liegt in der Vergangenheit`}>
                        <Box align="center">
                            <Flex  justify="center" align="center" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                                <CheckOutlinedIcon style={{color: "#F5F5F5", fontSize: 100, padding: 0}}/>
                            </Flex>
                        </Box>
                    </Tooltip>
                }
                {!currentDateFreeSlots.some((fs) => fs.weekend == true) && !currentDateFreeSlots.some((fs) => fs.holiday == true) && day.isCurrentMonth && eventsOnDay && currentDate >= today &&
                    <Flex>
                        {freeTimes.length == 0 && eventsOnDay.filter(e => e.visibillity === "business").length == 0 &&
                            <Tooltip c="black" bg="#F5F5F5" fz={14} px={7} offset={{ mainAxis: -60, crossAxis: 95 }} label={`geblockter Tag/ keine freien Timeslots`}>
                                <Box align="center">
                                    <Flex  justify="center" align="center" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                                        <CloseOutlinedIcon style={{color: "#F5F5F5", fontSize: 100, padding: 0}}/>
                                    </Flex>
                                    <Box style={{ position: "absolute", bottom: 0, left: 0 }}>
                                        {day.isCurrentMonth && <Text fz={23} style={{cursor: "default"}}>⛔</Text>}
                                    </Box>
                                </Box>
                            </Tooltip>
                        }
                        {eventsOnDay
                            .filter(e => e.visibillity === "business")
                            .map((event, i) => (
                                <Tooltip c="black" bg="#F5F5F5" fz={14} px={7} offset={30} label={`Teamtermin von ${event.startTime} bis ${event.endTime}`}>
                                    <Box style={{cursor: "default", position: "absolute", left: `${offsetForEvent(event) + 6}%`, bottom: 2, fontSize: 20}}>
                                        🔥
                                    </Box>
                                </Tooltip>
                            ))
                        }
                        {freeTimes.map((freeTimes) => (
                            <>
                                <Tooltip c="black" bg="#F5F5F5" fz={14} px={7} offset={0} label={`freie Zeit von ${freeTimes.start} bis ${freeTimes.end}`}>
                                    <Flex onClick={open} h="60%" w={`${freeTimes.width}%`} justify="end" bg="rgb(0,198,178)" 
                                        style={{position: "absolute", left: `${freeTimes.left + 6 }%`, bottom: 5, 
                                                border: "2px solid rgb(0,198,178)", borderRadius: "7px", 
                                                backgroundColor: "rgb(0,198,178)", cursor: "pointer"}} />
                                </Tooltip>
                                <Modal size="auto" opened={opened} onClose={close} withCloseButton={false} centered styles={{ content: {border: "7px solid rgb(0,198,178)", borderRadius: 12, padding: 20} }}>
                                    <NewFreeSlot calendar={calendar} events={events} date={currentDate} fromTime={freeTimes.start} untilTime={freeTimes.end}/>
                                </Modal>
                            </>
                        ))}
                    </Flex> 
                }
            </Flex>
        </>
    );
}

export default CalendarElement;