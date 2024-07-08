import {BotSelection, Gamestate} from '../models/gamestate';

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

    makeMove(gameState: Gamestate): BotSelection {
        if(gameState.rounds.length == 0){
            return this.getRandomMove();
        }

        let previousOpponentMoves = gameState.rounds.map((r) => r.p2);

        let moveCounts = {'R': 1, 'P': 1, 'S': 1, 'D': 1, 'W': 1};
        previousOpponentMoves.forEach((move) => moveCounts[move]++);

        let transitionCounts = {};
        for(const moveA of moves) {
            for (const moveB of moves) {
                let twoGram = moveA.concat(moveB);
                transitionCounts[twoGram] = 0;
            }
        }
        for(let i = 0; i < previousOpponentMoves.length-1; i++){
            let twoGram = previousOpponentMoves[i].concat(previousOpponentMoves[i+1]);
            transitionCounts[twoGram]++;
        }
        let likelihoods = {};
        for(const moveA of moves) {
            for(const moveB of moves) {
                let twoGram = moveA.concat(moveB);
                likelihoods[twoGram] = transitionCounts[twoGram] / moveCounts[moveA];
            }
        }

        let mostLikelyOpponentNextMove = 'P';
        let maxLikelihood = 0;
        let lastOpponentMove = gameState.rounds[gameState.rounds.length - 1].p2;
        for(const move of moves){
            let twoGram = lastOpponentMove.concat(move);
            if(likelihoods[twoGram] > maxLikelihood){
                maxLikelihood = likelihoods[twoGram];
                mostLikelyOpponentNextMove = move;
            }
        }

        if(mostLikelyOpponentNextMove == 'P'){
            return 'S';
        }
        if(mostLikelyOpponentNextMove == 'S'){
            return 'R';
        }
        if(mostLikelyOpponentNextMove == 'R'){
            return 'P';
        }
        if(mostLikelyOpponentNextMove == 'D'){
            return 'W';
        }
        if(mostLikelyOpponentNextMove == 'W') {
            return 'P';
        }
    }
}

export = new Bot();
