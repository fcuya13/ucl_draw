# UCL Draw Generator (V1, not final)

import json
import urllib.parse
import boto3
import random
from UCLTeam import UCLTeam
from Match import Match
import os


def load_data(data, teams):
    for team in data:
        id = team['id']
        name = team['name']
        abv = team['abv']
        logo = team['logo']
        bombo = team['bombo']
        teams.append(UCLTeam(id, name, logo, abv, bombo))

    random.shuffle(teams)
    
    
def add_match(match_id, team1: UCLTeam, team2: UCLTeam, matchday):
    if team1.possible_matchup(team2) and team2.possible_matchup(team1):
        team1.add_rival(team2)
        team2.add_rival(team1)

        return Match(match_id, team1, team2, matchday)


def draw_matchdays(teams, matches):
    match_id = 1
    atts = 0
    matchday = 1
    
    while any(len(team.rivals) < 8 for team in teams):
        available_teams = teams.copy()
        while(available_teams):
            team_1 = random.choice(available_teams)
            team_2 = random.choice(available_teams)
            if team_1 != team_2:
                match = add_match(match_id, team_1, team_2, matchday)
                if match:
                    matches.append(match)
                    available_teams.remove(team_1)
                    available_teams.remove(team_2)
                    match_id += 1
            atts += 1
            if atts == 700:
                return False
        matchday += 1

    return True 


s3 = boto3.client('s3')


def lambda_handler(event, context):

    teams = []
    matches = []

    try:
        bucket = os.getenv('S3_BUCKET_NAME')
        key = os.getenv('S3_OBJECT_NAME')
        response = s3.get_object(Bucket=bucket, Key=key)
        data = json.load(response.get('Body'))
        load_data(data, teams)

    except Exception as e:
        print(e)
        raise e
    
    data_response = []
    
        
    while not draw_matchdays(teams, matches):
        for team in teams:
            team.restart()
            matches = []
            match_id = 1


    matchday_index = 1
    while matchday_index < 9:
        matchday_matches = []
        for match in matches:
            if match.matchday == matchday_index:
                matchday_matches.append({
                    "match_id": match.match_id,
                    "home_id": match.home.id,
                    "away_id": match.away.id
                })
        data_response.append({
            f"matchday_{matchday_index}":matchday_matches
        })
        matchday_index += 1


    return data_response

# Get Hall of Fame winners

import json
import redis
import os

def lambda_handler(event, context):
    # Connect to the Redis instance using the environment variables
    redis_host = os.environ['REDIS_HOST']
    redis_port = os.environ['REDIS_PORT']
    hall_of_fame = os.environ['HALL_OF_FAME']

    r = redis.Redis(host=redis_host, port=redis_port)

    response = r.zrange(hall_of_fame, 0, 9, desc=True, withscores=True)
    dataResponse = []
    for team in response:
        dataResponse.append(
            {
                'team': team[0],
                'times': team[1]
            })
            
    return dataResponse


# Increase Hall of Fame winner and views counter at the bottom

import json
import redis
import os

def lambda_handler(event, context):
    # Connect to the Redis instance using the environment variables
    redis_host = os.environ['REDIS_HOST']
    redis_port = os.environ['REDIS_PORT']
    body = json.loads(event['body'])
    team = body.get('winner')
    hall_of_fame = os.environ['HALL_OF_FAME']
    views_counter = os.environ['VIEWS_COUNTER']
    
    r = redis.Redis(host=redis_host, port=redis_port)

    r.zincrby(hall_of_fame, 1, team)
    
    r.setnx(views_counter, 0)
    r.incrby(views_counter, 1)


# Views getter 

import json
import redis
import os

def lambda_handler(event, context):
    # Connect to the Redis instance using the environment variables
    redis_host = os.environ['REDIS_HOST']
    redis_port = os.environ['REDIS_PORT']
    views_counter = os.environ['VIEWS_COUNTER']

    r = redis.Redis(host=redis_host, port=redis_port)

    value = r.get(views_counter)
    
    return {
        'body': value.decode('utf-8')
    }



    
