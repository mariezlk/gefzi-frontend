import { Button, Title, Text, Flex, Checkbox } from "@mantine/core";
import { DatePickerInput} from "@mantine/dates";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

function NewFreeSlot({ calendar }) {

  const [value, setValue] = useState(null);

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
            <Checkbox size="md" defaultChecked color="rgb(0,198,178)" />
            <Text ta="center" fz="19px">
              Teamtermin
            </Text>
          </Flex>
          <Flex align="center" direction="column">
            <Checkbox size="md" defaultChecked color="rgb(0,198,178)" />
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
        <input type="date" />
        <DatePickerInput
          withinPortal
          dropdownZIndex={999999}
          label="Pick date"
          placeholder="Pick date"
          value={value}
          onChange={setValue}
        />
      </Flex>
      <Flex mb={30} direction="column">
        <Text c="rgb(0,198,178)" fz="20px">
          Uhrzeit:
        </Text>
        <Flex mt={30} justify="space-around">
          <Flex w={100} align="center" direction="column">
            <input type="time" />
            <Text ta="center" fz="19px">
              von
            </Text>
          </Flex>
          <Flex align="center" direction="column">
            <input type="time" />
            <Text ta="center" fz="19px">
              bis
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
