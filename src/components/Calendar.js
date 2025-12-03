import { SimpleGrid, Flex, Box, Button, Grid } from '@mantine/core';
import CalendarElement from './CalendarElement';

function Calendar() {

    return (
        <Box my={3} >
            <Grid gutter={1}>
                {Array.from({ length: 35 }).map((_, i) => (
                    <Grid.Col span={12/7} >
                        <CalendarElement index={i} />
                    </Grid.Col>
                ))}
            </Grid>
        </Box> 
    );
}

export default Calendar;