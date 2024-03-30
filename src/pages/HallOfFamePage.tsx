import React, { useEffect, useState } from 'react';
import { Button, Table, Typography } from 'antd';
import { Team, WinnerTeam } from '../components/utils/types';
import BomboTeam from '../components/BomboTeam';
import PageLayout from '../components/PageLayout';
import { getValueFromSessionStorage } from '../components/utils/sessionUtils';
import { useNavigate } from 'react-router-dom';

const HallOfFamePage = () => {

	const [champions, setChampions] = useState<WinnerTeam[]>(getValueFromSessionStorage('halloffame'))
	const teams:Team[] = getValueFromSessionStorage('teams')
	const navigate = useNavigate()
	const getData = async () => {
		const response = await fetch('https://bam6bjtbj5.execute-api.us-east-2.amazonaws.com/get_hof')
		const data = await response.json()
		setChampions(data)
		sessionStorage.setItem('halloffame', JSON.stringify(data))
	}

	const columns = [
		{
			title: (<Typography style={{fontSize:20, textAlign:'center'}}>Pos</Typography>),
			dataIndex: 'id',
			key:'id',
			render: (item:any, record:any, index :any) => (<>{index + 1}</>)
		},
		{
			title: (<Typography style={{fontSize:20, textAlign:'center'}}>Team</Typography>),
			dataIndex: 'team',
			key:'team',
			render: (item:Team, record:any, index :any) => (<BomboTeam team={item} reversed={true}/>),
		},
		{
			title: (<Typography style={{fontSize:20, textAlign:'center'}}>Times Champion</Typography>),
			dataIndex: 'times',
			key: 'times',
			render: (item:number, record:any, index :any) => <Typography style={{fontSize:20, textAlign:'center'}}>{item}</Typography>
		}
	]

	useEffect(() => {
		getData()
	},[])

	const dataSource = champions?.map((champion) => {
		const abv = champion.team
		const times = champion.times
		const teamData = teams?.find(team => team.abv === abv)
		return {
			key: teamData?.id,
			team: teamData,
			times: times
		}
	})

	return <PageLayout>

		<Table style={{width:"30%", marginRight:90, marginLeft:"35%", marginTop:20}}  size={"small"}
					 columns={columns}
					 dataSource={dataSource}
		  		 pagination={false}/>

		<Button style={{
			width:"200px",
			height: "auto",
			alignSelf:"center",
			marginTop: 50,
			borderColor: "#9e16ce",
			color: "#05248c",
			borderWidth: 3,
			fontSize: "1rem"
		}} onClick={() => navigate('/')}>Regresar a inicio</Button>

	</PageLayout>
}
export default HallOfFamePage