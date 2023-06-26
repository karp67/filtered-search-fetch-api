import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch("https://randomuser.me/api/?results=100");
      const jsonData = await response.json();
      setData(jsonData.results);
      setFilteredData(jsonData.results);
    };

    fetchdata();
  }, []);

  const filterDataHandler = (event) => {
    setInputText(event.target.value);
    filterData(event.target.value);
  };

  const filterData = (text) => {
    const filtered = data.filter((user) =>
      user.name.first.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const resetHandler = () => {
    setInputText("");
    setFilteredData([]);
  };

  return (
    <div className="app">
      <input
        value={inputText}
        type="text"
        placeholder="Search..."
        className="search"
        onChange={filterDataHandler}
      ></input>
      <button onClick={resetHandler}>Reset</button>
      <ul className="list">
        {filteredData.map((user) => (
          <li className="listItem">{user.name.first}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
