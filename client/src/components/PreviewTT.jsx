import { Component } from "react";
import React from "react";
import "../styles/Timetable.css";

const ntw=require("number-to-words");
class PreviewTT extends Component
{
    constructor(props)
    {
        super(props);  
        this.populateTimetable.bind(this);
        this.gridArray = []; 
    }
    populateTimetable(coursesAdded)
    {
        var gridList = [
            ["Time",1,2,3,4,5,6,7,8,9,10],
            ["Monday",0,0,0,0,0,0,0,0,0,0],
            ["Tuesday",0,0,0,0,0,0,0,0,0,0],
            ["Wednesday",0,0,0,0,0,0,0,0,0,0],
            ["Thursday",0,0,0,0,0,0,0,0,0,0],
            ["Friday",0,0,0,0,0,0,0,0,0,0],
            ["Saturday",0,0,0,0,0,0,0,0,0,0]
        ];
       
        let Map = {};
        Map['M'] =1;
        Map['T'] = 2;
        Map['W'] = 3;
        Map['Th'] = 4;
        Map['F'] = 5;
        Map['S'] = 6;
         
        let divStyle = {};
        var days=['M','T','W','Th','F','S'];
        var hours= [1,2,3,4,5,6,7,8,9,10];
        var day,hour;
        for(day of days)
        {
            for(hour of hours)
            {
                divStyle = {};
                let section=this.props.TimeTable[day][ntw.toWords(hour)];
                console.log(section);
                let str = "";
                if(gridList[Map[day]][hour] === -1)
                {
                    continue;
                }
                else if(!section.courseCode)
                {
                   str = <div style={{
                        backgroundColor: '#444444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}>
                        {' '}<br></br>
                        {' '}<br></br>
                        {' '}<br></br>
                    </div>
                }
                else
                { 
                    if(section.numHours > 1)
                    {
                        for(let i = 1; i< section.numHours; i++)
                        {
                            gridList[Map[day]][hour+i] = -1;
                        }
                        divStyle = 
                        {
                            gridRowStart: `${hour+1}`,
                            gridColumnStart: `${Map[day]+1}`,
                            gridCoulmnEnd: `${Map[day]+2}`,
                            gridRowEnd: `span ${section.numHours}`
                         }
                    }
                    
                    str =
                    <div className="gridItem" style={divStyle}>
                        {section.courseName}<br></br>
                        {section.courseCode}<br></br>
                        {section.sectionRoom}<br></br>
                    </div>;
                }
            
                gridList[Map[day]][hour] = str;
            }
        }
        for(let i = 0; i <=6; i++)
        {
            for(let j = 0; j <=10;j++)
            {
             if(j === 0 || i === 0)
             {
                gridList[i][j] = 
                    <div style={{
                                backgroundColor: "#222222",
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color:'white'
                        }}>
                        {gridList[i][j]}
                    </div>
                
                }
            }
        }
            return gridList;
    }
    render()
    {
       console.log(this.props.TimeTable);
       this.gridArray = this.populateTimetable();
       let divsToRender = [];
       for(let i = 0; i<= 10;i++)
       {
           for(let j = 0; j<=6; j++)
           {
               if(this.gridArray[j][i] === -1);
               else{
               divsToRender.push(
                    <>
                        {this.gridArray[j][i]}
                    </>
                    );
               }
            }
        }
        console.log(divsToRender);
        return (
            <div className = "gridElement" >
                {divsToRender}
            </div>
        );
    }
}
export default PreviewTT;