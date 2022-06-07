import { useEffect, useRef, useState } from 'react';
import './App.css';
import Table from './DynamicTable/Table';
import './api'
import { getAPIData } from './api';
import { Pagination } from './components/Pagination';
import { getLocalStorage, saveToLocalStorage, sortAsec, sortDesc, validateData } from './utils';

const theadData = ["Name", "Price", "Fall in price"];

const localStorageData = getLocalStorage('tableData')

const defaultValues = {
  keyword: localStorageData?.keyword ? localStorageData.keyword : '',
  bodyData: localStorageData?.bodyData ? localStorageData.bodyData : [],
  pageNum: localStorageData?.pageNum ? localStorageData.pageNum : 1,
  isAscending: true,
  tableDataRef: localStorageData?.refData ? localStorageData.refData : []
}

function App() {
  const [keyword, setKeyword] = useState(defaultValues.keyword);
  const [bodyData, setBodyData] = useState(defaultValues.bodyData);
  const [pageNum, setPageNum] = useState(defaultValues.pageNum);
  const [isAscending, setIsAscending] = useState(defaultValues.isAscending);
  const tableDataRef = useRef(defaultValues.tableDataRef);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let temp = tableDataRef.current?.filter(({ items }) => validateData(items.join('')).indexOf(validateData(keyword)) > -1);
    if (temp.length === 0 && tableDataRef.current.length !== 0) {
      setNotFound(true)
    }
    else {
      setNotFound(false)
    }
    saveToLocalStorage('tableData', { keyword })
    setBodyData(temp)
  }, [keyword])

  const getData = async () => {
    const tdata = await getAPIData(pageNum)
    let sortedData = isAscending ? sortAsec(tdata) : sortDesc(tdata)
    tableDataRef.current = sortedData;
    setBodyData(sortedData)
    return new Promise((res, reject) => res(sortedData))
  }

  useEffect(() => {
    if (pageNum !== localStorageData?.pageNum)
      getData().then(() => saveToLocalStorage('tableData', { pageNum, bodyData, refData: tableDataRef.current }))
  }, [pageNum])


  const handleSorting = () => {
    setIsAscending(prev => !prev)
    let sortedData = isAscending ? sortDesc(bodyData) : sortAsec(bodyData)
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
      {tableDataRef.current?.length === 0 ? <p className='title'>Loading...</p> : <Table theadData={theadData} tbodyData={bodyData} handleSorting={handleSorting} isAscending={isAscending} />}
      {notFound && <p className='error'> {keyword} is not found, please try again with some other keyword !!</p>}
    </div>
  );
}

export default App;
