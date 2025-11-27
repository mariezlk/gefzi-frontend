import { Flex, Button, Text } from '@mantine/core';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function ChangeMonth() {

    return (
        <Flex align="center" ml={20} mt={5}>
            <ArrowBackIosNewIcon sx={{ height: "15px", marginRight: "5px" }}/>
            <Text fz={20}>November</Text>
            <ArrowForwardIosIcon sx={{ height: "15px", marginLeft: "5px" }}/>
        </Flex> 
    );
}

export default ChangeMonth;