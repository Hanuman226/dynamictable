
const TableHeadItem = ({ item, handleSort, isAscending, showArrow }) => {
    return (
        <td title={item} onClick={handleSort}>
            {item}{showArrow && < img src={isAscending ? require('../icons/up.png') : require('../icons/down.png')} alt='ascending' />}
        </td>
    );
};

export default TableHeadItem;