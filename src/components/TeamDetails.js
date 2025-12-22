import { Title, Text, Flex } from '@mantine/core';

function TeamDetails({calendar, userList}) {

    return (
        <Flex w="30vw" direction="column">
            <Flex justify="center">
                <Title c="rgb(0,198,178)" size={30} mb={30}>{calendar.name}</Title>
            </Flex>
            <Flex mb={30} align="start" justify="space-between" direction={{ base: "column", md: "row" }}>
                <Text c="rgb(0,198,178)" fz="20px">Mitglieder:</Text>
                <Flex direction="column" align="end">
                    {userList.filter((ul) => ul.fk_groupCalendarId == calendar.groupCalendarId).map((ul) =>
                        <Text fz="20px">{ul.firstName} {ul.lastName}</Text>
                    )}
                </Flex>
            </Flex>
            <Flex mb={30} align="center" justify="space-between" direction={{ base: "column", md: "row" }}>
                <Text c="rgb(0,198,178)" fz="20px">Arbeitszeit:</Text>
                <Text fz="20px">{calendar.workStart} - {calendar.workEnd} Uhr</Text>
            </Flex>
            <Flex mb={30} align="center" justify="space-between" direction={{ base: "column", md: "row" }}>
                <Text c="rgb(0,198,178)" fz="20px">Wochenende geblockt?</Text>
                <Text fz="20px">{calendar.weekendBlocked ? "Ja" : "Nein"}</Text>
            </Flex>
            <Flex direction="column">
                <Text c="rgb(0,198,178)" fz="20px">Symbole:</Text>
                <Flex justify="space-between">
                    <Flex align="center" direction="column">
                        <Text fz="30px">⛔</Text>
                        <Text ta="center" fz="19px">geblockte Termine</Text>
                    </Flex>
                    <Flex align="center" direction="column">
                        <Text fz="30px">🌻</Text>
                        <Text ta="center" fz="19px">Wochenende/ Feiertage</Text>
                    </Flex>
                    <Flex align="center" direction="column">
                        <Text fz="30px">🔥</Text>
                        <Text ta="center" fz="19px">Teamtermine</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default TeamDetails;