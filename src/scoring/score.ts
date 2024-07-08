import { Round } from '../models/gamestate';

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