import React, {Component, useState} from "react";
import axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sample1List, setSample1List] = useState([]);

  const componentDidMount = () =>{
    //_getData();
  }

  const _addData = async(e) => {
    e.preventDefault();

    const res = await axios('/add/data', {
      method : 'POST',
      data : { 
        'name' : name,
        'email' : email
     },
      headers: new Headers()
    });

    if(res.data) {
      alert('데이터를 추가했습니다.');
      return window.location.reload();
    }
  }

  const _getDataCSTMR = async () => {
    const res = await axios.get('/get/data/cstmr');
    setSample1List(res.data);
  }

  const _getDataSAMPLE1 = async () => {
    const res = await axios.get('/get/data/sample1');
    setSample1List(res.data);
  }

  const _getDataSAMPLE2 = async () => {
    const res = await axios.get('/get/data/sample2');
    setSample1List(res.data);
  }

  const _getKeywordData = async() => {
    const res = await axios('/get/keywordData',{
      method: 'POST',
      data :{
        'name' : name,
        'email' : email,
      },
      headers : new Headers()
    });
    setSample1List(res.data)
  }

  const _modify = async(el) => {
    const newName = prompt(el.name + '의 변경할 이름을 입력해주세요.')

    if(newName !== null){
      const dataToModify = {
        newName: newName,
        id: el.id
      }
      const res = await axios('/modify/data', {
        method: 'POST',
        data:{'modify' : dataToModify},
        headers: new Headers()
      })
  
      if(res.data){
        console.log(res.data[0]);
        alert('이름이 수정되었습니다.')
        return window.location.reload();
      }
    }
  }

  const _modifyMulti = async(el) => {
    const targetId = prompt('변경할 대상 ID를 입력해주세요.')
    const targetName = prompt('변경할 대상 이름을 입력해주세요.')
    const newName = prompt('변경할 대상들의 새로운 이름을 입력해주세요.')

    if(newName !== null){
      const dataToModify = {
        targetId : targetId,
        targetName : targetName,
        newName : newName
      }

      const res = await axios('/modify/multiData', {
        method : 'POST',
        data : {'modify' : dataToModify},
        headers: new Headers()
      })

      if(res.data){
        console.log(res.data[0]);
        alert('요청하신 대상들의 이름이 수정되었습니다.')
        return window.location.reload();
      }
    }
  }

  const _delete = async(el) => {
    const remove = window.confirm(el.name + '을 삭제하시겠습니까?')

    if(remove){
      const target = {id : el.id}
      const res = await axios('/delete/data', {
        method:'POST',
        data:{'delete' : target},
        headers: new Headers()
      })

      if(res.data){
        alert('데이터를 삭제했습니다.')
        return window.location.reload();
      }
    }
  }

  const _nameUpdate = (e) => {
    setName(e.target.value)
  }
  const _emailUpdate = (e) => {
    setEmail(e.target.value)
  }


  return (
  <div className='App'>
    <h3>Hello, You are testing React!</h3>
      <h4> Sample1 List </h4>
      <form method='POST' onSubmit={_addData}>
          <input type='text' maxLength='10' placeholder='name' onChange={(e) => _nameUpdate(e)}/>
          <input type='text' maxLength='20' placeholder='email' onChange={(e) => _emailUpdate(e)}/>
          <input type='submit' value='Add' />
      </form>

        <input type='text' maxLength='10' placeholder='검색키워드(name)' onChange={(e) => _nameUpdate(e)} />
        <input type='text' maxLength='20' placeholder='검색키워드(email)' onChange={(e) => _emailUpdate(e)}/>
        <button onClick={_getKeywordData}>Search</button>
        <button onClick={_getDataCSTMR}>CSTMR table</button>
        <button onClick={_getDataSAMPLE1}>SAMPLE1 table</button>
        <button onClick={_getDataSAMPLE2}>SAMPLE2 table</button>

      {sample1List.length !== 0 ? 
        sample1List.map( (el, key) => {
          return(
            <div key={key}>
              <span> ID: {el.id} </span>/
              <span> NAME: {el.name} </span>/
              <span> EMAIL: {el.email} </span>
              <button onClick={() => _modify(el)}>modify</button>
              <button onClick={() => _delete(el)}>delete</button>
            </div>
          )
        })
        : <div>데이터가 없습니다.</div>}

        <button onClick={_modifyMulti}>modify 여러개</button>

  </div> 
  );
}

export default App;
