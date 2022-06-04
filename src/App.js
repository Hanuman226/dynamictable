import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import Table from './DynamicTable/Table';
import './api'
import { getAPIData } from './api';
const theadData = ["Name", "Price", "Percent"];
const tbodyData = [
  {
    id: "1",
    items: ["John", "$500000", "100%"]
  },
  {
    id: "2",
    items: ["Sally", "$35000", "50%"]
  },
  {
    id: "3",
    items: ["Maria", "$5550", "40%"]
  },
  {
    id: "4",
    items: ["Ravina", "$50745", "600%"]
  },
  {
    id: "5",
    items: ["Krish", "$96000", "70%"]
  },
].sort((a, b) => a?.items[0].toLowerCase().localeCompare(b?.items[0].toLowerCase()));



function App() {
  const [keyword, setKeyword] = useState('')
  const [bodyData, setBodyData] = useState(tbodyData)
  const [isLoading, setIsLoading] = useState(true)
  const tableDataRef = useRef(tbodyData);

  const [pageNum, setPageNum] = useState(1);
  const [isAscending, setIsAscending] = useState(true)


  useEffect(() => {
    let temp = tableDataRef.current.filter(item => item.items.join('').toLowerCase().indexOf(keyword.trim().toLowerCase()) > -1)
    setBodyData(temp)
  }, [keyword])



  const handleSorting = () => {
    setIsAscending(prev => !prev)

    if (isAscending) {
      setBodyData([...bodyData].sort((a, b) => b?.items[0].toLowerCase().localeCompare(a?.items[0].toLowerCase())));
    }
    else {
      setBodyData([...bodyData].sort((a, b) => a?.items[0].toLowerCase().localeCompare(b?.items[0].toLowerCase())));
    }
  }

  const Pagination = ({ number }) => {

    const handlePrev = async () => {
      console.log({ isLoading })
      setPageNum(prev => prev - 1)
      const tdata = await getAPIData(pageNum)
      setIsLoading(false)
      tableDataRef.current = tdata.sort((a, b) => a?.items[0].toLowerCase().localeCompare(b?.items[0].toLowerCase()))
      setBodyData(tdata)
      console.log({ tdata, isLoading })

    }

    const handleNext = async () => {
      console.log({ isLoading })
      setPageNum(prev => prev + 1)
      const tdata = await getAPIData(pageNum)
      setIsLoading(false)
      tableDataRef.current = tdata.sort((a, b) => a?.items[0]?.toLowerCase().localeCompare(b?.items[0].toLowerCase()))
      setBodyData(tdata)
      console.log({ tdata, isLoading })
    }

    return (
      <div className='pagination'>
        <button className='btn' onClick={handlePrev} disabled={pageNum === 1}>Prev</button>
        <button className='btn' disabled>{number}</button>
        <button className='btn' onClick={handleNext} disabled={pageNum === 5}>Next</button>
      </div>
    )
  }


  return (
    <div className='table-wrapper'>
      <div className='filter-container'>
        <input type="search" className='search-box' value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Search..." title="Type in a name" />
        <Pagination number={pageNum} />
      </div>
      <Table theadData={theadData} tbodyData={bodyData} handleSorting={handleSorting} isAscending={isAscending} />

    </div>
  );
}

export default App;
