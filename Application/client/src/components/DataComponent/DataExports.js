import React from "react"
import LineGraphImg from "../images/LineGraph.png"
import TreeMapImg from "../images/TreeMap.png"
import Defualt from "../images/NoImg.png"

import img1 from "../images/USAFacts.png"
import img2 from "../images/WHO.png"
import img3 from "../images/CDC.png"
import img4 from "../images/CDPH.png"


{
    /*
    Each 'type' value should be unique when updating a graph.
    */
}

export const DATA_UPDATE = {
    USA: [
        {
            title: 'US COVID-19 Deaths Over Time',
            graph_desc: 'Line Chart',
            graph_type: 'line-chart',
            description: 'Deaths over time chart description..',
            image: '',
            link_source: 'https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv',
            filters: {
                requires_dates: 'true',
                end_date: '',
                start_date: '',
            },
        },
        {
            title: 'US COVID-19 Deaths By State', // Title to be shown
            graph_desc: 'Tree Map', // Graph type to be shown
            graph_type: 'tree-map_percent_of_pop', // To differentiate from other graph types
            description: 'Deaths over time chart description..', // To be shown
            image: '', // If needed link to image 
            link_source: 'https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv', // Source for associated graph
            filters: {
                requires_dates: 'true',
                color1: '#014f86',
                color2: '#468faf',
                color3: '#013a63',
                height: 400,
                width: 800,
            },
        },
        {
            title: 'US COVID-19 Cases Over Time',
            graph_desc: 'Line Chart',
            graph_type: 'line-chart',
            description: 'Cases over time chart description..',
            image: '',
            link_source: 'https://static.usafacts.org/public/data/covid-19/covid_confirmed_usafacts.csv',
            filters: {
                requires_dates: 'true',
                end_date: '',
                start_date: '',
            },
        },
        {
            title: 'US COVID-19 Cases By State', // Title to be shown
            graph_desc: 'Tree Map', // Graph type to be shown
            graph_type: 'tree-map_percent_of_pop', // To differentiate from other graph types
            description: 'Cases over time chart description..', // To be shown
            image: '', // If needed link to image 
            link_source: 'https://static.usafacts.org/public/data/covid-19/covid_confirmed_usafacts.csv', // Source for associated graph
            filters: {
                requires_dates: 'true',
                color1: '#014f86',
                color2: '#468faf',
                color3: '#013a63',
                height: 400,
                width: 800,
            },
        },
    ],
    WORLDWIDE: [
        {
            title: "Country's Happiness Vs. Mortality",
            graph_desc: 'Tree Map',
            graph_type: 'tree-map',
            description: 'Measure of Happiness in a Country and Mortality Rate in said Country',
            image: '',
            link_source: 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv',
            filters: {
                color1: "#ff2200",
                color2: '',
                color3: '',
                continents: ''
            },
        },
        {
            title: 'COVID-19 Deaths and Percent of Population Over 60',
            graph_desc: 'Tree Map',
            type: 'tree-map_percent_of_pop',
            graph_type: 'tree-map_percent_of_pop',
            description: 'Amount of Worldwide COVID-19 Deaths and Percent of Population Over 60 in said Country',
            image: '',
            link_source: 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv',
            filters: {
                color1: '',
                color2: '',
                color3: '',
            },

        },
        {
            title: 'COVID-19 Cases VS People Vaccinated Worldwide',
            graph_desc: 'Tree Map',
            description: 'Amount of Worldwide COVID-19 Cases and amount of vaccinations in said Country',
            image: '',
            link_source: 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv',
            filters: {
                color1: '#014f86',
                color2: '#468faf',
                color3: '#013a63',
            },

        },
        {
            title: 'COVID-19 Deaths and People Fully Vaccinated',
            graph_desc: 'Tree Map',
            description: 'Amount of Worldwide COVID-19 Deaths and amount of people fully vaccinated said Country',
            image: '',
            link_source: 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv',
            filters: {
                color1: '#014f86',
                color2: '#468faf',
                color3: '#013a63',

            },

        },
        {
            title: "Country's Freedom Score And Total COVID-19 Cases",
            graph_desc: 'Tree Map',
            description: "Country's quality of freedom and amount of COVID-19 cases in said Country",
            image: '',
            link_source: 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv',
            filters: {
                color1: "#ff2200",
                color2: '',
                color3: '',

            },

        },
        {
            title: "Country's Freedom Score And Total COVID-19 Deaths",
            graph_desc: 'Tree Map',
            description: "Country's quality of freedom and amount of COVID-19 deaths in said Country",
            image: '',
            link_source: 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv',
            filters: {
                color1: '',
                color2: '',
                color3: '',

            },

        },
        {
            title: "Country's Median Age Vs COVID-19 Deaths",
            graph_desc: 'Tree Map',
            description: "Median Age of people in a Country and amount of COVID-19 deaths in said Country",
            image: '',
            link_source: 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv',
            filters: {
                color1: '#C0BFBF',
                color2: '#696769',
                color3: '#C0BFBF',
                continents : '',

            },

        },
        {
            title: 'COVID-19 Cases Per Million Vs Gross Domestic Product',
            graph_desc: 'Tree Map',
            description: 'The amount of COVID-19 cases per million and the amount of Gross Domestic Product per Country',
            image: '',
            link_source: 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv',
            filters: {
                color1: '',
                color2: '',
                color3: '',
                continents : '',

            },

        },
        {
            title: 'Gross Domestic Product Vs COVID-19 Deaths',
            graph_desc: 'Tree Map',
            description: 'The amount of Gross Domestic Product per Country and the amount of COVID-19 deaths',
            image: '',
            link_source: 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv',
            filters: {
                color1: '',
                color2: '',
                color3: '',
                continents: ''

            },

        },
        {
            title: "Country's Gross Domestic Product Affect On COVID-19 Vaccinations Per Hundred",
            graph_desc: 'Tree Map',
            description: 'The amount of Gross Domestic Product per Country and the amount of COVID-19 Vaccinations per hundred',
            image: '',
            link_source: 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv',
            filters: {
                color1: '',
                color2: '',
                color3: '',
                continents: ''

            },

        },
        {
            title: 'Urban Population Vs Total COVID-19 Cases Per Million',
            graph_desc: 'Tree Map',
            description: 'The Urban Population in each country and the amount of COVID-19 cases per million',
            image: '',
            link_source: 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv',
            filters: {
                color1: '',
                color2: '',
                color3: '',
                continents: ''


            },

        },
        {
            title: 'Urban Population Vs Total COVID-19 Deaths Per Million',
            graph_desc: 'Tree Map',
            description: 'The Urban Population in each country and the amount of COVID-19 deaths per million',
            image: '',
            link_source: 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv',
            filters: {
                color1: '',
                color2: '',
                color3: '',
                continents: ''

            },

        },
        {
            title: 'Total COVID-19 Cases Vs Personal Freedom Score',
            graph_desc: 'Tree Map',
            description: 'The amount of COVID-19 cases and the Personal Freedom Score of each country',
            image: '',
            link_source: 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv',
            filters: {
                color1: '',
                color2: '',
                color3: '',

            },

        },
        {
            title: 'Percent of Populations Using The Internet Vs COVID-19 Cases',
            graph_desc: 'Tree Map',
            description: 'The percent of population using the internet in 2020 and the amount of COVID-19 cases',
            image: '',
            link_source: 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv',
            filters: {
                color1: '',
                color2: '',
                color3: '',
                continents: ''

            },

        },
        {
            title: "Country's Happiness Vs COVID-19 Cases",
            graph_desc: 'Tree Map',
            description: "Each country's happiness score and the amount of COVID-19 cases",
            image: '',
            link_source: 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv',
            filters: {
                color1: '',
                color2: '',
                color3: '',
                continents: ''

            },
        },

    ]
}

