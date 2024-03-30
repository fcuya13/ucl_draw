import { MatchData, MatchResultsData, Team } from './utils/types';
import { Col, Divider, Row, Typography } from 'antd';
import BomboTeam from "./BomboTeam";
import Score from './Score';
import { useEffect, useState } from 'react';

interface MatchProps{
    match_id: number,
    home: Team,
    away: Team,
    homeg: number | undefined,
    awayg: number | undefined,
    updateResults: (resultsData: MatchResultsData[], match: MatchData, home_goals:string, away_goals: string, checkResults: () => boolean) => void,
    resultsData: MatchResultsData[] | null
}
const Match = ({match_id, home, away, homeg, awayg, updateResults, resultsData}: MatchProps) => {
    const {Title} = Typography
    const [homeScore, setHomeScore] = useState(homeg !== undefined? homeg.toString() : '')
    const [awayScore, setAwayScore] = useState(awayg !== undefined? awayg.toString() : '')

    const validateResult = () => {
        return !isNaN(homeScore as any) && !isNaN(awayScore as any)
    }


    useEffect(() => {
        if (resultsData){
            const home_id = home.id
            const away_id = away.id
            updateResults(resultsData, {match_id,home_id, away_id}, homeScore, awayScore, validateResult)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [homeScore, awayScore]);

    return <Row style={{marginTop:8, marginLeft:70}}>
        <Col span={8}><BomboTeam team={home} reversed={true}/></Col>
        <Col span={2} >
            <Score score={homeScore} setScore={setHomeScore}/>
        </Col>
        <Col span={2}><Typography><Title style={{margin:0, textAlign:'center', lineHeight:"80%"}}>-</Title></Typography></Col>
        <Col span={2}>
            <Score score={awayScore} setScore={setAwayScore}/>
        </Col>
        <Col span={8}><BomboTeam team={away} reversed={false}/></Col>
        <Divider style={{margin:10}}/>
    </Row>
}

export default Match