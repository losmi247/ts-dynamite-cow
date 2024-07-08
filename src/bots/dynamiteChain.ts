import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    private drawCount = 0;
    private dynamiteCount = 0;
    private arrayOfMoves: BotSelection[] = ['R', 'P', 'S']
    makeMove(gamestate: Gamestate): BotSelection {
        if(this.drawCount === 6 && this.dynamiteCount <= 99) {
            this.dynamiteCount++;
            this.drawCount = 0;
            return 'D';
        }
        const ind: number =
            Math.floor(Math.random() * this.arrayOfMoves.length);
        const randomMove = this.arrayOfMoves[ind];
        const previousRound = gamestate.rounds[gamestate.rounds.length - 1];
        if(previousRound === undefined) return randomMove;
        if(previousRound.p1 === previousRound.p2) {
            this.drawCount++;
        }
        else{
            this.drawCount = 0;
        }
        return randomMove;
    }
}

export = new Bot();
