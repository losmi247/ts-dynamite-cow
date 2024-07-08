import {BotSelection, Gamestate} from "./gamestate";

export default class opponentStatistics {
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