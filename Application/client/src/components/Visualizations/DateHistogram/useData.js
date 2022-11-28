import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/Fran-cis-co/536ed3e040df355e7f5ef8f2ff201f67/raw/a645dd4eb77d994a9a0dbd99e4e75bd4f58fa0eb/WHO-COVID-19-global-data.csv';

const row = d => {
    d['Cumulative_cases'] = +d['Cumulative_cases'];
    d['Date_reported'] = new Date(d['Date_reported']);
    return d;
}

export const useData = () =>{
    const [data, setData] = useState(null);
    
    useEffect(() => {
      csv(csvUrl, row).then(setData);
    }, []);
    return data
};