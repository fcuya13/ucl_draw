import { KnockoutMatch, StageMatches, Team } from '../components/utils/types';
import { getValueFromSessionStorage } from '../components/utils/sessionUtils';
import React, { useEffect, useState } from 'react';
import KnockoutPhase from '../components/KnockoutPhase';
import PageLayout from '../components/PageLayout';
import { Flex, Modal, Tabs, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Champion from '../components/Champion';
import { CaretLeftOutlined } from '@ant-design/icons';
import useSound from 'use-sound';
import MenuButton from '../components/MenuButton';

const KnockoutPage = () => {

	const navigate = useNavigate()

	let knockout_id = 1
	let prev_round_ko_id = 1
	let roundOf32: KnockoutMatch[] = []
	let roundOf16: KnockoutMatch[] = []
	let quarters: KnockoutMatch[] = []
	let semis: KnockoutMatch[] = []
	let final: KnockoutMatch[] = []
	const [phases, setPhases] = useState<StageMatches[]>([])
	const teams = getValueFromSessionStorage('qualified')
	const teamData:Team[] = getValueFromSessionStorage('teams')
	const top8: number[] = teams[0]
	const top9_24: number[] = teams[1]
	const [champion, setChampion] = useState<Team>()
	const [open, setOpen] = useState(false);
	const [playSound, {stop}] = useSound('champions.mp3', {volume:0.3});
	const shuffle = (array: number[]) => {
		let currentIndex = array.length;

		while (currentIndex !== 0) {

			let randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex], array[currentIndex]];
		}
	}

	const findTeamById = (id:number) => {
		return teamData.find(team => {
			return team.id === id
		})
	}

	const removeMatchInfo = (knockout_match:KnockoutMatch, match_winner: Team |null, team2: Team |null) => {
		const prev_winner = knockout_match.winner
		knockout_match.winner = null
		if (match_winner){
			if (knockout_match.team_1 === match_winner || knockout_match.team_1 === team2) knockout_match.team_1 = null
			else knockout_match.team_2 = null
		}
		phases.forEach(({/* stage, */ matches}) => {
			const next_match = matches.find(match => match.prev_knockout_id.includes(knockout_match.knockout_id))
			if (next_match){
				console.log(knockout_match,next_match, match_winner, team2)
				removeMatchInfo(next_match, match_winner, prev_winner)
			}
		})

	}

	const updateMatchInfo = (knockout_id:number, winner: Team|null, loser:Team|null) => {
		let next_knockout_match: KnockoutMatch | undefined
		if(winner && loser){
			const updatedData = phases.map(({ stage, matches }) => {
				const match = matches.find(match => match.knockout_id === knockout_id)
				if (match) match.winner = winner
				next_knockout_match = matches.find(match => match.prev_knockout_id.includes(knockout_id));
				if (next_knockout_match && next_knockout_match.winner) {
					removeMatchInfo(next_knockout_match, loser, winner);
				}

				let next_knockout_id_index = -1;
				if (next_knockout_match) {
					next_knockout_id_index = next_knockout_match.prev_knockout_id.findIndex(id => id === knockout_id);
					if (next_knockout_id_index === 0) next_knockout_match.team_1 = winner;
					else next_knockout_match.team_2 = winner;
				}
				return {stage, matches}
			})

			setPhases(updatedData)
		}
	}

	const handleChampion = () => {
		if (phases[4]){
			const final = phases[4].matches[0]
			if (final.winner) {
				setChampion(final.winner)
			}
		}
	}

	const generateMatchBasedOnPreviousRound = (prevRound:KnockoutMatch[], currRound: KnockoutMatch[]) => {
		for(let i = 0; i < prevRound.length/2; i++){
			const match:KnockoutMatch = {
				knockout_id: knockout_id,
				team_1: null,
				team_2: null,
				winner: null,
				prev_knockout_id: [prev_round_ko_id, prev_round_ko_id + 1]
			}
			currRound.push(match)
			prev_round_ko_id += 2
			knockout_id++
		}
	}

	const createKnockoutMatches = () => {
		knockout_id = 1
		prev_round_ko_id = 1
		roundOf32 = [];
		roundOf16 = [];
		quarters = [];
		semis = [];
		final = [];

		for(let i = 0; i < top9_24.length/2; i++){
			const team_1 = findTeamById(top9_24[i])
			const team_2 = findTeamById(top9_24[15-i])
			if (team_1 && team_2){
				const match:KnockoutMatch = {
					knockout_id: knockout_id,
					team_1: team_1,
					team_2: team_2,
					winner: null,
					prev_knockout_id: [null, null]
				}
				roundOf32.push(match)
				knockout_id++
			}
		}

		const ko_ids = [1,2,3,4,5,6,7,8]
		shuffle(ko_ids)

		for(let j = 0; j < top8.length; j++){
			const team_1 = findTeamById(top8[j])
			if (team_1){
				const match: KnockoutMatch = {
					knockout_id: knockout_id,
					team_1: team_1,
					team_2: null,
					winner: null,
					prev_knockout_id:[null, ko_ids[j]]
				}
				roundOf16.push(match)
				knockout_id++
			}

		}
		prev_round_ko_id = 9
		generateMatchBasedOnPreviousRound(roundOf16, quarters)
		generateMatchBasedOnPreviousRound(quarters, semis)
		generateMatchBasedOnPreviousRound(semis, final)

	}

	useEffect(() => {

		createKnockoutMatches()
		const data = [
			{stage:"Round of 32",
				matches: roundOf32},
			{stage:"Round of 16",
				matches: roundOf16},
			{stage:"Quarter-Finals",
				matches: quarters},
			{stage:"Semifinals",
				matches: semis},
			{stage:"Final",
				matches: final}, ]
		setPhases(data)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		handleChampion()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [phases]);

	useEffect(() => {
		if(champion) setOpen(true)
	}, [champion]);

	useEffect(()=> {
		if (open) playSound()
		else stop()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[open])

	const converted_data = phases.map((value, index, array) => {
		return {
			key: index.toString(),
			label: value.stage,
			children: <KnockoutPhase matches={value.matches} phase={value.stage} updateMatch={updateMatchInfo}/>
		}
	})

	const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
		const body = {
			"winner": champion?.abv
		}

		await fetch('https://bam6bjtbj5.execute-api.us-east-2.amazonaws.com/update_counter', {
			body: JSON.stringify(body),
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			mode:'no-cors'

		})
		setOpen(false);
		navigate('/')
		sessionStorage.removeItem('qualified')
		sessionStorage.removeItem('results')
		sessionStorage.removeItem('positions')
		sessionStorage.removeItem('matches')
	};

	return <PageLayout>
		<Flex style={{alignSelf:"center"}} vertical gap={5}>
			<Typography style={{textAlign: 'center', fontSize:36, marginTop:20}}>STAGE 2: KNOCKOUT PHASE</Typography>
			<Tabs centered defaultActiveKey="1" items={converted_data} style={{width:900}}/>
			<Modal cancelButtonProps={{ style: { display: 'none' } }}
						 title={<Typography style={{fontSize:36, textAlign:'center'}}>We have a champion!</Typography>}
						 open={open}
						 onOk={handleOk}
						 onCancel={handleOk}
						 okButtonProps={{style: { backgroundColor: '#05248c' }}}
						 okText={<Typography style={{fontSize:16, color:'white'}}>Submit & return home</Typography>}
			>
				{champion && <Champion team={champion}/>}
			</Modal>
			<Typography style={{margin:"auto",fontSize:16, color:"#05248c", marginTop:10}}>*Salir de esta página reiniciará los partidos</Typography>
			<MenuButton style={{marginTop:20}} onClick={() => navigate('/positions')} description={<><CaretLeftOutlined />Go back</>}/>
		</Flex>

	</PageLayout>
}
export default KnockoutPage