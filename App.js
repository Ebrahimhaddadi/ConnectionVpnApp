import {View, Text, TouchableOpacity} from "react-native";
import {useEffect,useState} from "react";
import Security from "react-native-vpn-detect";
import { saveConfig, prepare, connect,VpnState,disconnect } from "react-native-vpn-ipsec";

const App=()=>{
    const [statusVpn, setStatusVpn] = useState(false);

    async function checkSecurity() {
        let detectVPN = await Security.detectVPN().then(response => { return response });
        let detectProxy = await Security.detectProxy().then(response => { return response });
        setStatusVpn(detectVPN);

    }

    console.log(VpnState.connected)
    useEffect(()=>{
        checkSecurity();
    },[])
    useEffect(() => {
        prepare();
    });
    /// or use componentDidmount in case of a class component


    saveConfig("ebi", "5.kolbenet.click", "09375176420", "6420",  "", true)
    console.log(connect)

    const handleDisconnect =async () => {
        try{
            const res =await disconnect();
            console.log(res.toString())

        }catch (e) {

        }
    }

    const handleConnect =async () => {
        try{
            const res =await connect("ebi", "5.kolbenet.click", "09375176420", "6420",  null, true)
            ;
            console.log(res.toString())

        }catch (e) {

        }
    }

return(
<View>
<Text>App</Text>
    <TouchableOpacity onPress={handleDisconnect} >
        <Text>disconnect</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleConnect} >
        <Text>connect</Text>
    </TouchableOpacity>
    <Text>
        {statusVpn ?  " اتصال برقرار شد" : "رتباط قطع شد"}
    </Text>
</View>
)
}
export default App