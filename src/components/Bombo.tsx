import {Flex, Typography} from "antd";
import BomboTeam from "./BomboTeam";
import { Divider } from "antd";
import {Team} from "../types";
const {Title} = Typography;

interface BomboProps{
    bomboTeams: Team[],
    bomboNumber: number
}
const Bombo = ({bomboTeams, bomboNumber}: BomboProps) => {
    return <Flex gap={"middle"} vertical
                 style={{
                     borderStyle:"solid",
                     borderRadius: 15,
                     width: "320px",
                     height: "fit-content",
                     padding:20,
                     paddingTop: 10,
                     borderColor:"#05248c"}}>
        <Typography >
            <Title  level={3} style={{textAlign:"center" ,marginTop: 10, marginBottom:0}}>Bombo {bomboNumber}</Title>
        </Typography>
        <Divider style={{margin:0, backgroundColor:"#9e16ce", borderWidth:2}}/>
        {bomboTeams.map(team => {
            const id = team.id
            return <BomboTeam key={id} team={team} reversed={true}/>
        })}
    </Flex>
}

export default Bombo