import { Box, Flex, Text, Tooltip, Modal } from '@mantine/core';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import NewFreeSlot from "./NewFreeSlot";
import { useDisclosure } from '@mantine/hooks';

function CalendarElement({day, events, currentMonth, currentYear, calendar, freeSlots}) {

    //Konstanen und Variablen zur Behandlung der Boxen (eine Box = ein CalendarElement)
    const [opened, { open, close }] = useDisclosure(false)
    const today = new Date().toISOString().split('T')[0]
    const currentTime = parseToMinutes(new Date())
    const currentDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`
    const currentDateFreeSlots = freeSlots.filter((fs) => fs.date == currentDate)

    //filtert events und freeSlots nach dem aktuellen Tag, der in dieser Komponente behnadelt wird
    const eventsOnDay = events?.filter((event) => event.date == currentDate)
    const freeTimes = freeSlots?.filter((fs) => fs.date == currentDate)

    //Hilfsfunktion zur Umrechnung einer datetime in Minuten
    function parseToMinutes(date) {
        return date.getHours() * 60 + date.getMinutes()
    }

    //Hilfsfunktion zur Umwandlung von Uhrzeiten in Minuten
    function toMinutes(time) {
        const [h, m] = time.split(":").map(Number)
        return h * 60 + m
    }

    //Hilfsfunktion zur Berechnung des stylings in der Box (Berechnung von Abständen nach rechts bei Teamevents, abhängig von
    //Dauer des Teamevents, da das Emoji allein diese nicht abbliden kann)
    function offsetForEvent(event) {
        const DAY_START = toMinutes(calendar?.work_start ?? "08:00")
        const DAY_END = toMinutes(calendar?.work_end ?? "17:00")
        const EVENT_START = toMinutes(event.start_time)
        return ((EVENT_START - DAY_START) / (DAY_END - DAY_START)) * 88
    }

    return (
        <> 
            <Flex h="calc(60.5vh / 5)" direction='column' style={{ backgroundColor: day.isCurrentMonth ? "#fff" : "#F5F5F5", 
                  border: currentDate == today ? "3px solid rgb(249, 203, 0)" : "2px solid rgb(0,198,178)", 
                  borderRadius: "5px", position: "relative" }}>
                <Box c={currentDate == today ? "rgb(249, 203, 0)" : "black"} 
                     style={{ position: "absolute", top: 0, left: 4, cursor: "default"}}>
                    {day.day}
                </Box>
                {(new Date (currentDate).getDay() == 0 || new Date (currentDate).getDay() == 6 || currentDateFreeSlots.some((fs) => fs.holiday == true)) && 
                 day.isCurrentMonth &&  
                 currentDate >= today &&
                    <Tooltip c="black" bg="#F5F5F5" fz={14} px={7} offset={-58} label={`Wochenende/ Feiertag`}>
                        <Box align="center">
                            <Flex justify="center" align="center" style={{position: "absolute", top: "50%", left: "50%", 
                                  transform: "translate(-50%, -50%)"}}>
                                <CloseOutlinedIcon style={{color: "#F5F5F5", fontSize: 100, padding: 0}}/>
                            </Flex>
                            <Box style={{ position: "absolute", bottom: 0, left: 0 }}>
                                {day.isCurrentMonth && <Text style={{cursor: "default"}} fz={23}>🌻</Text>}
                            </Box>
                        </Box>
                    </Tooltip>
                }
                {(currentDate < today || (today == currentDate && currentTime >= toMinutes(calendar?.work_end))) && day.isCurrentMonth &&
                    <Tooltip c="black" bg="#F5F5F5" fz={14} px={7} offset={-60} label={`Tag liegt in der Vergangenheit`}>
                        <Box align="center">
                            <Flex  justify="center" align="center" style={{position: "absolute", top: "50%", left: "50%", 
                                   transform: "translate(-50%, -50%)"}}>
                                <CheckOutlinedIcon style={{color: "#F5F5F5", fontSize: 100, padding: 0}}/>
                            </Flex>
                        </Box>
                    </Tooltip>
                }
                {new Date (currentDate).getDay() != 0 && 
                 new Date (currentDate).getDay() != 6 && 
                 !currentDateFreeSlots.some((fs) => fs.holiday == true) && 
                 day.isCurrentMonth && 
                 eventsOnDay && 
                 (currentDate > today ||
                 (today == currentDate && currentTime < toMinutes(calendar?.work_end)))&&
                    <Flex>
                        {freeTimes.length == 0 && eventsOnDay.filter(e => e.visibility === "business").length == 0 &&
                            <Tooltip c="black" bg="#F5F5F5" fz={14} px={7} offset={{ mainAxis: -60, crossAxis: 95 }} 
                                     label={`geblockter Tag/ keine freien Timeslots`}>
                                <Box align="center">
                                    <Flex justify="center" align="center" style={{position: "absolute", top: "50%", left: "50%", 
                                          transform: "translate(-50%, -50%)"}}>
                                        <CloseOutlinedIcon style={{color: "#F5F5F5", fontSize: 100, padding: 0}}/>
                                    </Flex>
                                    <Box style={{ position: "absolute", bottom: 0, left: 0 }}>
                                        {day.isCurrentMonth && <Text fz={23} style={{cursor: "default"}}>⛔</Text>}
                                    </Box>
                                </Box>
                            </Tooltip>
                        }
                        {eventsOnDay
                            .filter(e => e.visibility === "business")
                            .map((event, i) => (
                                <Tooltip c="black" bg="#F5F5F5" fz={14} px={7} offset={30} 
                                         label={`Teamtermin von ${event.start_time} bis ${event.end_time}`}>
                                    <Box style={{cursor: "default", position: "absolute", left: `${offsetForEvent(event) + 4}%`, 
                                                 bottom: 2, fontSize: 20}}>
                                        🔥
                                    </Box>
                                </Tooltip>
                            ))
                        }
                        {freeTimes.map((freeTimes) => (
                            <>
                                <Tooltip c="black" bg="#F5F5F5" fz={14} px={7} offset={0} 
                                         label={`freie Zeit von ${freeTimes.start} bis ${freeTimes.end}`}>
                                    <Flex onClick={open} h="60%" w={`${freeTimes.width}%`} justify="end" bg="rgb(0,198,178)" 
                                          style={{position: "absolute", left: `${freeTimes.left + 6 }%`, bottom: 5, 
                                                  border: "2px solid rgb(0,198,178)", borderRadius: "7px", 
                                                  backgroundColor: "rgb(0,198,178)", cursor: "pointer"}} />
                                </Tooltip>
                                <Modal size="auto" opened={opened} onClose={close} withCloseButton={false} centered 
                                       styles={{ content: {border: "7px solid rgb(0,198,178)", borderRadius: 12, padding: 20} }}>
                                    <NewFreeSlot calendar={calendar} events={events} freeSlots={freeSlots} date={currentDate} 
                                                 fromTime={freeTimes.start} untilTime={freeTimes.end}/>
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