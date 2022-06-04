export const Pagination = ({ pageNum, handlePrev, handleNext }) => {

    return (
        <div className='pagination'>
            <button className='btn' onClick={handlePrev} disabled={pageNum === 1}>Prev</button>
            <button className='btn' disabled>{pageNum}</button>
            <button className='btn' onClick={handleNext} disabled={pageNum === 5}>Next</button>
        </div>
    )
}
