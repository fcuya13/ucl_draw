import { KnockoutMatch, Team } from './utils/types';
import { Col, Divider, Row, Typography } from 'antd';
import BomboTeam from './BomboTeam';
import { useEffect, useState } from 'react';

interface KOMatchProps {
	match: KnockoutMatch;
	phase: string;
	updateMatch: (knockout_id:number, team_1: Team|null, team_2: Team|null) => void;
}

const KnockoutMatchDisplay = ({ match, phase, updateMatch } :KOMatchProps) => {
	const [team1Color, setTeam1Color] = useState(false)
	const [team2Color, setTeam2Color] = useState(false)

	useEffect(() => {
		if (match.winner !== null){
			if (match.winner === match.team_1){
				setTeam1Color(true)
				setTeam2Color(false)
			}
			else{
				setTeam1Color(false)
				setTeam2Color(true)
			}
		}
		else{
			setTeam1Color(false)
			setTeam2Color(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateMatch]);

	const determineRivalType = (ko_id:number | null) => {
		if (ko_id){
			if (phase === 'Round of 16'){
				return `R32-${ko_id}`
			}
			else if (phase === 'Quarter-Finals'){
				return `R16-${ko_id - 8}`
			}
			else if (phase === 'Semifinals'){
				return `Q-${ko_id - 16}`
			}
			else {
				return `S-${ko_id - 20}`
			}
		}
	}

	return <Row style={{marginLeft:50}}>
		<Col span={10} className={team1Color ? 'green': ''}
				 style={{margin: 10,
					 marginLeft: 50,
					 paddingLeft: 20,
					 borderRadius: 5,
					 width:"0%",
				   cursor: match.team_1 ? 'pointer': 'default',
					 paddingRight:40,
					 paddingTop:2.5,
					 paddingBottom:2.5}}
				 onClick={() => {updateMatch(match.knockout_id, match.team_1, match.team_2)}} >
			{match.team_1 ? <BomboTeam team={match.team_1}  reversed={true}/>  : <Typography style={{textAlign:'center', fontSize:20, marginRight:50}}>{determineRivalType(match.prev_knockout_id[0])}</Typography>}
		</Col>
		<Col span={10} className={team2Color ? 'green' : ''}
				 style={{
					 margin:10,
					 borderRadius: 5,
					 width:"20%",
					 cursor: match.team_2 ? 'pointer': 'default',
				 	 paddingRight:40,
				   paddingTop:2.5,
				 paddingBottom:2.5}}
				 onClick={() => {updateMatch(match.knockout_id, match.team_2, match.team_1)}}>
			{match.team_2 ? <BomboTeam team={match.team_2} reversed={false}/>  : <Typography style={{textAlign:'center', fontSize:20, marginLeft: 60}}>{determineRivalType(match.prev_knockout_id[1])}</Typography>}
		</Col>
		<Divider style={{margin:0}}/>
	</Row>


}

export default KnockoutMatchDisplay