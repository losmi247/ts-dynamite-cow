import {Gamestate, BotSelection, Round} from '../models/gamestate';
import {getScoreOfGame} from "../scoring/score";

class BotWithHistory{
    makeMove: ((gameState: Gamestate) => BotSelection)
    predictions: BotSelection[];
    hypotheticalScore: number;
}

// -------------------------------------------------------------------------------------------------------------------------------------------------------
// Testing Bots





// -------------------------------------------------------------------------------------------------------------------------------------------------------


class AggregateBot {
    bots: BotWithHistory[];

    makeMove(gameState: Gamestate): BotSelection {
        let bestScore = -Infinity;
        let bestBot = null;
        for(const bot of this.bots){
            const hypotheticalRoundsWithBot:Round[] = gameState.rounds.map((round, roundIndex)=>({
                p1: bot.predictions[roundIndex],
                p2: round.p2
            }))
            const hypotheticalGameStateWithBot:Gamestate = {rounds:hypotheticalRoundsWithBot};
            bot.hypotheticalScore = getScoreOfGame(hypotheticalGameStateWithBot)

            if(bot.hypotheticalScore>bestScore){
                bestScore=bot.hypotheticalScore;
                bestBot=bot;
            }
        }

        for(const bot of this.bots){
            bot.predictions.push(bot.makeMove(gameState))
        }

        return bestBot.predictions[-1];
    }
}

export const bot = new AggregateBot();


