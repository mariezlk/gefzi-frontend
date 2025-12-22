import { Box, Grid } from '@mantine/core';
import CalendarElement from './CalendarElement';

function Calendar({currentMonth, currentYear, events, calendar, freeSlots}) {

    const days = getCalendarDays(currentYear, currentMonth)

    function getCalendarDays(year, month) {
        const firstDay = new Date(year, month, 1)
        const daysInMonth = new Date(year, month + 1, 0).getDate()

        let startWeekday = firstDay.getDay()
        startWeekday = (startWeekday + 6) % 7

        const days = []

        for (let i = 0; i < startWeekday; i++) {
            days.push({ day: null, isCurrentMonth: false })
        }

        for (let d = 1; d <= daysInMonth; d++) {
            days.push({ day: d, isCurrentMonth: true })
        }

        while (days.length < 35 || (35 < days.length && days.length < 42)) {
            days.push({ day: null, isCurrentMonth: false })
        }

        return days
    }

    return (
        <Box my={3} >
            <Grid gutter={1}>
                {days.map((d, i) => (
                    <Grid.Col span={12/7} >
                        <CalendarElement day={d} events={events} currentMonth={currentMonth} currentYear={currentYear} 
                                         calendar={calendar} freeSlots={freeSlots}/>
                    </Grid.Col>
                ))}
            </Grid>
        </Box> 
    );
}

export default Calendar;