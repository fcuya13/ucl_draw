import {useLocation, useNavigate} from "react-router-dom";
import { Flex, Tabs, TabsProps, Typography} from "antd";
import PageLayout from "../components/PageLayout";
import React, {useEffect, useState} from "react";
import { JornadaData, MatchData, MatchResultsData, Team } from '../components/utils/types';
import Match from "../components/Match";
import { getValueFromSessionStorage, setValueToSessionStorage } from '../components/utils/sessionUtils';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import MenuButton from '../components/MenuButton';
import { MATCHES, RESULTS, TEAMS } from '../components/utils/constants';

const FixturePage = () => {

    const location = useLocation()
    const resuming = location.state
    const fixtureData:JornadaData[] =getValueFromSessionStorage(MATCHES)
    const navigate = useNavigate()
    const teams:Team[] = getValueFromSessionStorage(TEAMS)
    const [loading, setLoading] = useState(true);
    let resultsData: MatchResultsData[] | null = getValueFromSessionStorage(RESULTS);

    const createResultsData = (fixtureData: JornadaData[]): MatchResultsData[] => {
        return fixtureData.flatMap((item,/* index*/) => {
            const [/*_*/, matches] = Object.entries(item)[0];
            const jornadaMatches: MatchResultsData[] = matches.map((match) => ({
                ...match,
                home_goals: 0,
                away_goals: 0,
                result: null
            }));
            return jornadaMatches;
        });
    }

    const autocompleteResultsData = (option:'fill'|'clear') => {
        resultsData = getValueFromSessionStorage(RESULTS);
        const updatedData = resultsData?.map(res => {
            let home_goals, away_goals, result;
            if (option === 'fill'){
                home_goals = Math.floor(Math.random()*4)
                away_goals = Math.floor(Math.random()*4)
                result = home_goals > away_goals ? "1" : (home_goals < away_goals ? "2" : "X");
            }
            else{
                home_goals = 0
                away_goals = 0
                result = null
            }

            return {
                ...res,
                home_goals,
                away_goals,
                result
            }
        })
        setValueToSessionStorage(RESULTS, updatedData)
        window.location.reload()
    }

    const fillMissingResultsData = () => {
        resultsData = getValueFromSessionStorage(RESULTS);
        const updatedData = resultsData?.map(res => {
            if (!res.result){
                const home_goals = Math.floor(Math.random()*4)
                const away_goals = Math.floor(Math.random()*4)
                const result = home_goals > away_goals ? "1" : (home_goals < away_goals ? "2" : "X");

                return {
                    ...res,
                    home_goals,
                    away_goals,
                    result
                }
            }
            return res
        })
        setValueToSessionStorage(RESULTS, updatedData)
        window.location.reload()

    }

    const updateResultsData = (resultsData: MatchResultsData[], match: MatchData, home_goals:string, away_goals: string, checkResults: () => boolean) => {
        if (checkResults()){
            const updatedData = resultsData.map(res => {
                if (res.match_id === match.match_id){
                    if (!home_goals && !away_goals){
                        return {...res, home_goals:0,away_goals: 0,result: null}
                    }
                    const home_goals_int = parseInt(home_goals)
                    const away_goals_int = parseInt(away_goals)
                    const result = home_goals_int > away_goals_int ? "1" : (home_goals_int < away_goals_int ? "2" : "X");
                    return {
                        ...res,
                        home_goals: home_goals_int,
                        away_goals: away_goals_int,
                        result
                    }
                }
                return res
            })
            setValueToSessionStorage(RESULTS, updatedData)
        }
    }

    const loadPage = async() => {
        if (!resuming && !resultsData){
            resultsData = createResultsData(fixtureData)
            setValueToSessionStorage(RESULTS, resultsData)
        }
    }

    useEffect(() => {
        loadPage()
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading){
        return <Typography>Loading...</Typography>
    }

    const converted_data: TabsProps['items'] = fixtureData?.map((item, j_index) => {
        const [/*_*/, matches] = Object.entries(item)[0]
        const key = (j_index + 1).toString()
        const jornada = `Matchday ${key}`
        const children = matches.map((match: MatchResultsData, m_index) => {
            const home_team = teams?.find(team => team.id === match.home_id)
            const away_team = teams?.find(team => team.id === match.away_id)

            if (home_team && away_team){
                const resultsMatch = resultsData?.find(resMatch => resMatch.match_id === match.match_id)
                const result = resultsMatch?.result
                var home_goals, away_goals
                if (result){
                    home_goals = resultsMatch?.home_goals
                    away_goals = resultsMatch?.away_goals
                }
                return <Match
                  match_id={j_index* 18 + m_index + 1}
                  home={home_team}
                  away={away_team}
                  homeg={home_goals}
                  awayg={away_goals}
                  updateResults={updateResultsData}
                  resultsData={resultsData}/>
            }
            return null
        })

        return {
            key: key,
            label: jornada,
            children: children
        }
    })


    return <PageLayout>
        <Typography style={{textAlign: 'center', fontSize:36, marginTop: 20, marginBottom:0}}>STAGE 1: GROUP PHASE</Typography>
        <Flex style={{alignSelf:"center"}} vertical>
            <Tabs centered defaultActiveKey="1" items={converted_data}/>
            <Flex gap={40} style={{ margin:"auto", marginBottom: 50}} >
                <MenuButton style={{marginTop:30}} onClick={() => navigate('/')} description={<><CaretLeftOutlined />Go back</>}/>
                <MenuButton style={{marginTop:30}} onClick={() => {
                    autocompleteResultsData('clear')
                }} description={'Clear'}/>
                <MenuButton style={{marginTop:30}} onClick={fillMissingResultsData} description={'Autocomplete'}/>
                <MenuButton style={{marginTop:30}} onClick={() => navigate('/positions')} description={<>Proceed <CaretRightOutlined /></>}/>
            </Flex>
        </Flex>


    </PageLayout>
}

export default FixturePage