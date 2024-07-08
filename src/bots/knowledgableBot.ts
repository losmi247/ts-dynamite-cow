import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    private p2Statistics= new opponentStatistics();
    makeMove(gamestate: Gamestate): BotSelection {
        this.p2Statistics.updateStatistics(gamestate);
        if(this.p2Statistics.totalRockMovesProportion > 0.5) return 'P';
        else if(this.p2Statistics.totalPaperMovesProportion > 0.5) return 'S';
        else if(this.p2Statistics.totalScissorsMovesProportion > 0.5) return 'R';
        else if(this.p2Statistics.totalDynamiteMovesProportion > 0.5) return 'W';
        else if(this.p2Statistics.totalWaterBalloonMovesProportion > 0.5) return 'P';
        else return 'S';
    }
}

export = new Bot();

class opponentStatistics {
    public totalMoves: number;

    public totalRockMoves: number;
    public totalPaperMoves: number;
    public totalScissorsMoves: number;
    public totalWaterBalloonMoves: number;
    public totalDynamiteMoves: number;

    public totalRockMovesProportion: number;
    public totalPaperMovesProportion: number;
    public totalScissorsMovesProportion: number;
    public totalWaterBalloonMovesProportion: number;
    public totalDynamiteMovesProportion: number;


    public constructor() {
        this.totalMoves = 0;
        this.totalRockMoves = 0;
        this.totalPaperMoves = 0;
        this.totalScissorsMoves = 0;
        this.totalWaterBalloonMoves = 0;
        this.totalDynamiteMoves = 0;
    }

    public updateStatistics(gamestate : Gamestate){
        if(gamestate.rounds.length === 0) return;
        const opponentPreviousMove = gamestate.rounds[gamestate.rounds.length - 1].p2;
        this.updateTotalMoves(opponentPreviousMove);
        this.updateMovesPercentage();
    }

    private updateTotalMoves(move: BotSelection){
        this.totalMoves++;
        switch(move){
            case 'R': {
                this.totalRockMoves++;
                break;
            }
            case 'P': {
                this.totalPaperMoves++;
                break;
            }
            case 'S': {
                this.totalScissorsMoves++;
                break;
            }
            case 'D': {
                this.totalScissorsMoves++;
                break;
            }
            case 'W': {
                this.totalWaterBalloonMoves++;
                break;
            }
            default: {
                break;
            }
        }
    }

    private updateMovesPercentage(){
        this.totalRockMovesProportion = this.totalRockMoves / this.totalMoves;
        this.totalPaperMovesProportion = this.totalPaperMoves / this.totalMoves;
        this.totalScissorsMovesProportion = this.totalScissorsMoves / this.totalMoves;
        this.totalDynamiteMovesProportion = this.totalDynamiteMoves / this.totalMoves;
        this.totalWaterBalloonMovesProportion = this.totalWaterBalloonMoves / this.totalMoves;
    }
}