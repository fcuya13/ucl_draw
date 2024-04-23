from UCLTeam import UCLTeam

class Match:
    def __init__(self, match_id, team1: UCLTeam, team2: UCLTeam, matchday):
        self.match_id = match_id
        self.home = team1
        self.away = team2
        self.matchday = matchday

    def __str__(self):
        return f'{self.match_id} | {self.home} vs {self.away} - Jornada {self.matchday}'