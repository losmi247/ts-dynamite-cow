import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {

    private oddMove = true;

    makeMove(gamestate: Gamestate): BotSelection {
        if (this.oddMove) {
            this.oddMove = false;
            return "P";
        } else {
            this.oddMove = true;
            return "R";
        }
    }
}

export = new Bot();
