export const getTeacherData=(username:string)=>{
  console.log(username);
  return [{
    time:"112-1",
    updateTime:"-",
    state:"尚未填寫",
    comment:"blablabla",
  },{
    time:"111-2",
    updateTime:"2023/03/15",
    state:"尚未送出",
    comment:"dfdfasfdsf",
  },{
    time:"110-2",
    updateTime:"2022/06/23",
    state:"已送出",
    comment:"blala",
  },{
    time:"110-1",
    updateTime:"2021/01/20",
    state:"已送出",
    comment:"blabbla",
  },];
}

export const getIDPMetaData=()=>{
  return [{
    time:"112-1",
    // updateTime:"2023/05/15",
    released:false,
    note:"40/200",
    version:1,
  },{
    time:"111-2",
    // updateTime:"2023/03/15",
    released:true,
    note:"60/200",
    version:5,
  },{
    time:"110-2",
    // updateTime:"2022/06/23",
    released:true,
    note:"100/170",
    version:4,
  },{
    time:"110-1",
    // updateTime:"2021/01/20",
    released:true,
    note:"200/200",
    version:1,
  },];
}