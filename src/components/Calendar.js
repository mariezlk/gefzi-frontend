import { SimpleGrid, Flex, Box, Button, Grid } from '@mantine/core';
import CalendarElement from './CalendarElement';

function Calendar({currentMonth, currentYear}) {

    const days = getCalendarDays(currentYear, currentMonth);

    function getCalendarDays(year, month) {
        // month: 0-11 (0 = Januar)
        const firstDay = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Wochentag index: 0=Sonntag, 1=Montag... → wir brauchen: 0=Montag
        let startWeekday = firstDay.getDay(); 
        startWeekday = (startWeekday + 6) % 7; // Montag = 0

        const days = [];

        // 1) Leere Tage davor
        for (let i = 0; i < startWeekday; i++) {
            days.push({ day: null, isCurrentMonth: false });
        }

        // 2) Monatstage
        for (let d = 1; d <= daysInMonth; d++) {
            days.push({ day: d, isCurrentMonth: true });
        }

        // 3) Rest bis 35 auffüllen
        while (days.length < 35 || (35 < days.length && days.length < 42)) {
            days.push({ day: null, isCurrentMonth: false });
        }

        return days;
    }

    console.log(days)

    return (
        <Box my={3} >
            <Grid gutter={1}>
                {days.map((d, i) => (
                    <Grid.Col span={12/7} >
                        <CalendarElement index={i} day={d}/>
                    </Grid.Col>
                ))}
            </Grid>
        </Box> 
    );
}

export default Calendar;