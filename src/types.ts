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
    [key: string]: MatchData[];
}
