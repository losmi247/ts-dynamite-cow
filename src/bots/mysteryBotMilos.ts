import {BotSelection, Gamestate, Round} from '../models/gamestate';

const moves: BotSelection[] = ['R', 'P', 'S', 'D', 'W'];
const drawThreshold = 2;

class Bot {
    dynamitesUsed: number = 0;

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

    getRandomRockPaperScissorsMove() {
        return moves[this.getRandomIntInRange(0,2)];
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
        let previousPlayerMoves =  gameState.rounds.map((r) => r.p1);

        let consecutiveDraws = 0;
        for(let i = 0; i < previousOpponentMoves.length; i++) {
            if(previousOpponentMoves[previousOpponentMoves.length - 1 - i] != previousPlayerMoves[previousPlayerMoves.length - 1- i]){
                break;
            }
            consecutiveDraws++;
        }
        if(consecutiveDraws >= drawThreshold && this.dynamitesUsed < 100) {
            if(previousOpponentMoves[previousOpponentMoves.length - 1] == 'D'){
                if(Math.random() <= 0.5){
                    return 'W';
                }
                else{
                    this.dynamitesUsed++;
                    return 'D';
                }
            }
            this.dynamitesUsed++;
            return "D";
        }

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

        switch(mostLikelyOpponentNextMove) {
            case 'P': {
                return 'S';
            }
            case 'S': {
                return 'R';
            }
            case 'R': {
                return 'P';
            }
            case 'D': {
                return 'W';
            }
            case 'W': {
                return this.getRandomRockPaperScissorsMove();
            }
            default: {
                return 'S';
            }
        }
    }
}

export = new Bot();
