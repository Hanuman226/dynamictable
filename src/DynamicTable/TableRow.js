import { Currency, ProgressBar } from "../components/ProgressBar";

const TableRow = ({ data }) => {
    const renderCell = (item) => {


        if (item?.indexOf('%') > -1)
            return <td key={item}><ProgressBar percent={item} /></td >;

        else if (item?.indexOf('$') > -1)
            return <td key={item}>  <Currency value={item} /></td>;

        return <td key={item}>{item}</td>;
    }

    return (
        <tr>
            {data.map((item) => {
                return renderCell(item);
            })}
        </tr>
    );
};

export default TableRow;