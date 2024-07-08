import { Gamestate, BotSelection } from '../models/gamestate';

enum strategies {
    Oppose,
    Copy,
    Random
}

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

        const strategy =  Math.floor(Math.random() * 3);
        const lastOpponentMove = gamestate.rounds.slice(-1)[0].p2;

        if (strategy == strategies.Oppose) {
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

        if (strategy == strategies.Copy) {
            if (lastOpponentMove == "D") {
                if (this.dynamiteCount == 100) {
                    return this.chooseRandomMove();
                }
                this.dynamiteCount += 1;
            }
            return lastOpponentMove;

        }
            return this.chooseRandomMove();
    }
}

export = new Bot();
