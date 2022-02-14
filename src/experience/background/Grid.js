import { svg } from "d3";
import Experience from "../Experience";
import Point from "../util/Point";
import SquigglyLine from "./SquigglyLine";

export default class Grid
{
    constructor(yAxisLines)
    {
        this.experience = new Experience()
        this.xAxisLines = yAxisLines
        this._wiggleSpeed = 1000
        this._wiggleRange = 10
        this._wiggleSegments = 60
        this._xAxisLines = []
        this._yAxisLines = []
        this.draw()
    }

    setWiggleSpeed(wiggleSpeed)
    {
        this._wiggleSpeed = wiggleSpeed <= 0 ? 1 : wiggleSpeed
        this.updateParams()
    }

    setWiggleRange(wiggleRange)
    {
        this.wiggleRange = wiggleRange
        this.updateParams()
    }

    setWiggleSegments(wiggleSegments)
    {
        this._wiggleRange = wiggleSegments
        this.updateParams()
    }

    setWiggleParams(wiggleSpeed, wiggleRange, wiggleSegments)
    {
        this._wiggleSpeed = wiggleSpeed <= 0 ? 1 : wiggleSpeed
        this._wiggleRange = wiggleRange
        this._wiggleSegments = wiggleSegments
        this.updateParams()
    }

    updateSizes()
    {
        this._xAxisLines.forEach(line => line.endPoint = new Point(line.endPoint.x, this.experience.sizes.height))
        this._yAxisLines.forEach(line => line.endPoint = new Point(this.experience.sizes.width, line.endPoint.y))
    }

    updateParams()
    {
        this._xAxisLines.forEach(line => 
            {
                line.totalPoints = this._wiggleSegments
                line.wiggleRange = this._wiggleRange
                line.wiggleSpeed = this._wiggleSpeed
            })
        this._yAxisLines.forEach(line => 
            {
                line.totalPoints = this._wiggleSegments
                line.wiggleRange = this._wiggleRange
                line.wiggleSpeed = this._wiggleSpeed
            })
    }

    redraw()
    {
        this.experience.svg.selectAll('path').remove()
        this._xAxisLines = []
        this._yAxisLines = []
        this.draw()
    }

    draw()
    {
        let lineDist = this.experience.sizes.width/(this.xAxisLines + 1)
        for(let i = 0; i < this.xAxisLines + 2; i++)
        {
            let line = new SquigglyLine(new Point(lineDist * (i), 0),
                            new Point(lineDist * (i), this.experience.sizes.height),
                            this._wiggleSegments,
                            this._wiggleRange,
                            this._wiggleSpeed)
            this._xAxisLines.push(line)
        }
        //new SquigglyLine(new Point(0, 100), new Point(this.experience.sizes.width, 100), 10, 10)
        let yAxisLines = 1/this.experience.sizes.aspectRatio *  this.xAxisLines 
        let yStart = yAxisLines % 1 / 2
        for(let i = 0; i < yAxisLines; i++)
        {
            let line = new SquigglyLine(new Point(0, lineDist * (i+1) - yStart * lineDist),
                            new Point(this.experience.sizes.width, lineDist * (i+1) - yStart * lineDist),
                            this._wiggleSegments,
                            this._wiggleRange,
                            this._wiggleSpeed)
                
            this._yAxisLines.push(line)
        }
    }
}