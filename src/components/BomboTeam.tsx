import {Team} from "./utils/types";
import {Flex, Image,  Typography} from "antd";

const {Text} = Typography;

interface bomboTeamProps{
    team: Team | undefined,
    reversed: boolean
}
const BomboTeam = ({team, reversed}: bomboTeamProps) => {
    return <Flex align={"center"}>
        {!reversed && <Typography style={{marginRight: "10px", marginLeft:"auto"}}>
            <Text style={{fontSize: 20}}>{team?.name} ({team?.abv})</Text>
        </Typography>}
        <Image src={team?.logo} height={30} width={30} preview={false} />
        {reversed && <Typography style={{marginLeft: "10px"}}>
            <Text style={{fontSize: 20}}>{team?.name} ({team?.abv})</Text>
        </Typography>}

    </Flex>
}

export default BomboTeam