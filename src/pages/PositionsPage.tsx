import { Alert, Flex, Table, Typography } from 'antd';
import BomboTeam from '../components/BomboTeam';
import { MatchResultsData, MatchTableData, Team } from '../components/utils/types';
import PageLayout from '../components/PageLayout';
import { getValueFromSessionStorage, setValueToSessionStorage } from '../components/utils/sessionUtils';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import PlacementsGuide from '../components/PlacementsGuide';
import MenuButton from '../components/MenuButton';
import { POSITIONS, QUALIFIED, RESULTS, TEAMS } from '../components/utils/constants';

const PositionsPage = () => {

	const resultsData:MatchResultsData[] = getValueFromSessionStorage(RESULTS)
	const teams:Team[] = getValueFromSessionStorage(TEAMS)
	const navigate = useNavigate()
	const [error, setError] = useState(false)


	const knockoutStage = () => {
		const pendingMatches = resultsData.find(match => !match.result)
		if (pendingMatches){
			setError(true)
			window.scrollTo(0,0)
			return
		}
		const tablePositions = getValueFromSessionStorage(POSITIONS)
		const qualifiedTeams: number[] = tablePositions.slice(0,8)
		const prevRoundTeams: number[] = tablePositions.slice(8,24)
		const qualifiedStorage = [qualifiedTeams, prevRoundTeams]
		setValueToSessionStorage(QUALIFIED, qualifiedStorage)
		navigate('/knockout')
	}


	const dataSource: MatchTableData[] = teams?.map(team => {
		const gamesData = resultsData.filter(match => (match.home_id === team.id || match.away_id === team.id) && match.result)
		var played = 0, wins = 0, draws = 0, losses = 0, scored = 0, against = 0, diff = 0, points=  0
		gamesData.forEach(match =>{
			played++
			const isHomeTeam = match.home_id === team.id;
			const isWin = (isHomeTeam && match.result === "1") || (!isHomeTeam && match.result === "2");
			const isDraw = match.result === "X";
			const homeGoals = isHomeTeam ? match.home_goals : match.away_goals;
			const awayGoals = isHomeTeam ? match.away_goals : match.home_goals;

			scored += homeGoals;
			against += awayGoals;
			wins += isWin ? 1 : 0;
			draws += isDraw ? 1 : 0;
			losses += (!isWin && !isDraw) ? 1 : 0;
			points += isWin ? 3 : (isDraw ? 1 : 0);
			diff += homeGoals - awayGoals;

		})

		return {
			key: team.id,
			club: team,
			played,
			wins,
			draws,
			losses,
			goals_scored: scored,
			goals_against: against,
			goal_diff: diff,
			points
		}
	}).sort((a, b) => {
		if (a.points !== b.points) {
			return b.points - a.points;
		}

		if (a.goal_diff !== b.goal_diff) {
			return b.goal_diff - a.goal_diff;
		}

		if (a.goals_scored !== b.goals_scored) {
			return b.goals_scored - a.goals_scored;
		}

		return a.key - b.key;
	});

	useEffect(() => {
		const teamsPositions = dataSource.map(team => {
			return team.key
		})
		setValueToSessionStorage(POSITIONS, teamsPositions)
	}, [dataSource]);

	const columns = [
		{
			title: (<Typography style={{fontSize:20, textAlign:'center'}}>Pos</Typography>),
			dataIndex: 'id',
			key:'id',
			width:'3%',
			render: (item:any, record:any, index :any) => (<>{index + 1}</>)
		},
		{
			title: (<Typography style={{fontSize:20, textAlign:'center'}}>Club</Typography>),
			dataIndex: 'club',
			key: 'club',
			width: '12%',
			render: (team:Team) => <BomboTeam team={team} reversed={true}/>
		},
		{
			title: (<Typography style={{fontSize:20, textAlign:'center'}}>MP</Typography>),
			dataIndex: 'played',
			key: 'played',
			width:'3%'
		},
		{
			title: (<Typography style={{fontSize:20, textAlign:'center'}}>W</Typography>),
			dataIndex: 'wins',
			key: 'wins',
			width:'3%'
		},
		{
			title: (<Typography style={{fontSize:20, textAlign:'center'}}>D</Typography>),
			dataIndex: 'draws',
			key: 'draws',
			width:'3%'
		},
		{
			title: (<Typography style={{fontSize:20, textAlign:'center'}}>L</Typography>),
			dataIndex: 'losses',
			key: 'losses',
			width:'3%'
		},
		{
			title: (<Typography style={{fontSize:20, textAlign:'center'}}>GF</Typography>),
			dataIndex: 'goals_scored',
			key: 'goals_scored',
			width:'3%'
		},
		{
			title: (<Typography style={{fontSize:20, textAlign:'center'}}>GA</Typography>),
			dataIndex: 'goals_against',
			key: 'goals_against',
			width:'3%'
		},
		{
			title: (<Typography style={{fontSize:20, textAlign:'center'}}>GD</Typography>),
			dataIndex: 'goal_diff',
			key: 'goal_diff',
			width:'3%'
		},
		{
			title: (<Typography style={{fontSize:20, textAlign:'center'}}>Points</Typography>),
			dataIndex: 'points',
			key: 'points',
			width:'4%'

		},
	];


	return <PageLayout>
		<Flex gap={30} style={{ margin:"auto"}} >
				<Typography style={{textAlign: 'center', fontSize:36, marginTop: 20, marginBottom:0}}>CURRENT STANDINGS</Typography>

		</Flex>
		{error && <Alert style={{width:"30%", margin:"auto", marginTop:10}}
			message={(<Typography style={{fontWeight:'bold', fontSize:20}}>Can't complete group stage</Typography>)}
			description={(<Typography style={{fontSize:16}}>There are matches pending, please go to <Link to={'/matches'}>fixture</Link> and complete them</Typography>)}
			type="error"
			closable
			afterClose={() => setError(false)}/>}

		<Flex style={{marginBottom:40}}>
		<Table rowClassName={(item, record, index) => {
			if (record < 8) return 'green'
			else if (record < 24) return 'orange'
			else return 'red'
	}} style={{width:"50%", maxWidth:"50%", marginRight:80, marginLeft:"25%", marginTop:20}}  size={"small"} dataSource={dataSource} columns={columns}
														pagination={false} />
		<PlacementsGuide/>
		</Flex>
		<Flex gap={40} style={{margin:"auto"}}>
			<MenuButton style={{marginBottom:40}} onClick={() => navigate('/matches')} description={<><CaretLeftOutlined />Go back</>}/>
			<MenuButton style={{marginBottom:40}} onClick={knockoutStage} description={<>Proceed <CaretRightOutlined /></>}/>
		</Flex>
	</PageLayout>

}

export default PositionsPage