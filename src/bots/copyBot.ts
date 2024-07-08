import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {

    private firstMove = true;
    private options: BotSelection[] = ['R' , 'P' , 'S' , 'W' , 'D']

    makeMove(gamestate: Gamestate): BotSelection {
        if (this.firstMove) {
            this.firstMove = false;
            const index = Math.floor(Math.random() * this.options.length);
            return this.options[index];
        } else {
            const lastOpponentMove = gamestate.rounds.slice(-1)[0].p2;
            return lastOpponentMove;
        }
    }
}

export = new Bot();
