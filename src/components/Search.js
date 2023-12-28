import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Search = ({ datas }) => {
  const [selected, setSelected] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [checkedData, setCheckedData] = useState([]);

  const [test, setTest] = useState([]);


  //Local Storage - Keep checkedData
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selected', JSON.stringify(selected));
      localStorage.setItem('checkedData', JSON.stringify(checkedData));
    }
  }, [selected, checkedData]);

  const storedSelected = JSON.parse(localStorage.getItem('selected')) || [];
  const storedCheckedData = JSON.parse(localStorage.getItem('checkedData')) || [];
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSelected(storedSelected);
      setCheckedData(storedCheckedData);
    }
  }, []);
  
  // Default Data Display

  useEffect(() => {
    const formattedData = datas.map((data) => ({ id: uuidv4(), title: data }));
    setSearchData(formattedData);
    setTest(formattedData)
  }, [datas]);

 
  // Clicks and Changes

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleRadioClick = (id) => {
    const newSelected = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];

    setSelected(newSelected);
    
    setCheckedData((prevCheckedData) => {
      const index = prevCheckedData.findIndex((item) => item.id === id);
      if (index !== -1) {
        return [...prevCheckedData.slice(0, index), ...prevCheckedData.slice(index + 1)];
      } else {
        const newItem = searchData.find((item) => item.id === id);
        return [...prevCheckedData, newItem];
      }
    }); 
  };


  const handleButtonClick = (e) => {
    e.preventDefault()

    if (searchQuery.trim() === "") {
      setSearchData(test);
    } else {
      const filteredData = test.filter((data) =>
        data.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const filteredAndUncheckedData = filteredData.filter((data) => !selected.includes(data.id));
    setSearchData(filteredAndUncheckedData);
    }
  };


  // mapping - Conditional displays

  return (
    <div>
      <div>
        <h2 className="text-lg font-semibold text-gray-700">Kategoriler</h2>
      </div>
      <div className="mt-5">
        <div className="flex justify-between search-input p-2 rounded-lg bg-white">
          <input
            type="text"
            placeholder="kategori ara.."
            className="ml-2 focus:outline-none text-gray-600"
            onChange={handleSearchChange}
          />
          <img src="/search.svg" alt="search-logo" className="mr-2 " />
        </div>
      </div>
      <form className="data-container mt-6">
        {checkedData.map((data) => (
          <div key={data.id} className="m-4">
            <input
              type="radio"
              checked={selected.includes(data.id)}
              id={data.id}
              onClick={() => handleRadioClick(data.id)}
              onChange={() => {}}
            />
            <label
              htmlFor={data.id}
              className={selected.includes(data.id) ? "label-style ml-4" : "ml-4 font-medium text-gray-600"}
            >
              {data.title}
            </label>
          </div>
        ))}
        {searchData.map((data) => (
        !selected.includes(data.id) && (
          <div key={data.id} className="m-4">
            <input
              type="radio"
              checked={selected.includes(data.id)}
              id={data.id}
              onClick={() => handleRadioClick(data.id)}
              onChange={() => {}}
            />
            <label
              htmlFor={data.id}
              className={selected.includes(data.id) ? "label-style ml-4" : "ml-4 font-medium text-gray-600"}
            >
              {data.title}
            </label>
          </div>
        )
      ))}
      </form>
      <div className="mt-10 flex justify-center">
        <button className="rounded-lg bg-blue-500 text-white" onClick={handleButtonClick}>Ara</button>
      </div>
    </div>
  );
};

export default Search;