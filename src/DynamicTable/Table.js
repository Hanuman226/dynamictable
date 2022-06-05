import TableRow from "./TableRow";
import TableHeadItem from "./TableHead";
import './table.module.css'

const Table = ({ theadData, tbodyData, customClass, isAscending, handleSorting }) => {
    return (
        <table className={customClass}>
            <thead>
                <tr>
                    {theadData.map((h, i) => {
                        return <TableHeadItem key={h} item={h} handleSort={handleSorting} isAscending={isAscending} showArrow={i === 0} />;
                    })}
                </tr>
            </thead>
            <tbody>
                {tbodyData.map((item) => {
                    return <TableRow key={item.id} data={item.items} />;
                })}
            </tbody>
        </table>
    );
};

export default Table;