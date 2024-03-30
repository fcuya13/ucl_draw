import { KnockoutMatch, Team } from './utils/types';
import { Flex } from 'antd';
import KnockoutMatchDisplay from './KnockoutMatch';

interface KOPhaseProps {
	matches: KnockoutMatch[];
	phase: string;
	updateMatch: (knockout_id:number, team_1: Team|null, team_2:Team|null) => void;
}

const KnockoutPhase = ({ matches, phase, updateMatch } :KOPhaseProps) => {
	return <Flex vertical >
		{matches.map(match => {
			return (<KnockoutMatchDisplay match={match} phase={phase} updateMatch={updateMatch}/>)
		})}
	</Flex>
}

export default KnockoutPhase