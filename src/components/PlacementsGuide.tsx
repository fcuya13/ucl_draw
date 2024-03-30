import { Avatar, Flex, Typography } from 'antd';
import React from 'react';

const PlacementsGuide = () => {
	return <Flex vertical style={{marginTop:"15%"}}>
		<Flex align={"center"} gap={10}>
			<Avatar size={24} shape="square" className="green" style={{borderStyle:"solid", borderWidth:1, borderColor:"#2B6932"}}/>
			<Typography style={{fontSize:26}}>Round of 16</Typography>
		</Flex>
		<Flex align={"center"} gap={10}>
			<Avatar size={24} shape="square" className="orange" style={{borderStyle:"solid", borderWidth:1, borderColor:"#AD9953"}}/>
			<Typography style={{fontSize:26}}>Half-Round of 32</Typography>
		</Flex>
		<Flex align={"center"} gap={10}>
			<Avatar size={24} shape="square" className="red" style={{borderStyle:"solid", borderWidth:1, borderColor:"#98424C"}}/>
			<Typography style={{fontSize:26}}>Eliminated</Typography>
		</Flex>
	</Flex>
}

export default PlacementsGuide