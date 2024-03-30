import { Team } from './utils/types';
import { Flex, Image, Typography } from 'antd';

const Champion = ({ team }: {team:Team}) => {
	return <Flex vertical align={'center'}>
		<Image src={team.logo} preview={false} width="50%"/>
		<Typography style={{fontSize:28}}>{team.name}</Typography>
	</Flex>
}

export default Champion