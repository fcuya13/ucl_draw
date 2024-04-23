# UCLTeam class version 1, not optimal

class UCLTeam:
    def __init__(self, id, name, logo, abv, bombo):
        self.id = id
        self.name = name
        self.logo = logo
        self.abv = abv
        self.bombo = bombo
        self.rivals = set()
        self.__bombo1rivals = 0
        self.__bombo2rivals = 0
        self.__bombo3rivals = 0
        self.__bombo4rivals = 0

    def __str__(self):
        return f'{self.name} ({self.abv}) - Bombo {self.bombo}'


    def possible_matchup(self, rival):
        if len(self.rivals) == 8:
            return False
        if rival.bombo == 1 and self.__bombo1rivals >= 2:
            return False
        if rival.bombo == 2 and self.__bombo2rivals >= 2:
            return False
        if rival.bombo == 3 and self.__bombo3rivals >= 2:
            return False
        if rival.bombo == 4 and self.__bombo4rivals >= 2:
            return False

        return rival not in self.rivals

    def add_rival(self, rival):
        self.rivals.add(rival)
        if rival.bombo == 1:
            self.__bombo1rivals += 1
        elif rival.bombo == 2:
            self.__bombo2rivals += 1
        elif rival.bombo == 3:
            self.__bombo3rivals += 1
        elif rival.bombo == 4:
            self.__bombo4rivals += 1


    def restart(self):
        self.__bombo1rivals = 0
        self.__bombo2rivals = 0
        self.__bombo3rivals = 0
        self.__bombo4rivals = 0
        self.rivals.clear()