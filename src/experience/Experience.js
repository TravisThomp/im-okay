import * as d3 from 'd3'
import Sizes from './util/Sizes.js'
import ClickableText from './ClickableText.js'
import Grid from './background/Grid.js'

let instance = null

export default class Experience
{    
    constructor(_svgID)
    {   
        if(instance)
        {
            return instance
        }
        instance = this
        
        this.svg = d3.select('#' + _svgID) 
        this.sizes = new Sizes()

        this.sizes.on('resize', () => {this.onResize()})
        this.grid = new Grid(18)

        this.text = new ClickableText('i\'m okay.', 90)
        this.text.on('click', () => {this.onTextClick()})
    }

    onResize()
    {
        this.grid.redraw()
    }

    onTextClick()
    {
        this.grid.setWiggleParams(this.grid._wiggleSpeed-120, this.grid._wiggleRange+10, this.grid._wiggleSegments)
    }
}