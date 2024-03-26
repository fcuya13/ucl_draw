import {Button, Flex, Space} from "antd";
import {useEffect, useState} from "react";
import {Team} from "../types";
import Bombo from "../components/Bombo";
import {useNavigate} from "react-router-dom";
import PageLayout from "../components/PageLayout";
import {LoadingOutlined} from "@ant-design/icons";
const HomePage = () => {
    const [teams,setTeams] = useState<Team[] | null>(null)
    const [bombos, setBombos] = useState<Team[][] | null>(null)
    const [loading ,setLoading] = useState(false)
    const navigate = useNavigate()

    const loadTeams = async() => {
        const response = await fetch('https://ucldrawserverless.s3.us-east-2.amazonaws.com/teams.json')
        const data = await response.json()
        setTeams(data)
    }

    const sorteo = async() => {
        setLoading(true)
        const response = await fetch('https://bam6bjtbj5.execute-api.us-east-2.amazonaws.com/ucl_lambda')
        const data = await response.json()
        setLoading(false)
        navigate('matches', {state: data})
    }

    useEffect(() => {
        loadTeams()
    }, [])

    useEffect(() => {
        if(teams){
            setBombos([teams.slice(0,9), teams.slice(9,18), teams.slice(18,27), teams.slice(27,37)])
        }
    }, [teams])


    return <PageLayout>
        {loading && <Space style={{zIndex:999,  position:"fixed",background:"rgba(0,0,0,0.25)", width:"100%", height: "100%"}}>
            <LoadingOutlined style={{fontSize:80, position:"fixed", left:"50%", marginLeft:"-50px", top:"40%", color:"#091442"}}/>
        </Space>}
        <Flex vertical style={{margin:"auto"}}>
        <Flex gap={35} style={{marginTop: 20, alignSelf:"center"}} >
            {bombos && bombos.map((bombo, index) => {
                return <Bombo key={index+1} bomboTeams={bombo} bomboNumber={index + 1}/>
            })}

        </Flex>
            <Button style={{
                width:"auto",
                height: "auto",
                alignSelf:"center",
                marginTop: 50,
                borderColor: "#9e16ce",
                color: "#05248c",
                borderWidth: 3,
                fontSize: "1rem"
            }} onClick={sorteo}>Empezar Sorteo</Button>
        </Flex>

    </PageLayout>
}

export default HomePage