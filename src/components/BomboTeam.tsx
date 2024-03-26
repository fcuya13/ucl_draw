import {Team} from "../types";
import {Flex, Image, Space, Typography} from "antd";

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
        <Image src={team?.logo} height={30} width={30}
        preview={{
            imageRender: () => (<Flex vertical style={{background:"white", width:"500px", height:"500px", paddingTop:"25px"} }>
                    <img height="85%" width="85%" src={team?.logo} style={{alignSelf:"center"}}/>
                <Text style={{
                    marginTop: 5,
                    color:"black",
                    fontSize: 36
                }}>{team?.name}</Text>
                </Flex>
            ),
            toolbarRender: () => null,

        }}/>
        {reversed && <Typography style={{marginLeft: "10px"}}>
            <Text style={{fontSize: 20}}>{team?.name} ({team?.abv})</Text>
        </Typography>}

    </Flex>
}

export default BomboTeam