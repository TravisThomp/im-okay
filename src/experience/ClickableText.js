import Experience from "./Experience";
import EventEmitter from "./util/EventEmitter";
import * as d3 from 'd3'

export default class ClickableText extends EventEmitter
{
    constructor(text, fontSize)
    {
        super()
        this.experience = new Experience()
        this.text = text
        this.fontSize = fontSize
        this.textElement = this.experience.svg.append('text')
        this.createEvent('click', () => { this.clicked()})
        
        this.drawText()
    }

    drawText()
    {
        this.textElement
            .attr('fill', 'white')
            .attr('x', '50%')
            .attr('y', '50%')
            .attr('font-size', this.fontSize + 'px')
            .attr('text-anchor', 'middle')
            .text(this.text)
        
        this.textElement.on('click', () => {this.trigger('click')})
    }

    clicked()
    {
        const fontIncrease = -10
        this.fontSize = this.fontSize + fontIncrease

        this.textElement
            .transition()
            .duration(300)
            .ease(d3.easeLinear)
            .attr('font-size', this.fontSize + 'px')
            .attr('text-anchor', 'middle')
            .attr('x', '50%')
            .attr('y', '50%')
            .attr('transform', 'translate(0px, ' + this.fontsize/2 + 'px)')

    }
}