import { Box, Flex, Text, Tooltip } from '@mantine/core';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useEffect } from 'react';

function CalendarElement({index, day, events, currentMonth, currentYear, holiday, calendar, freeTimeSlotList, setFreeTimeSlotList}) {

    const today = new Date().toISOString().split('T')[0];
    const weekendIndex = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34];
    const feiertage = holiday?.feiertage?.map((f) => f.date)
    const currentDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`;

    const eventsOnDay = events?.filter((event) => event.date == currentDate);
    const freeTimes = calcFreeTimes((eventsOnDay ?? []).filter(e => e?.startTime && e?.endTime).map(e => ({ start: e.startTime, end: e.endTime})));

    useEffect(() => {
        if(currentDate >= today){
            setFreeTimeSlotList(prev => [
                ...prev,
                ...freeTimes.map(ft => ({
                    date: currentDate,
                    start: ft.start,
                    end: ft.end
                }))
            ])
        }
    }, []);

    console.log(freeTimeSlotList);

    function toMinutes(time) {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
    }

    function calcFreeTimes(booked) {
        const DAY_START = toMinutes(calendar?.workStart ?? "08:00");
        const DAY_END   = toMinutes(calendar?.workEnd ?? "18:00");
        const MIN_FREE  = 30;
        const MAX_WIDTH = 88;

        const sorted = booked
            .map(b => ({ start: toMinutes(b.start), end: toMinutes(b.end) }))
            .sort((a, b) => a.start - b.start);

        const free = [];

        let lastEnd = DAY_START;

        for (const b of sorted) {
            if (b.start > lastEnd) {
            const duration = b.start - lastEnd;
            if (duration >= MIN_FREE) {
                free.push({
                    start: toHHMM(lastEnd),
                    end: toHHMM(b.start),
                    minutes: duration,
                    width: (duration / 600) * MAX_WIDTH,
                    left: ((lastEnd - DAY_START) / 600) * MAX_WIDTH
                });
            }
            }
            lastEnd = Math.max(lastEnd, b.end);
        }

        if (lastEnd < DAY_END) {
            const duration = DAY_END - lastEnd;
            if (duration >= MIN_FREE) {
            free.push({
                start: toHHMM(lastEnd),
                end: toHHMM(DAY_END),
                minutes: duration,
                width: (duration / 600) * MAX_WIDTH,
                left: ((lastEnd - DAY_START) / 600) * MAX_WIDTH
            });
            }
        }

        return free;
    }

    function toHHMM(min) {
        const h = Math.floor(min / 60);
        const m = min % 60;
        return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
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
                {(weekendIndex.includes(index) || feiertage?.includes(currentDate)) && day.isCurrentMonth &&  currentDate >= today &&
                    <Tooltip c="black" bg="#F5F5F5" fz={14} px={7} offset={-65} label={`Wochenende/ Feiertag`}>
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
                {!weekendIndex.includes(index) && !feiertage?.includes(currentDate) && day.isCurrentMonth && eventsOnDay && currentDate >= today &&
                    <Flex>
                        {freeTimes.length == 0 && eventsOnDay.filter(e => e.visibillity === "business").length == 0 &&
                            <Tooltip c="black" bg="#F5F5F5" fz={14} px={7} offset={{ mainAxis: -65, crossAxis: 95 }} label={`geblockter Tag/ keine freien Timeslots`}>
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
                            <Tooltip c="black" bg="#F5F5F5" fz={14} px={7} offset={0} label={`freie Zeit von ${freeTimes.start} bis ${freeTimes.end}`}>
                                <Flex h="60%" w={`${freeTimes.width}%`} justify="end" bg="rgb(0,198,178)" 
                                      style={{position: "absolute", left: `${freeTimes.left + 6 }%`, bottom: 5, 
                                              border: "2px solid rgb(0,198,178)", borderRadius: "7px", 
                                              backgroundColor: "rgb(0,198,178)"}} />
                            </Tooltip>
                        ))}
                    </Flex> 
                }
            </Flex>
        </>
    );
}

export default CalendarElement;