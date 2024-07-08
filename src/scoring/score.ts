import { Round } from '../models/gamestate';

export function scoreRound(round:Round):number{
    switch(round){
        case {p1:'R', p2:'R'}:{
            return 0;
        }
        case {p1:'R', p2:'P'}:{
            return -1;
        }
        case {p1:'R', p2:'S'}:{
            return 1;
        }
        case {p1: 'P', p2:'R'}:{
            return 1;
        }
        case {p1: 'P', p2:'P'}:{
            return 0;
        }
        case {p1: 'P', p2:'S'}:{
            return -1;
        }
        case {p1: 'S', p2:'R'}:{
            return -1;
        }
        case {p1: 'S', p2:'P'}:{
            return 1;
        }
        case {p1: 'S', p2:'S'}:{
            return 0;
        }
        case {p1: 'D', p2:'D'}:{
            return 0;
        }
        case {p1: 'W', p2:'W'}:{
            return 0;
        }
        case {p1: 'D', p2:'W'}:{
            return -1;
        }
        case {p1: 'W', p2: 'D'}: {
            return 1;
        }
        default: {
            if (round.p1 == 'D' || round.p2 == 'W') {
                return 1;
            }
            if (round.p2 == 'D' || round.p1 == 'W') {
                return -1;
            }
        }
    }
}