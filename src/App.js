import { useEffect, useRef, useState } from 'react';
import './App.css';
import Table from './DynamicTable/Table';
import './api'
import { getAPIData } from './api';
import { Pagination } from './components/Pagination';
import { sortAsec, sortDesc, validateData } from './utils';

const theadData = ["Name", "Price", "Percent"];

function App() {
  const [keyword, setKeyword] = useState('')
  const [bodyData, setBodyData] = useState([])
  const [pageNum, setPageNum] = useState(1);
  const [isAscending, setIsAscending] = useState(false)
  const tableDataRef = useRef([]);
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let temp = tableDataRef.current?.filter(({ items }) => validateData(items.join('')).indexOf(validateData(keyword)) > -1);
    if (temp.length === 0 && tableDataRef.current.length !== 0) {
      setNotFound(true)
    }
    else {
      setNotFound(false)
    }
    setBodyData(temp)
  }, [keyword])

  const getData = async () => {
    const tdata = await getAPIData(pageNum)
    let sortedData = isAscending ? sortDesc(tdata) : sortAsec(tdata)
    tableDataRef.current = sortedData;
    setBodyData(sortedData)
  }

  useEffect(() => {
    getData()
  }, [pageNum])

  const handleSorting = () => {
    setIsAscending(prev => !prev)
    let sortedData = isAscending ? sortAsec(bodyData) : sortDesc(bodyData)
    setBodyData(sortedData)
  }

  const resetSearch = () => { setKeyword('') }

  const handlePrev = async () => {
    setPageNum(prev => prev - 1)
    resetSearch();
  }

  const handleNext = async () => {
    setPageNum(prev => prev + 1)
    resetSearch();
  }



  return (
    <div className='table-wrapper'>
      <h2 className='title'>Dynamic Table</h2>
      <div className='filter-container'>
        <input type="search" className='search-box' value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Search..." title="Type in a name" />
        <Pagination pageNum={pageNum} handleNext={handleNext} handlePrev={handlePrev} />
      </div>
      {tableDataRef.current.length === 0 ? <p className='title'>Loading...</p> : <Table theadData={theadData} tbodyData={bodyData} handleSorting={handleSorting} isAscending={isAscending} />}
      {notFound && <p className='error'> {keyword} is not found, please try again with some other keyword !!</p>}
    </div>
  );
}

export default App;
