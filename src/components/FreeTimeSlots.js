import { Title, Flex, Grid } from '@mantine/core';
import NewFreeSlotBtn from './NewFreeSlotBtn';
import FreeSlotElement from './FreeSlotElement';

function FreeTimeSlots({calendar, events, freeTimeSlotList}) {

    const slots = freeTimeSlotList.slice(0, 8);

    return (
        <Flex mx={-30} px={30} py={10} h="100%" bg="#F5F5F5" direction="column" style={{alignSelf: "end"}}>
            <Flex w="100%" justify="space-between" >
                <Title c="rgb(0,198,178)" size={20} mt={5}>freie Zeiträume in diesem Monat</Title>
                <NewFreeSlotBtn calendar={calendar} events={events}/>
            </Flex> 
            <Flex h="100%" justify="center" align="center">
                <Grid gutter={20}>
                    {slots?.map((slot) => 
                        <Grid.Col span={{ base: 6, md: 3 }} mb={5}>
                            <FreeSlotElement slot={slot} calendar={calendar} events={events}/>
                        </Grid.Col>
                    )}
                </Grid>
            </Flex>
        </Flex> 
    );
}

export default FreeTimeSlots;