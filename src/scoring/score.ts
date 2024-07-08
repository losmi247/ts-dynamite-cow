import { Round, BotSelection, Gamestate } from '../models/gamestate';

export function getScoreOfRound(round:Round):number{
    let {p1: player1Move, p2: player2Move}=round;
    const movesThatBeat={
        'R':['P', 'D'],
        'P':['S', 'D'],
        'S':['R', 'D'],
        'W':['R', 'P', 'S'],
        'D':['W']
    }

    if(movesThatBeat[player2Move].includes(player1Move)){
        return 1;
    }
    else if(movesThatBeat[player1Move].includes(player2Move)){
        return -1;
    }
    return 0;
}

export function getScoreOfGame(gameState:Gamestate):number{
    const p1Moves = gameState.rounds.map((round)=>round.p1);
    const p2Moves = gameState.rounds.map((round)=>round.p2);

    function tooMuchDynamite(playerMoves:BotSelection[]) {
        return playerMoves.filter(x => x == 'D').length > 100;
    }

    if(tooMuchDynamite(p1Moves) && tooMuchDynamite(p2Moves)){
        console.error("Not Implemented. Both players have used over 100 dynamite.")
        throw new Error;
    }
    if(tooMuchDynamite(p1Moves)){
        return -Infinity;
    }
    if(tooMuchDynamite(p2Moves)){
        return Infinity;
    }

    let scoringRollover = 1;
    let score = 0;

    for(const round of gameState.rounds){
        const roundScore = getScoreOfRound(round);
        if(roundScore==0){
            scoringRollover+=1;
        }
        else{
            score+=roundScore * scoringRollover;
            scoringRollover = 1;
        }
    }
    return score;
}