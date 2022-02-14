import * as d3 from 'd3'
import SquigglyLine from './background/SquigglyLine.js'
import Sizes from './util/Sizes.js'
import Point from './util/Point.js'
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
        //new SquigglyLine(new Point(100, 0), new Point(100, this.sizes.height), 100, 10, 1000)

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