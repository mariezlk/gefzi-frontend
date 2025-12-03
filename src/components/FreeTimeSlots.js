import { Title, Flex, Box, Button, Grid } from '@mantine/core';
import NewFreeSlotBtn from './NewFreeSlotBtn';
import FreeSlotElement from './FreeSlotElement';

function FreeTimeSlots({calendar, events}) {

    const slots = [
        {date: "12. November", time: "12:35 - 13:35"}, 
        {date: "12. November", time: "12:35 - 13:35"}, 
        {date: "12. November", time: "12:35 - 13:35"}, 
        {date: "12. November", time: "12:35 - 13:35"}, 
        {date: "12. November", time: "12:35 - 13:35"}, 
        {date: "12. November", time: "12:35 - 13:35"}, 
        {date: "12. November", time: "12:35 - 13:35"}, 
        {date: "12. November", time: "12:35 - 13:35"}
    ];

    return (
        <Flex mx={-30} px={30} py={10} h="22vh" bg="#F5F5F5" direction="column" style={{marginTop: "auto"}}>
            <Flex w="100%" justify="space-between" >
                <Title c="rgb(0,198,178)" size={20} mt={5}>freie Zeiträume</Title>
                <NewFreeSlotBtn calendar={calendar} events={events}/>
            </Flex> 
            <Flex h="100%" justify="center" align="center">
                <Grid gutter={20}>
                    {slots.map((slot) => 
                        <Grid.Col span={{ base: 6, md: 3 }} >
                            <FreeSlotElement slot={slot} />
                        </Grid.Col>
                    )}
                </Grid>
            </Flex>
        </Flex> 
    );
}

export default FreeTimeSlots;