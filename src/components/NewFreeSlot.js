import { Button, Title, Text, Flex, Checkbox } from "@mantine/core";
import AddIcon from "@mui/icons-material/Add";

function NewFreeSlot({ calendar }) {
  return (
    <Flex w="30vw" direction="column">
      <Flex justify="center">
        <Title c="rgb(0,198,178)" size={30} mb={30}>
          Termin hinzufügen
        </Title>
      </Flex>
      <Flex mb={30} direction="column">
        <Text c="rgb(0,198,178)" fz="20px">
          Terminart:
        </Text>
        <Flex justify="space-between" px={70} pt={30}>
          <Flex align="center" direction="column">
            <Checkbox defaultChecked color="rgb(0,198,178)" />
            <Text ta="center" fz="19px">
              Teamtermin
            </Text>
          </Flex>
          <Flex align="center" direction="column">
            <Checkbox defaultChecked color="rgb(0,198,178)" />
            <Text ta="center" fz="19px">
              privater Termin
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        mb={30}
        align="center"
        justify="space-between"
        direction={{ base: "column", md: "row" }}
      >
        <Text c="rgb(0,198,178)" fz="20px">
          Datum:
        </Text>
        <Text fz="20px">
          {calendar.workStart} - {calendar.workEnd} Uhr
        </Text>
      </Flex>
      <Flex mb={30} direction="column">
        <Text c="rgb(0,198,178)" fz="20px">
          Uhrzeit:
        </Text>
        <Flex justify="space-between">
          <Flex align="center" direction="column">
            <Text fz="30px">⛔</Text>
            <Text ta="center" fz="19px">
              geblockte Termine
            </Text>
          </Flex>
          <Flex align="center" direction="column">
            <Text fz="30px">🌻</Text>
            <Text ta="center" fz="19px">
              Wochenende/ Feiertage
            </Text>
          </Flex>
          <Flex align="center" direction="column">
            <Text fz="30px">🔥</Text>
            <Text ta="center" fz="19px">
              Teamtermine
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex justify="center">
        <Button
          px={15}
          color="rgb(249, 203, 0)"
          variant="outline"
          radius={7}
          fz={16}
          leftSection={<AddIcon sx={{ color: "rgb(249, 203, 0)" }} />}
          style={{ borderWidth: 3 }}
        >
          Termin hinzufügen
        </Button>
      </Flex>
    </Flex>
  );
}

export default NewFreeSlot;