export const DATA = [
    {
        title: "USA Facts",
        cover_image: img1,
        source: 'USAFacts is a non-profit organization and website that provides data and reports on the United States population, its governments finances, and governments impact on society. It was launched in 2017.',
        graphs: [
            {
                type: "line-chart",
                graph_type: 'death-over-time',
                title: "US COVID-19 Deaths Over Time",
                type_desc: 'Line Graph',
                description: "Total COVID-19 Deaths in the USA over time",
                link1: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
                link2: "",
                filters: {
                    requires_dates: 'true',
                    // endDate: "",
                    // startDate: "",
                    dateStart: "",
                    dateEnd: "",
                    color1: "#27b694",
                    color2: "#27b694",
                    color3: "#9B9B9B",
                    height: 400,
                    width: 800,

                },
            },
            {
                type: "tree-map",
                title: "US COVID-19 Deaths By State",
                graph_type: 'death-over-time',
                description: "Data provided by static usafacts For COVID-19 Deaths in each state and county",
                img: TreeMapImg,
                type_desc: 'Tree Map',
                link1: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
                filters: {
                    requires_dates: 'true',
                    endDate: "01-01-2023",
                    startDate: "01-01-2020",
                    color1: "#808080",
                    color2: "#818589",
                    color3: "#818589",
                    height: 400,
                    width: 800,
                    
                },
            },
            {
                type: "line-chart",
                title: "US COVID-19 Cases Over Time",
                graph_type: 'cases-over-time',
                img: LineGraphImg,
                type_desc: 'Line Chart',
                description: "Total COVID-19 Cases in the USA over time",
                link1: "https://static.usafacts.org/public/data/covid-19/covid_confirmed_usafacts.csv",
                link2: "",
                filters: {
                    requires_dates: 'true',
                    dateStart: "",
                    dateEnd: "",
                    color1: "#818589",
                    color2: "#818589",
                    height: 400,
                    width: 800,
                },
            },

            {
                type: "tree-map",
                title: "US COVID-19 Cases By State",
                description: "Data provided by static usafacts For COVID-19 Cases in each state and county",
                img: TreeMapImg,
                type_desc: 'Tree Map',
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
                type_desc: 'World Map',
                link1: "https://static.usafacts.org/public/data/covid-19/covid_confirmed_usafacts.csv",
                filters: {
                    color1: "#818589",
                    color2: "#818589",
                    height: 400,
                    width: 800,
                },
            },

            {
                type: "graph-type",
                img: Defualt,
                type_desc: 'Graph Map',
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
        cover_image: img2,
        source: 'The World Health Organization is a specialized agency of the United Nations responsible for international public health. Headquartered in Geneva, Switzerland, it has six regional offices and 150 field offices worldwide. The WHO was established on 7 April 1948.',
        graphs: [
            {
                type: "line-chart-USA-FACTS-total-over-time",
                title: "Title",
                type_desc: 'Line Graph',
                description: "USA Facts ttotal deaths over time",
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
                type_desc: 'Tree map',
                description: "Tree map relating to deaths over time",
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
        cover_image: img3,
        source: 'The Centers for Disease Control and Prevention is the national public health agency of the United States. It is a United States federal agency, under the Department of Health and Human Services, and is headquartered in Atlanta, Georgia.',
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
        cover_image: img4,
        source: 'The California Department of Public Health is the state department responsible for public health in California. It is a subdivision of the California Health and Human Services Agency. It enforces some of the laws in the California Health and Safety Codes, notably the licensing of some types of healthcare facilities.',
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