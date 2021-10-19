import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  const [listData, setData] = useState([]);
  // 部門總數
  const [positionTotalData, setPositionTotalData] = useState([]);
  // 下拉顯示
  const [collapseData, setCollapseData] = useState([]);
  // 區域顯示
  const [showData, setShowData] = useState([]);
  const [showTeamData, setShowTeamData] = useState(false);
  // 修改部門資料
  const [showMTeamData, setShowMTeamData] = useState([]);
  const [MName, setMName] = useState('');
  // 修改職位資料
  const [showMPData, setShowMPData] = useState([]);
  const [MPName, setMPName] = useState('');
  const [MPCount, setMPCount] = useState(0);
  // 新增資料
  const [pName, setpName] = useState('');
  const [pCount, setpCount] = useState(0);
  const [TName, setTName] = useState('');
  // checkbox
  const [showCheckedData, setCheckedData] = useState([]);
  const [positionBooleanData, setPositionBooleanData] = useState([]);
  const fetchMyAPI = async () => {
    let response = await fetch('/api');
    response = await response.json();
    // all data
    setData(response.teams);
    // 部門總數
    const positionTotalArr = new Array(response.teams.length).fill(0);
    setPositionTotalData(positionTotalArr);
    // 區域顯示
    const teamsArr = new Array(response.teams.length).fill(false);
    setShowData(teamsArr);
    // 部門checkbox
    setPositionBooleanData(teamsArr);
    // 修改部門資料
    const teamsMArr = new Array(response.teams.length).fill(false);
    setShowMTeamData(teamsMArr);
    // 修改職位資料, 先 deep copy, 再 foreach replace false
    let deep_copy_data = JSON.parse(JSON.stringify(response.teams));
    deep_copy_data.forEach((obj, index, arr) => {
      delete obj.name;
      obj.jobs.map((o, subindex, subArr) => (
        subArr[subindex] = false
      ));
    });
    setShowMPData(deep_copy_data);
    // checkbox
    let deep_copy_checked_data = JSON.parse(JSON.stringify(response.teams));
    deep_copy_checked_data.forEach((obj, index, arr) => {
      delete obj.name;
      obj.jobs.map((o, subindex, subArr) => (
        subArr[subindex] = false
      ));
    });
    setCheckedData(deep_copy_checked_data);
    // 下拉顯示
    setCollapseData(teamsArr);
  }
  useEffect(() => {
    fetchMyAPI()
  }, [])
  // 區域顯示
  const showArea = e => {
    const getIdx = e.currentTarget.dataset.index;
    showData[getIdx] = !showData[getIdx];
    const newShowArea = [...showData];
    setShowData(newShowArea);
  }
  const showTeamArea = () => {
    const getState = !showTeamData;
    setShowTeamData(getState);
  }
  // 下拉顯示
  const showCollapse = e => {
    const getIdx = e.currentTarget.dataset.index;
    collapseData[getIdx] = !collapseData[getIdx];
    const newShowArea = [...collapseData];
    setCollapseData(newShowArea);
  }
  // 新增職位/部門
  const addNewPosition = e => {
    const getIdx = e.currentTarget.dataset.index;
    const newData = [...listData];
    newData[getIdx].jobs.push({
      name: pName,
      count: parseInt(pCount)
    });
    setData(newData);
  }
  const addNewTeam = () => {
    const newData = [...listData];
    newData.push({
      name: TName,
      jobs: []
    });
    setData(newData);
  }
  // 修改部門資料
  const modifyTeamName = e => {
    const getIdx = e.currentTarget.dataset.index;
    showMTeamData[getIdx] = !showMTeamData[getIdx];
    const newShowArea = [...showMTeamData];
    setShowMTeamData(newShowArea);
  }
  const cancelModifyTeam = e => {
    const getIdx = e.currentTarget.dataset.index;
    showMTeamData[getIdx] = !showMTeamData[getIdx];
    const newShowArea = [...showMTeamData];
    setShowMTeamData(newShowArea);
  }
  const ModifyTeam = e => {
    const getIdx = e.currentTarget.dataset.index;
    const newData = [...listData];
    newData[getIdx].name = MName;
    setData(newData);
    showMTeamData[getIdx] = !showMTeamData[getIdx];
    const newShowArea = [...showMTeamData];
    setShowMTeamData(newShowArea);
  }
  // 修改職位資料
  const modifyPName = e => {
    const subIdx = e.currentTarget.id;
    const idx = e.currentTarget.className;
    showMPData[idx].jobs[subIdx] = !showMPData[idx].jobs[subIdx];
    const newShowArea = [...showMPData];
    setShowMPData(newShowArea);
  }
  const ModifyPosition = e => {
    const getSubIdx = e.currentTarget.dataset.index;
    const getIdx = e.currentTarget.className;
    const newData = [...listData];
    newData[getIdx].jobs[getSubIdx].name = MPName;
    newData[getIdx].jobs[getSubIdx].count = parseInt(MPCount);
    setData(newData);
    showMPData[getIdx].jobs[getSubIdx] = !showMPData[getIdx].jobs[getSubIdx];
    const newShowArea = [...showMPData];
    setShowMPData(newShowArea);
  }
  // checkbox
  const handleCheck = (e) => {
    const getSubIdx = e.currentTarget.id;
    const getIdx = e.currentTarget.className;
    showCheckedData[getIdx].jobs[getSubIdx] = !showCheckedData[getIdx].jobs[getSubIdx];
    let num = parseInt(positionTotalData[getIdx]);
    if (showCheckedData[getIdx].jobs[getSubIdx] === true) {
      num += listData[getIdx].jobs[getSubIdx].count;
    } else {
      num -= listData[getIdx].jobs[getSubIdx].count;
    }
    const newArr = [...positionTotalData];
    newArr[getIdx] = num;
    setPositionTotalData(newArr);
  }
  const handleAllCheck = (e) => {
    const getIdx = e.currentTarget.id;
    positionBooleanData[getIdx] = !positionBooleanData[getIdx];
    let num = parseInt(positionTotalData[getIdx]);
    if (positionBooleanData[getIdx] === true) {
      for (let i = 0; i < listData[getIdx].jobs.length; i++) {
        num += listData[getIdx].jobs[i].count;
      }
    } else {
      num = 0;
    }
    const newArr = [...positionTotalData];
    newArr[getIdx] = num;
    setPositionTotalData(newArr);
  }
  return (
    <div className="App">
      <h1>Opening Jobs</h1>
      <ul>
        {listData.map((data, idx) => {
          return (
        <li key={idx}>
          <label style={{ 'display': !showMTeamData[idx] ? 'inline-block' : 'none' }}>
            <input id={idx} type="checkbox" onChange={handleAllCheck} /> {data.name} [{positionTotalData[idx]}]
          </label>
          <label style={{ 'display': showMTeamData[idx] ? 'block' : 'none' }}>
            <input type="text" onChange={e => setMName(e.target.value)} />
            <button data-index={idx} onClick={ModifyTeam}>Ok</button>
            <button data-index={idx} onClick={cancelModifyTeam}>Cancel</button>
          </label>
          <button data-index={idx} onClick={modifyTeamName}>Modify</button>
          <button data-index={idx} onClick={showCollapse}>Collapse</button>
          <ul data-index={collapseData[idx]} style={{ 'display': collapseData[idx] ? 'block' : 'none' }}>
            {data.jobs.map((subData, subIdx) => {
              return (
                <li key={`${idx}${subIdx}`}>
                    {
                      showMPData[idx] &&
                      <>
                      <label id={subIdx} className={idx} style={{ 'display': !showMPData[idx].jobs[subIdx] ? 'inline-block' : 'none' }}>
                        <input id={subIdx} className={idx} type="checkbox" onChange={handleCheck} /> {subData.name} [{subData.count}]
                      </label>
                      <label id={subIdx} className={idx} style={{ 'display': showMPData[idx].jobs[subIdx] ? 'block' : 'none' }}>
                        <input type="text" onChange={e => setMPName(e.target.value)} />
                        <input type="text" onChange={e => setMPCount(e.target.value)} />
                        <button className={idx} data-index={subIdx} onClick={ModifyPosition}>Ok</button>
                        <button className={idx} data-index={subIdx}>Cancel</button>
                      </label>
                      <button id={subIdx} className={idx} onClick={modifyPName}>Modify</button>
                      </>
                    }
                </li>
              )})
            }

            <li data-index={showData[idx]} style={{ 'display': showData[idx] ? 'block' : 'none' }}>
              <input type="text" placeholder="Position name" onChange={e => setpName(e.target.value)} />
              <input type="text" placeholder="Position count" onChange={e => setpCount(e.target.value)} />
              <button data-index={idx} onClick={addNewPosition}>Ok</button>
              <button>Cancel</button>
            </li>
            <li>
              <button data-index={idx} onClick={showArea}>+ New Position</button>
            </li>
          </ul>
        </li>
        )})}
        <li style={{ 'display': showTeamData ? 'block' : 'none' }}>
          <input type="text" placeholder="Team name" onChange={e => setTName(e.target.value)} />
          <button onClick={addNewTeam}>Ok</button>
          <button>Cancel</button>
        </li>
        <li>
          <button onClick={showTeamArea}>+ New Team</button>
        </li>
      </ul>
      <button>Save</button>
      <button onClick={fetchMyAPI}>Reset</button>
    </div>
  );
}

export default App;
