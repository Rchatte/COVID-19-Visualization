import React from "react"

import LineGraphImg from "../images/LineGraph.png"
import TreeMapImg from "../images/TreeMap.png"
import Defualt from "../images/NoImg.png"


export const DATA = [
    {
        title: "USA Facts",
        graphs: [
            {
                type: "line-chart-USA-FACTS-total-over-time",
                title: "US COVID-19 Deaths Over Time",
                img: LineGraphImg,
                description: "Total COVID-19 Deaths in the USA over time",
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
                title: "US COVID-19 Deaths By State",
                description: "Data provided by static usafacts For COVID-19 Deaths in each state and county",
                img: TreeMapImg,
                link1: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
                filters: {
                    color: "color",
                    height: 400,
                    width: 800,
                },
            },

            {
                type: "line-chart-USA-FACTS-total-over-time",
                title: "US COVID-19 Cases Over Time",
                img: LineGraphImg,
                description: "Total COVID-19 Cases in the USA over time",
                link1: "https://static.usafacts.org/public/data/covid-19/covid_confirmed_usafacts.csv",
                link2: "",
                filters: {
                    color: "color",
                    height: 400,
                    width: 800,
                },
            },

            {
                type: "tree-map",
                title: "US COVID-19 Cases By State",
                description: "Data provided by static usafacts For COVID-19 Cases in each state and county",
                img: TreeMapImg,
                link1: "https://static.usafacts.org/public/data/covid-19/covid_confirmed_usafacts.csv",
                filters: {
                    color: "color",
                    height: 400,
                    width: 800,
                },
            },


            {
                type: "World_Map",
                title: "US COVID-19 Cases By Country",
                description: "Data provided by static usafacts For COVID-19 Cases in each state and county",
                img: TreeMapImg,
                link1: "https://static.usafacts.org/public/data/covid-19/covid_confirmed_usafacts.csv",
                filters: {
                    color: "color",
                    height: 400,
                    width: 800,
                },
            },

            {
                type: "graph-type",
                img: Defualt,
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
                type: "line-chart-USA-FACTS-total-over-time",
                title: "Title",
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
                title: "Title",
                link1: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
                filters: {
                    color: "color",
                    height: 400,
                    width: 800,
                },
            },
            {
                type: "graph-type",
                title: "Title",
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
                type: "line-chart-USA-FACTS-total-over-time",
                title: "Title",
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
                title: "Title",
                link1: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
                filters: {
                    color: "color",
                    height: 400,
                    width: 800,
                },
            },
            {
                type: "graph-type",
                title: "Title",
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
                type: "line-chart-USA-FACTS-total-over-time",
                title: "Title",
                link1: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
                link2: ""
            },
            {
                type: "tree-map",
                title: "Title",
                link1: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv"
            },
            {
                type: "graph-type",
                link1: ""
            }
        ]
    },
]