import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios.get(`/api/values`).then((res) => {
      console.log(res.data);
      setLists(res.data);
    });
  }, []);

  const changeHandler = (e) => {
    setValue(e.currentTarget.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`/api/values`, { value: value })
      .then((res) => {
        console.log(res.data);
        setLists([...lists, res.data]);
        setValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <div className='container'>
          {lists &&
            lists.map((list, index) => <li key={index}>{list.value}</li>)}

          <br />
          <form className='example' onSubmit={submitHandler}>
            <input
              type='text'
              placeholder='입력해주세요'
              value={value}
              onChange={changeHandler}
            />
            <button type='submit'>확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
