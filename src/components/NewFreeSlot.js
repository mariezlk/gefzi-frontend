import { Button, Title, Text, Flex, Checkbox } from "@mantine/core";
import { DatePickerInput, TimePicker } from "@mantine/dates";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import 'dayjs/locale/de';

function NewFreeSlot({ calendar, events }) {

  const [eventType, setEventType] = useState("business");
  const [valueDate, setValueDate] = useState(null);
  const [valueTimeFrom, setValueTimeFrom] = useState(null);
  const [valueTimeUntil, setValueTimeUntil] = useState(null);
  const [submitWithoutData, setSubmitWithoutData] = useState(false);
  const disabledDates = ['2025-12-25', '2025-12-26']; 

  function addEventFunction () {
    
    if(valueDate == null || valueTimeFrom == null || valueTimeUntil == null){
      return setSubmitWithoutData(true)
    }

    const maxId = events.reduce((max, event) => Math.max(max, event.eventId), 0);
    const newId = maxId + 1;

    fetch(`http://localhost:8000/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        eventId: newId + "",
        date:  valueDate,
        startTime: valueTimeFrom,
        endTime: valueTimeUntil,
        visibillity: eventType,
        fk_groupCalendarId: calendar.groupCalendarId,
      })
    })

    window.location.reload();
  }

  return (
    <Flex w="30vw" direction="column">
      <Flex justify="center">
        <Title c="rgb(0,198,178)" size={30} mb={30}>
          Termin hinzufügen
        </Title>
      </Flex>
      {submitWithoutData && <Text c="rgb(249, 203, 0)" mb={20} fz="15px">Zum Anlegen eines neuen Termins müssen alle Felder ausgefüllt sein...</Text>}
      <Flex mb={45} direction="column">
        <Text c="rgb(0,198,178)" fz="20px">
          Terminart:
        </Text>
        <Flex justify="space-around" pt={30}>
          <Flex w="150%" align="center" direction="column">
            <Checkbox size="md" checked={eventType == "business" ? true : false} color="rgb(0,198,178)" onChange={() => setEventType("business")}/>
            <Text ta="center" fz="19px">
              Teamtermin
            </Text>
          </Flex>
          <Flex w="150%" align="center" direction="column">
            <Checkbox size="md" checked={eventType == "private" ? true : false} color="rgb(0,198,178)" onChange={() => setEventType("private")}/>
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
        <DatePickerInput
          w="31%"
          mr={45}
          locale="de"
          valueFormat="DD. MMM YYYY"
          placeholder="DD MM YYYY"
          minDate={new Date()}
          value={valueDate}
          onChange={setValueDate}
          style={{border: "2px solid rgb(0,198,178)", borderRadius: "5px"}}
          excludeDate={(date) => new Date(date).getDay() == 0 || new Date(date).getDay() == 6 || disabledDates.some((d) => d == date)}
          rightSection={<CalendarMonthIcon sx={{ color: "rgb(0,198,178)" }} />}
        />
      </Flex>
      <Flex mb={15} direction="column">
        <Text c="rgb(0,198,178)" fz="20px">
          Uhrzeit:
        </Text>
        <Flex my={30} justify="space-around">
          <Flex align="center" direction="column">
            <TimePicker w="150%" withDropdown hoursStep={1} minutesStep={5} value={valueTimeFrom} onChange={setValueTimeFrom} style={{border: "2px solid rgb(0,198,178)", borderRadius: "5px"}} rightSection={<AccessTimeIcon sx={{ color: "rgb(0,198,178)" }} />}/>
            <Text ta="center" fz="19px">
              von
            </Text>
          </Flex>
          <Flex align="center" direction="column">
            <TimePicker w="150%" withDropdown hoursStep={1} minutesStep={5} value={valueTimeUntil} onChange={setValueTimeUntil} style={{border: "2px solid rgb(0,198,178)", borderRadius: "5px"}} rightSection={<AccessTimeIcon sx={{ color: "rgb(0,198,178)" }} />}/>
            <Text ta="center" fz="19px">
              bis
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex justify="center">
        <Button
          onClick={addEventFunction}
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
