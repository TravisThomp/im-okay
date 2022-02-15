import Experience from "../Experience"
import * as d3 from 'd3'
import Point from "../util/Point"

export default class SquigglyLine
{
    constructor(startPoint, endPoint, totalPoints, wiggleRange, wiggleSpeed)
    {
        this.experience = new Experience()
        this.startPoint = startPoint
        this.endPoint = endPoint
        this.totalPoints = totalPoints
        this.wiggleRange = wiggleRange
        this.wiggleSpeed = wiggleSpeed
        this.line = d3.line()

        this.draw()
    }


    draw()
    {
        let data = this._getRandomPoints()
        
        this.path = this.experience.svg.append('path')
            .attr('d',  this.line(data))
            .attr('stroke', 'white')
            .attr('fill', 'none')
            .attr('stroke-width', '1px')
        
        this._animate()
    }

    _animate()
    {
        this.path.transition()
            .ease(d3.easeLinear)
            .attr('d', this.line(this._getRandomPoints()))
            .duration(this.wiggleSpeed)
            .on('end', () => {this._animate()})
    }

    _getRandomPointOnLine(point1, point2)
    {
        let xRange = point2.x - point1.x
        let yRange = point2.y - point1.y
        
        let x = 0
        let y = 0

        if(xRange == 0)
        {
            x = point1.x
            y = Math.floor(Math.random() * yRange) + point1.y

        }
        else if(yRange == 0)
        {
            x = Math.floor(Math.random() * xRange) + point1.x
            y = point1.y
        }
        
        return new Point(x, y)
    }

    _getLinePerpendicular(point, rateOfChange)
    {
        const line =
        {
            start: null,
            end: null
        }

        if(rateOfChange.x == 0)
        {
            line.start = new Point(point.x - (this.wiggleRange/2), point.y)
            line.end = new Point(point.x + (this.wiggleRange/2), point.y)
        }
        else if(rateOfChange.y == 0)
        {
            line.start = new Point(point.x, point.y - (this.wiggleRange/2))
            line.end = new Point(point.x, point.y + (this.wiggleRange/2))
        }
        else
        {
            // Implement if ever needed lol.
        }

        return line
    }

    _getRandomPoints()
    {
        let data = []

        const length = {
            x: this.endPoint.x - this.startPoint.x,
            y: this.endPoint.y - this.startPoint.y
        }

        const rateOfChange = {
            x: length.x / (this.totalPoints - 1),
            y: length.y / (this.totalPoints - 1)      
        }

        
        for(let i = 0; i < this.totalPoints; i++)
        {
            let squigglePoint = new Point(this.startPoint.x + (i * rateOfChange.x), this.startPoint.y + (i * rateOfChange.y))

            // Get a point perpendicular to full line at point        
            let perpendicularLine = this._getLinePerpendicular(squigglePoint, rateOfChange)       
            let squiggleLocation = this._getRandomPointOnLine(perpendicularLine.start, perpendicularLine.end) 
            
            data.push([squiggleLocation.x, squiggleLocation.y])
        }
        return data
    }
}