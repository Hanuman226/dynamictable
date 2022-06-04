
const TableHeadItem = ({ item, handleSort, isAscending, showArrow }) => {
    return (
        <td title={item} onClick={handleSort}>
            {item}{showArrow && < img src={isAscending ? require('../icons/down.png') : require('../icons/up.png')} alt='ascending' />}
        </td>
    );
};

export default TableHeadItem;