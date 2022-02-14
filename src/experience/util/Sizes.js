import { timeThursdays } from "d3"
import Experience from "../Experience"
import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()
        this.experience = new Experience()
        this.setSizes()

        this.createEvent('resize', () => {this.setSizes()})
        window.addEventListener('resize', () => {this.trigger('resize')})
    }

    setSizes()
    {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.aspectRatio = this.width/this.height

        this.experience.svg
            .attr('width', this.width)
            .attr('height', this.height)
    }
}