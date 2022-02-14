import './style.css'
import Experience from "./experience/Experience";

let experience = new Experience("experience")
window.experience = experience

/*
import './style.css'
import * as d3 from 'd3'
import { line } from 'd3';

let svg = d3.select('#experience')

var width = 500,
    height = 500,
    rows = 32,
    cols = 5;

const sizes = 
{
    width: window.innerWidth,
    height: window.innerHeight
}

svg.attr('width', sizes.width)
    .attr('height', sizes.height)
    */
/*
let circle = svg.append('circle')
            .attr('r', 10)
            .attr('fill', 'white')
            .attr('cx', '50%')
            .attr('cy', '50%')


const expandCircle =() => 
{
    circle.transition()
        .duration(1000)
        .attr('r', 75)
        .on('end', contractCircle)
}

const contractCircle =() => 
{
    circle.transition()
        .duration(1000)
        .attr('r', 10)
        .on('end', expandCircle)
}
*/
/** 
const path = d3.path()
path.moveTo(0,0);
path.lineTo(100, 100)
path.lineTo(200, 200)


svg.append('path')
    .attr('d', path)
    .attr('stroke', 'white')
*/
/*
const getDummyData = (size, start, range) =>
{
    let data = []
    let yInc = sizes.height/size;
    for(let i = 0; i < size + 1; i++)
    {
        data.push([Math.floor(Math.random() * range) + start, yInc * i])
    }
    return data
}

const getDummyDataY = (size, start, range) =>
{
    let data = []
    let yInc = sizes.height/size;
    for(let i = 0; i < size + 1; i++)
    {
        data.push([yInc * i, Math.floor(Math.random() * range) + start])
    }
    return data
}


let sLine = d3.line()

const range = 30
const totalPoints = 20
const speed = 100

const squiggleLineX = (path, start) =>
{
    path
        .transition()
        .ease(d3.easeLinear)
        .attr('d', sLine(getDummyData(totalPoints, start, range)))
        .duration(speed)
        .on('end', () => {squiggleLineX(path, start)})
}

for(let i = 0; i < 10; i++)
{
    let width = sizes.width/10
    let start = (i + 1) * width
    let data = getDummyData(totalPoints, start, range)


    let path = svg.append('path')
            .attr('d', sLine(data))
            .attr('stroke', 'white')
            .attr('fill', 'none')
            .attr('stroke-width', '1px')

    squiggleLineX(path, start)
}

const squiggleLineY = (path, start) =>
{
    path
        .transition()
        .ease(d3.easeLinear)
        .attr('d', sLine(getDummyDataY(totalPoints, start, range)))
        .duration(speed)
        .on('end', () => {squiggleLineY(path, start)})
}

for(let i = 0; i < 10; i++)
{
    let height = sizes.height/10
    let start = (i + 1) * height
    let data = getDummyDataY(totalPoints, start, range)


    let path = svg.append('path')
            .attr('d', sLine(data))
            .attr('stroke', 'white')
            .attr('fill', 'none')
            .attr('stroke-width', '1px')

    squiggleLineY(path, start)
}

svg.append('text')
    .attr('fill', 'white')
    .attr('x', '50%')
    .attr('y', '50%')
    .attr('size', '20px')
    .text("i'm okay.")

expandCircle()
*/