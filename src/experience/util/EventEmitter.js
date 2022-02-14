import { map } from "d3";

export default class EventEmitter
{

    constructor()
    {
        this.eventMap = new Map()
    }

    createEvent(event, funct)
    {
        this.eventMap.set(event, [funct])
    }

    trigger(event)
    {
        let toDo = this.eventMap.get(event)
        if(toDo != null)
        {
            for(let i = 0; i < toDo.length; i++)
            {
                toDo[i]()
            }
        }
     
    }

    on(event, action)
    {
        if(this.eventMap.has(event))
        {
            this.eventMap.get(event).push(action)
        }
        else
        {
            this.eventMap.set(event, [action])
        }
    }
}