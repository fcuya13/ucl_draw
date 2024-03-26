import {useLocation, useNavigate} from "react-router-dom";
import {Button, Flex, Tabs, TabsProps, Typography} from "antd";
import PageLayout from "../components/PageLayout";
import React, {useEffect, useState} from "react";
import {JornadaData, MatchData, Team} from "../types";
import Match from "../components/Match";
import { client } from '../redis';

const FixturePage = () => {
    const location = useLocation()
    const fixtureData: JornadaData[]  = location.state
    const navigate = useNavigate()
    const {Title} = Typography
    const [teams,setTeams] = useState<Team[] | null>(null)

    const loadTeams = async() => {
        const response = await fetch('https://ucldrawserverless.s3.us-east-2.amazonaws.com/teams.json')
        const data = await response.json()
        setTeams(data)
        const test = await client.set('bike:1', 'Process 123')
        const value = await client.get('bike:1')
        console.log(test, value)
    }


    useEffect(() => {
        loadTeams()
    }, [])

    const returnHome = () => {
        navigate('/')
    }

    const converted_data: TabsProps['items'] = fixtureData.map((item, index) => {
        const [label, matches] = Object.entries(item)[0]
        const key = (index + 1).toString()
        const jornada = `Matchday ${key}`
        const children = matches.map((match: MatchData) => {
            const home_team = teams?.find(team => team.id === match.home_id)
            const away_team = teams?.find(team => team.id === match.away_id)
            return <Match id={index + 1} home={home_team} away={away_team}/>
        })

        return {
            key: key,
            label: jornada,
            children: children
        }
    })







    console.log(converted_data)

    return <PageLayout>
        {fixtureData?  (
            <Flex style={{alignSelf:"center"}}>
                <Tabs defaultActiveKey="1" items={converted_data} />
            </Flex>
        ) : <Typography>
            <Flex vertical style={{margin:"auto"}}>
                <Title level={2}  style={{textAlign:"center"}}>No has realizado un sorteo. Por favor regresa a la página principal</Title>
                <Button style={{
                    width:"auto",
                    height: "auto",
                    alignSelf:"center",
                    borderColor: "#9e16ce",
                    color: "#05248c",
                    borderWidth: 3,
                    fontSize: "1rem",
                }} onClick={returnHome}>Volver al inicio</Button>
            </Flex>
        </Typography>

        }

    </PageLayout>
}

export default FixturePage