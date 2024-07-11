import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'
const Line = ({hist}) => {
    const [data,setdata]=useState([["Date","Prices"]])
    useEffect(()=>{
let datacopy=[["Date","Prices"]]
if(hist.prices){
    hist.prices.map((item)=>{
        datacopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]])
    })
    setdata(datacopy)
}
    },[hist])
  return (
    <Chart
    chartType='LineChart'
    data={(data)}
    height="100%"
    legendToggle
    />

    
  )
}

export default Line