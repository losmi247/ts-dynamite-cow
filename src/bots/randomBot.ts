import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {

    private dynamiteCount: number = 0;
    private options: BotSelection[] = ['R' , 'P' , 'S' , 'W' , 'D']

    makeMove(gamestate: Gamestate): BotSelection {
        if (this.dynamiteCount < 100) {
            const index = Math.floor(Math.random() * this.options.length);
            const selection = this.options[index];
            if (selection == 'D') {
                this.dynamiteCount += 1;
            }
            return selection;
        } else if (this.dynamiteCount == 100) {
            this.options = ['R' , 'P' , 'S' , 'W'];
            const index = Math.floor(Math.random() * this.options.length);
            const selection = this.options[index];
            return selection;
        } else {
            const index = Math.floor(Math.random() * this.options.length);
            const selection = this.options[index];
            return selection;
        }
    }
}

export = new Bot();
