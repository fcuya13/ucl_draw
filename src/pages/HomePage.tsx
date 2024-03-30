import { Flex, Space, Typography } from 'antd';
import {useEffect, useState} from "react";
import {Team} from "../components/utils/types";
import Bombo from "../components/Bombo";
import {useNavigate} from "react-router-dom";
import PageLayout from "../components/PageLayout";
import {LoadingOutlined} from "@ant-design/icons";
import MenuButton from '../components/MenuButton';
import { getValueFromSessionStorage, setValueToSessionStorage } from '../components/utils/sessionUtils';
import { COUNT, MATCHES, RESULTS, TEAMS } from '../components/utils/constants';
const HomePage = () => {
    const [teams,setTeams] = useState<Team[] | null>(null)
    const [bombos, setBombos] = useState<Team[][] | null>(null)
    const [loading ,setLoading] = useState(false)
    const navigate = useNavigate()
    const prevMatchesData = getValueFromSessionStorage(MATCHES)
    const prevTeamsData = getValueFromSessionStorage(TEAMS)
    const prevCountData = getValueFromSessionStorage(COUNT)
    const [count, setCount] = useState<number>(prevCountData ? parseInt(prevCountData): 1);

    const loadTeams = async() => {
        if (!prevTeamsData) {
            const response = await fetch('https://ucldrawserverless.s3.us-east-2.amazonaws.com/teams.json')
            const data = await response.json()
            setTeams(data)
            setValueToSessionStorage(TEAMS, data)
        }
        else{
            setTeams(prevTeamsData)
        }
        setValueToSessionStorage(COUNT, count)
    }


    useEffect(() => {
        if (loading){
            const intervalId = setInterval(() => {
                setCount(prevCount => (prevCount === 8 ? 8 : prevCount + 1));
            }, 1200);
            return () => clearInterval(intervalId);
        }
    }, [loading]);
    const sorteo = async() => {
        setLoading(true)
        sessionStorage.removeItem(RESULTS)
        const response = await fetch('https://bam6bjtbj5.execute-api.us-east-2.amazonaws.com/ucl_lambda')
        const data = await response.json()
        setLoading(false)
        setValueToSessionStorage(MATCHES, data)
        navigate('matches', {state:false})
    }

    const resume = () => {
        navigate('matches', {state:true})
    }

    useEffect(() => {
        loadTeams()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(teams){
            setBombos([teams.slice(0,9), teams.slice(9,18), teams.slice(18,27), teams.slice(27,37)])
        }
    }, [teams])


    return <PageLayout>
        {loading && <Space style={{zIndex:999,  position:"fixed",background:"rgba(0,0,0,0.4)", width:"100%", height: "100%"}}>
            <LoadingOutlined style={{fontSize:80, position:"fixed", left:"50%", marginLeft:"-50px", top:"40%", color:"#001bde"}}/>
            <Typography style={{color:'#001bde', position:"fixed", left:"44%", marginLeft:"-50px", top:"51%",fontSize: 36, }}>Loading matchup {count}/8...</Typography>
        </Space>}
        <Flex vertical style={{margin:"auto"}}>
        <Flex gap={35} style={{marginTop: 20, alignSelf:"center"}} >
            {bombos && bombos.map((bombo, index) => {
                return <Bombo key={index+1} bomboTeams={bombo} bomboNumber={index + 1}/>
            })}

        </Flex>
            <Flex gap={50} style={{margin:"auto"}}>
                <MenuButton style={{marginTop:60}} onClick={sorteo} description={'Nuevo Sorteo'}/>
                {prevMatchesData && <MenuButton  style={{marginTop:60}} onClick={resume} description={'Reanudar Sorteo'}/>}
                <MenuButton style={{marginTop:60}} onClick={() => navigate('/halloffame')} description={'Ver Ranking'}/>

            </Flex>
        </Flex>

    </PageLayout>
}

export default HomePage