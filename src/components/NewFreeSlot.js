import { Button, Title, Text, Flex, Checkbox } from "@mantine/core";
import { DatePickerInput, TimePicker } from "@mantine/dates";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import 'dayjs/locale/de';

function NewFreeSlot({ calendar, events, freeSlots, date, fromTime, untilTime }) {

  const [dropdownOpenedFrom, setDropdownOpenedFrom] = useState(false);
  const [dropdownOpenedUntil, setDropdownOpenedUntil] = useState(false);
  const [dropdownOpenedDate, setDropdownOpenedDate] = useState(false);
  const [eventType, setEventType] = useState("business");
  const [valueDate, setValueDate] = useState(date ? date : null);
  const [valueTimeFrom, setValueTimeFrom] = useState(fromTime ? fromTime : null);
  const [labelTimeFrom, setLabelTimeFrom] = useState("");
  const [valueTimeUntil, setValueTimeUntil] = useState(untilTime ? untilTime : null);
  const [labelTimeUntil, setLabelTimeUntil] = useState("");
  const [submitWithoutData, setSubmitWithoutData] = useState(false);
  const [submitWrongDates, setSubmitWrongDates] = useState(false);
  const [submitDifLabels, setSubmitDifLabels] = useState(false)

  console.log(valueDate)
  function addEventFunction () {
    if(valueDate == null || valueTimeFrom == null || valueTimeUntil == null){
      console.log(valueTimeFrom)
      console.log(valueTimeUntil)
      return setSubmitWithoutData(true)
    }
    if(timeToMinutes(valueTimeFrom) >= timeToMinutes(valueTimeUntil)){
      return setSubmitWrongDates(true)
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

  const presets=getGroupedTimePresets(valueDate, freeSlots, "from", 15)

  function timeToMinutes(time) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  }

  function minutesToTimeString(m) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
  }

  function handleFromChange(time) {
    setValueTimeFrom(time);

    const preset = presets.find(p => p.values.includes(time));
    if (preset) {
      setLabelTimeFrom(preset.label);

      // Slot-Wechsel → bis resetten
      if (preset.label !== labelTimeUntil) {
        setValueTimeUntil("");
        setLabelTimeUntil("");
      }
    }
  }

  function handleUntilChange(time) {
    setValueTimeUntil(time);

    const preset = presets.find(p => p.values.includes(time));
    if (preset) {
      setLabelTimeUntil(preset.label);
    }
  }

  function getGroupedTimePresets(valueDate, freeSlots, timeType, step = 15) {
    if (!valueDate) return [];

    return freeSlots
      .filter(slot => slot.date === valueDate)
      .map(slot => {
        const start = timeToMinutes(slot.start);
        const end = timeToMinutes(slot.end);

        const values = [];
        for (let m = start; m <= end; m += step) {
          values.push(minutesToTimeString(m));
        }

        return {
          label: `${slot.start} - ${slot.end}`,
          values,
        };
      });
  }

  console.log(freeSlots);

  return (
    <Flex w="30vw" direction="column">
      <Flex justify="center">
        <Title c="rgb(0,198,178)" size={30} mb={30}>
          Termin hinzufügen
        </Title>
      </Flex>
      {submitWithoutData && <Text c="rgb(249, 203, 0)" mb={20} fz="15px">Zum Anlegen eines neuen Termins müssen alle Felder ausgefüllt sein...</Text>}
      {submitWrongDates && <Text c="rgb(249, 203, 0)" mb={20} fz="15px">Die Endzeit des Termins liegt vor der Startzeit...</Text>}
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
          onClick={() => setDropdownOpenedDate(!dropdownOpenedDate)}
          onChange={setValueDate}
          style={{border: "2px solid rgb(0,198,178)", borderRadius: "5px"}}
          excludeDate={eventType == "business" ? 
                        (date) => !freeSlots.some((fs) => fs.date == date) || 
                                  freeSlots.filter((fs) => fs.date == date).some((fs) => fs.holiday == true || fs.weekend == true) : 
                        undefined}
          rightSection={<CalendarMonthIcon onClick={() => setDropdownOpenedDate(!dropdownOpenedDate)} sx={{ color: "rgb(0,198,178)", cursor: "pointer" }} />}
          popoverProps={{
            opened: dropdownOpenedDate,
            onClose: () => setDropdownOpenedDate(false),
          }}
        />
      </Flex>
      <Flex mb={15} direction="column">
        <Text c="rgb(0,198,178)" fz="20px">
          Uhrzeit:
        </Text>
        <Flex my={30} justify="space-around">
          <Flex align="center" direction="column">
            <TimePicker 
              w="150%" 
              withDropdown 
              hoursStep={1} 
              minutesStep={5} 
              disabled={valueDate == null}
              min="08:00" max="18:00"
              onChange={handleFromChange}
              presets={presets}
              value={valueTimeFrom} 
              onClick={() => setDropdownOpenedFrom(!dropdownOpenedFrom)}
              style={{border: "2px solid rgb(0,198,178)", borderRadius: "5px"}} 
              rightSection={<AccessTimeIcon onClick={() => setDropdownOpenedFrom(!dropdownOpenedFrom)} sx={{ color: "rgb(0,198,178)", cursor: "pointer" }} />}
              popoverProps={{
                opened: dropdownOpenedFrom,
                onChange: (_opened) => !_opened && setDropdownOpenedFrom(false),
              }}
            />
            <Text ta="center" fz="19px">
              von
            </Text>
          </Flex>
          <Flex align="center" direction="column">
            <TimePicker 
              w="150%" 
              withDropdown 
              hoursStep={1} 
              minutesStep={5} 
              disabled={valueDate == null}
              min="10:00" max="18:30"
              onChange={handleUntilChange}
              presets={presets.filter(p => p.label === labelTimeFrom)}
              value={valueTimeUntil} 
              onClick={() => setDropdownOpenedUntil(!dropdownOpenedUntil)}
              style={{border: "2px solid rgb(0,198,178)", borderRadius: "5px"}} 
              rightSection={<AccessTimeIcon onClick={() => setDropdownOpenedUntil(!dropdownOpenedUntil)} sx={{ color: "rgb(0,198,178)", cursor: "pointer" }} />}
              popoverProps={{
                opened: dropdownOpenedUntil,
                onChange: (_opened) => !_opened && setDropdownOpenedUntil(false),
              }}
            />
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
