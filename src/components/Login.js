import { Title, Flex, Text, Button, PasswordInput, TextInput } from '@mantine/core';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    //Konstanten und Variablen, die für die Login-Funktionalitäten benötigt werden
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [noUser, setNoUser] = useState(false)

    //Form bestehend, aus den benötigten Login-Daten
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        }
    })

    //erhält Liste mit UserDaten aus der data.json
    useEffect(() => {
        fetch('http://localhost:8000/user') 
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error))
    }, [])

    //Funktionalität, die bei Versuch des einloggens ausgeführt wird
    function loginFunction (values) {
        const foundUser = data.find((user) => user.email === values.email && user.password === values.password)

        if (foundUser) {
            navigate(`/${foundUser.userId}`)    
            setNoUser(false)
        } 
        else {
            setNoUser(true)
        }
    }

    return (
        <Flex w="95vw" h="100vh" align="center" justify="center" direction="column">
            <Flex>
                <Title c="rgb(0,198,178)" ta="center" size={35} >Anmeldung</Title>
            </Flex>
             <Flex mt={40} p={50} w="30vw" direction="column" style={{ border: "4px solid rgb(0,198,178)", borderRadius: "10px", boxShadow: "0px 0px 10px 0px rgb(0,198,178)" }}>
                <form onSubmit={(form.onSubmit(loginFunction))}>
                    {noUser && <Text c="rgb(249, 203, 0)" mb={20} fz="15px">Kein User mit diesen Daten gefunden! Versuchen Sie es erneut...</Text>}
                    <Flex mb={30} direction="column">
                        <Text c="rgb(0,198,178)" fz="20px">E-Mail:</Text>
                        <TextInput type="email" size="md" radius="md" placeholder="E-Mail Adresse eingeben..." {...form.getInputProps("email")} styles={{input: {borderColor: "rgb(0,198,178)"}}}/>
                    </Flex>
                    <Flex mb={50} direction="column">
                        <Text c="rgb(0,198,178)" fz="20px">Passwort:</Text>
                        <PasswordInput size="md" radius="md" placeholder="Passwort eingeben..." {...form.getInputProps("password")} styles={{input: {borderColor: "rgb(0,198,178)"}}}/>
                    </Flex>
                    <Flex justify="center">
                        <Button type='submit' w="10vw" color="rgb(249, 203, 0)" variant="outline" radius={7} fz={16} leftSection={<ExitToAppIcon sx={{ color: "rgb(249, 203, 0)"}} />} style={{ borderWidth: 3 }} >Anmelden</Button>
                    </Flex>
                </form>
            </Flex>
        </ Flex> 
    );
}

export default Login;