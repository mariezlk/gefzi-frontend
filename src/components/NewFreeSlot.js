import { Button, Title, Text, Flex, Checkbox } from "@mantine/core";
import { DatePickerInput, TimePicker } from "@mantine/dates";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function NewFreeSlot({ calendar }) {

  const [value, setValue] = useState(null);

  return (
    <Flex w="30vw" direction="column">
      <Flex justify="center">
        <Title c="rgb(0,198,178)" size={30} mb={30}>
          Termin hinzufügen
        </Title>
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
        <DatePickerInput
          mr={150}
          placeholder="Pick date"
          value={value}
          onChange={setValue}
          style={{border: "2px solid rgb(0,198,178)", borderRadius: "5px"}}
          rightSection={<CalendarMonthIcon sx={{ color: "rgb(0,198,178)" }} />}
        />
      </Flex>
      <Flex mb={30} direction="column">
        <Text c="rgb(0,198,178)" fz="20px">
          Uhrzeit:
        </Text>
        <Flex my={30} justify="space-around">
          <Flex align="center" direction="column">
            <TimePicker w="150%" withDropdown style={{border: "2px solid rgb(0,198,178)", borderRadius: "5px"}} rightSection={<AccessTimeIcon sx={{ color: "rgb(0,198,178)" }} />}/>
            <Text ta="center" fz="19px">
              von
            </Text>
          </Flex>
          <Flex align="center" direction="column">
            <TimePicker w="150%" withDropdown style={{border: "2px solid rgb(0,198,178)", borderRadius: "5px"}} rightSection={<AccessTimeIcon sx={{ color: "rgb(0,198,178)" }} />}/>
            <Text ta="center" fz="19px">
              bis
            </Text>
          </Flex>
        </Flex>
        <Flex mb={15} direction="column">
          <Text c="rgb(0,198,178)" fz="20px">
            Terminart:
          </Text>
          <Flex justify="space-around" pt={30}>
            <Flex w="150%" align="center" direction="column">
              <Checkbox size="md" defaultChecked color="rgb(0,198,178)" />
              <Text ta="center" fz="19px">
                Teamtermin
              </Text>
            </Flex>
            <Flex w="150%" align="center" direction="column">
              <Checkbox size="md" defaultChecked color="rgb(0,198,178)" />
              <Text ta="center" fz="19px">
                privater Termin
              </Text>
            </Flex>
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
