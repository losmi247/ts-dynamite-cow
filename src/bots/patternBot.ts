import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {

    private pattern: BotSelection[] = ["R", "P", "S"];
    private index = 0;

    makeMove(gamestate: Gamestate): BotSelection {
        this.index = (this.index + 1) % this.pattern.length;
        return this.pattern[this.index];
    }
}

export = new Bot();