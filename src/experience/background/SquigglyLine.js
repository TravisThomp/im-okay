import Experience from "../Experience"
import * as d3 from 'd3'
import Point from "../util/Point"
import { range, thresholdScott } from "d3"

export default class SquigglyLine
{
    //Point startPoint
    //Point endPoint
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

    //u//pdate(this.startPoint)

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

    //Ended up hard coding perp. lines so fix when you feel like making the code better
    _getRandomPoints()
    {
        let data = []
        let xLength = (this.endPoint.x - this.startPoint.x) 
        let yLength = (this.endPoint.y - this.startPoint.y)

        let changeX = xLength / (this.totalPoints - 1)
        let changeY = yLength / (this.totalPoints - 1)
        let slope = xLength/yLength
        
        
        for(let i = 0; i < this.totalPoints; i++)
        {
            let x = this.startPoint.x + (i * changeX)
            let y = this.startPoint.y + (i * changeY)
            let point = null
            
            if(changeX == 0)
            {
                let point1 = new Point(x - (this.wiggleRange/2), y)
                let point2 = new Point(x + (this.wiggleRange/2), y)
                
                point = this._getRandomPointOnLine(point1, point2)
            }
            else if(changeY == 0)
            {
                let point1 = new Point(x, y - (this.wiggleRange/2))
                let point2 = new Point(x, y + (this.wiggleRange/2))
                point = this._getRandomPointOnLine(point1, point2)
            }
            
            data.push([point.x, point.y])
        }
        return data
    }
}