import { Flex, Button, Text } from '@mantine/core';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function ChangeMonth({currentMonth, setCurrentMonth, currentYear, setCurrentYear, months}) {

    //Funktion, um hin und zurück zwischen den Monaten zu wechseln
    function changeMonth (changeOperator) {
        if(changeOperator == "+"){
            if(currentMonth < 11){
                return setCurrentMonth(currentMonth + 1)
            }
            setCurrentMonth(0)  
            setCurrentYear(currentYear + 1)
        }
        if(changeOperator == "-"){
            if(currentMonth > 0){
                return setCurrentMonth(currentMonth - 1)
            }
            setCurrentMonth(11)  
            setCurrentYear(currentYear - 1)
        }
    }

    return (
        <Flex align="center" ml={20} mt={5}>
            <Button c="rgb(1,1,1)" p={5} variant="transparent" onClick={() => changeMonth("-")}>
                <ArrowBackIosNewIcon sx={{ height: "15px", marginRight: "5px" }}/>
            </Button>
            <Text w="10vw" align="center" fz={20}>
                {months.find((month) => month.nr == currentMonth).name} {currentYear}
            </Text>
            <Button c="rgb(1,1,1)" p={5} variant="transparent" onClick={() => changeMonth("+")}>
                <ArrowForwardIosIcon sx={{ height: "15px", marginLeft: "5px" }}/>
            </Button>
        </Flex> 
    );
}

export default ChangeMonth;