import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    private p2Statistics= new opponentStatistics();
    private dynamiteCount = 0;
    makeMove(gamestate: Gamestate): BotSelection {
        this.p2Statistics.updateStatistics(gamestate);
        const randomRoll = Math.random() + 0.1;
        if(randomRoll < this.p2Statistics.getProportionalTotalMoves('R')){
            return 'P';
        }
        else if(randomRoll < this.p2Statistics.getProportionalTotalMoves('R') + this.p2Statistics.getProportionalTotalMoves('P')){
            return 'S';
        }
        else if(randomRoll < this.p2Statistics.getProportionalTotalMoves('R') + this.p2Statistics.getProportionalTotalMoves('P') + this.p2Statistics.getProportionalTotalMoves('S')){
            return 'R';
        }
        else{
            if(this.dynamiteCount<100){
                this.dynamiteCount++;
                return 'D';
            }
            return 'P';
        }

    }
}

export = new Bot();

class opponentStatistics {
    public totalMoves: number = 0;

    public totalMovesDictionary:{[K in BotSelection]:number} = {
            'R': 0,
            'P': 0,
            'S': 0,
            'D': 0,
            'W': 0
    };

    public constructor() {
    }

    public updateStatistics(gamestate : Gamestate){
        if(gamestate.rounds.length === 0) return;
        const opponentPreviousMoves: BotSelection = gamestate.rounds[gamestate.rounds.length - 1].p2;
        this.totalMovesDictionary[opponentPreviousMoves]++;
        this.totalMoves++;
    }

    public getProportionalTotalMoves(move : BotSelection){
        return this.totalMovesDictionary[move] / this.totalMoves;
    }
}