import { Title, Flex, Grid } from '@mantine/core';
import NewFreeSlotBtn from './NewFreeSlotBtn';
import FreeSlotElement from './FreeSlotElement';

function FreeTimeSlots({calendar, events, freeSlots}) {

    //beschränkt List der freeSlots, auf die zeitlich gesehenen nächsten 8 Slots, wobei bundesweite Feiertage 
    //und Wochenenden herusgefiltert werden
    const slots = freeSlots.filter((fs) => fs.holiday == false && fs.weekend == false).slice(0, 8)

    return (
        <Flex mx={-30} px={30} py={10} h="100%" bg="#F5F5F5" direction="column" style={{alignSelf: "end"}}>
            <Flex w="100%" justify="space-between" >
                <Title c="rgb(0,198,178)" size={20} mt={5}>anstehende freie Zeiträume</Title>
                <NewFreeSlotBtn calendar={calendar} events={events} freeSlots={freeSlots}/>
            </Flex> 
            <Flex h="100%" justify="center" align="center">
                <Grid gutter={20}>
                    {slots?.map((slot) => 
                        <Grid.Col span={{ base: 6, md: 3 }} mb={5}>
                            <FreeSlotElement slot={slot} calendar={calendar} events={events} freeSlots={freeSlots}/>
                        </Grid.Col>
                    )}
                </Grid>
            </Flex>
        </Flex> 
    );
}

export default FreeTimeSlots;