
import { useData } from './useData';
import DateHistogram from './DateHistogram';
import "./style.css"

const Main = ({width, height}) => {
    const data = useData();

    if (!data) {
        return <pre>Loading...</pre>;
    }

    return (
      <DateHistogram data={data} width={width} height={height}/>
    );
}

export default Main
