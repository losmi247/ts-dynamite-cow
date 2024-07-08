import { Gamestate, BotSelection } from '../models/gamestate';

const moves: BotSelection[] = ['R', 'P', 'S', 'D', 'W'];

class Bot {
    dynamitesUsed: number;

    constructor() {
        this.dynamitesUsed = 0;
    }

    getRandomIntInRange(low: number, high: number) {
        const lowCeiled = Math.ceil(low);
        const highFloored = Math.floor(high);
        return Math.floor(Math.random() * (highFloored - lowCeiled + 1) + lowCeiled);
    }

    getNonDynamiteRandomMove() {
        let nextMove = moves[this.getRandomIntInRange(0,4)];
        while(nextMove == 'D'){
            nextMove = moves[this.getRandomIntInRange(0,4)];
        }
        return nextMove;
    }

    getRandomMove() {
        let nextMove = moves[this.getRandomIntInRange(0,4)];
        if(nextMove == 'D'){
            this.dynamitesUsed++;
        }
        return nextMove;
    }

    makeMove(gamestate: Gamestate): BotSelection {
        if(this.dynamitesUsed == 100){
            return this.getNonDynamiteRandomMove();
        }
        else{
            return this.getRandomMove();
        }
    }
}

export = new Bot();
