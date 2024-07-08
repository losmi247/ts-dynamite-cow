import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {

    private firstMove = true;
    private options: BotSelection[] = ['R' , 'P' , 'S' , 'W' , 'D']

    private dynamiteCount: number = 0;

    chooseRandomMove(): BotSelection {
        const index = Math.floor(Math.random() * this.options.length);
        const selection = this.options[index];
        if (selection == 'D') {
            this.dynamiteCount += 1;
        }
        return selection;
    }

    makeMove(gamestate: Gamestate): BotSelection {

        if (this.dynamiteCount == 100) {
            this.options = ['R' , 'P' , 'S' , 'W'];
        }

        if (this.firstMove) {
            this.firstMove = false;
            return this.chooseRandomMove();
        }

        const lastOpponentMove = gamestate.rounds.slice(-1)[0].p2;

        switch (lastOpponentMove) {
            case "R": {
                return "P";
            }
            case "P": {
                return "S";
            }
            case "S": {
                return "R"
            }
            case "D": {
                return "W";
            }
            default: {
                return this.chooseRandomMove();
            }
        }
    }

}

export = new Bot();
