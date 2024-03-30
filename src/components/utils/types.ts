export interface Team {
    id: number,
    name: string,
    abv: string,
    logo: string,
    bombo: number
}

export interface MatchData{
    match_id: number,
    home_id: number,
    away_id: number
}

export interface JornadaData {
    [key: string]: MatchResultsData[];
}

export interface MatchResultsData{
    match_id: number,
    home_id: number,
    away_id: number,
    home_goals: number,
    away_goals: number,
    result: string | null
}

export interface MatchTableData{
    key: number,
    club: Team,
    played: number,
    wins: number,
    draws: number,
    losses: number,
    goals_scored: number,
    goals_against: number,
    goal_diff: number,
    points: number
}

export interface KnockoutMatch{
    knockout_id:number,
    team_1: Team | null,
    team_2: Team | null,
    winner: Team | null,
    prev_knockout_id: [number | null, number | null]
}

export interface StageMatches {
    stage: string;
    matches: KnockoutMatch[];
}

export interface WinnerTeam{
    team: string,
    times: number
}