import React from "react"

import img1 from "../images/CDC.png"


export const DATA = [
    {
        title: "USA Facts",
        graphs: [
            {
                type: "line-chart",
                img: img1,
                description: "Data provided by static.usafacts via Line Chart. X and Y axis are available for edit and much more.",
                link1: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
                link2: "",
                filters: {
                    color: "color",
                    height: 400,
                    width: 800,
                },
            },
            {
                type: "tree-map",
                description: "Data provided by static.usafacts via Tree map. X and Y axis are available for edit and much more.",
                img: img1,
                link1: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
                filters: {
                    color: "color",
                    height: 400,
                    width: 800,
                },
            },
            {
                type: "graph-type",
                img: img1,
                description: "Data provided by static.usafacts. X and Y axis are available for edit and much more.",
                link1: "",
                filters: {
                    color: "color",
                    height: 400,
                    width: 800,
                },
            }
        ]
        
    },
    {
        title: "World Health Organization",
        graphs: [
            {
                type: "line-chart",
                link1: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
                link2: "",
                filters: {
                    color: "color",
                    height: 400,
                    width: 800,
                },
            },
            {
                type: "tree-map",
                link1: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
                filters: {
                    color: "color",
                    height: 400,
                    width: 800,
                },
            },
            {
                type: "graph-type",
                link1: "",
                filters: {
                    color: "color",
                    height: 400,
                    width: 800,
                },
            }
        ]
    },
    {
        title: "CDC",
        filters: {
            color: "color",
            height: 400,
            width: 800,
        },
        graphs: [
            {
                type: "line-chart",
                link1: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
                link2: "",
                filters: {
                    color: "color",
                    height: 400,
                    width: 800,
                },
            },
            {
                type: "tree-map",
                link1: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
                filters: {
                    color: "color",
                    height: 400,
                    width: 800,
                },
            },
            {
                type: "graph-type",
                link1: "",
                filters: {
                    color: "color",
                    height: 400,
                    width: 800,
                },
            }
        ]
    },
    {
        title: "California Department of Public Health",
        filters: {
            color: "color",
            height: 400,
            width: 800,
        },
        graphs: [
            {
                type: "line-chart",
                link1: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
                link2: ""
            },
            {
                type: "tree-map",
                link1: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv"
            },
            {
                type: "graph-type",
                link1: ""
            }
        ]
    },
]