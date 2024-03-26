import {Team} from "../types";
import {Col, Divider, Flex, Row} from "antd";
import BomboTeam from "./BomboTeam";

interface MatchProps{
    id: number,
    home: Team | undefined,
    away: Team | undefined
}
const Match = ({id, home, away}: MatchProps) => {
    return <Row style={{marginTop:8, marginLeft:40, marginRight:40}}>
        <Col span={10}><BomboTeam team={home} reversed={true}/></Col>
        <Col span={1} style={{borderColor:"gray", borderWidth:1, borderStyle:"solid", borderRadius: 5, }}></Col>
        <Col span={2}></Col>
        <Col span={1} style={{borderColor:"gray", borderWidth:1, borderStyle:"solid", borderRadius: 5, }}></Col>
        <Col span={10} style={{marginLeft:"auto"}}><BomboTeam team={away} reversed={false}/></Col>
        <Divider style={{margin:10}}/>
    </Row>
}

export default Match