"use strict";(self.webpackChunkBrother_Industrises=self.webpackChunkBrother_Industrises||[]).push([[2478],{92121:(a,e,t)=>{t.d(e,{Bt:()=>i,eN:()=>r,ie:()=>s});var n=t(43971);async function i(){return n.A.fetchData({url:"v1/web/company/dashboard",method:"get"})}async function s(a){return n.A.fetchData({url:"v1/web/company/instrument/dashboard",method:"post",data:a})}async function r(){return n.A.fetchData({url:"v1/web/company/instrument/dashboard/static",method:"get"})}},92478:(a,e,t)=>{t.r(e),t.d(e,{default:()=>U});var n=t(65043),i=t(27176),s=t(79456),r=t(24603),o=t(50805),l=t(80907),d=t(92121);const c=(0,l.zD)("instrument/dashboard/data/CalibrationNearToMonth",async a=>{try{return await(0,d.ie)(a)}catch(e){return null===e||void 0===e?void 0:e.response}}),h=(0,l.zD)("instrument/dashboard/data/static",async a=>{try{return await(0,d.eN)()}catch(e){return null===e||void 0===e?void 0:e.response}}),u=(0,l.Z0)({name:"instrument/dashboard/data",initialState:{loading:!1,calibrationNearToDate:[],staticData:{},tableData:{total:0,pageIndex:1,pageSize:10,query:""},filterData:{type:""}},reducers:{setTableData:(a,e)=>{a.tableData=e.payload},setFilterData:(a,e)=>{a.filterData=e.payload}},extraReducers:{[c.fulfilled]:(a,e)=>{var t,n,i;a.calibrationNearToDate=(null===(t=e.payload.data)||void 0===t?void 0:t.data)||[],a.tableData.total=(null===(n=e.payload)||void 0===n||null===(i=n.data)||void 0===i?void 0:i.total)||0,a.loading=!1},[c.pending]:a=>{a.loading=!0},[h.fulfilled]:(a,e)=>{var t,n;a.staticData=(null===(t=e.payload)||void 0===t||null===(n=t.data)||void 0===n?void 0:n.data)||{}}}}),{setTableData:x,setFilterData:p}=u.actions,m=u.reducer,b=(0,o.HY)({data:m});var g=t(49934),j=t(1529),y=t(81210),f=t(39470),v=t(46237),C=t(21069),D=t(70579);const F=j.Ay.div`
  background-color: white;
  margin: 10px;
  padding: 10px;
  border-radius: 1rem;
`,S=j.Ay.div`
  background-color: ${a=>a.bgColor};
  padding: 1.5rem;
  width: 100%;
  max-width: 200px;
  height: 198px;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,A=j.Ay.div`
  background-color: ${a=>a.iconBgColor};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`,M=j.Ay.p`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 0.75rem;
`,w=j.Ay.p`
  font-size: 0.8rem;
  font-weight: medium;
`,k=()=>{const a=50,e=10,t=5,n=35,i=7,s=3;return(0,D.jsx)(F,{children:(0,D.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",gap:"25px"},children:[(0,D.jsxs)(S,{bgColor:"#FFE2E5",children:[(0,D.jsx)(A,{iconBgColor:"#FA5A7D",children:(0,D.jsx)(C.uyL,{style:{color:"white",fontSize:"24px"}})}),(0,D.jsx)(M,{children:a}),(0,D.jsx)(w,{children:"Machines"})]}),(0,D.jsxs)(S,{bgColor:"#FFF4DE",children:[(0,D.jsx)(A,{iconBgColor:"#FF947A",children:(0,D.jsx)(y.A,{style:{color:"white",fontSize:"24px"}})}),(0,D.jsx)(M,{children:e}),(0,D.jsx)(w,{children:"Upcoming Maintenance"})]}),(0,D.jsxs)(S,{bgColor:"#DCFCE7",children:[(0,D.jsx)(A,{iconBgColor:"#3CD856",children:(0,D.jsx)(f.A,{style:{color:"white",fontSize:"24px"}})}),(0,D.jsx)(M,{children:t}),(0,D.jsx)(w,{children:"Overdue Maintenance"})]}),(0,D.jsxs)(S,{bgColor:"#F3E8FF",children:[(0,D.jsx)(A,{iconBgColor:"#BF83FF",children:(0,D.jsx)(v.A,{style:{color:"white",fontSize:"24px"}})}),(0,D.jsx)(M,{children:n}),(0,D.jsx)(w,{children:"Up-to-Date Machines"})]}),(0,D.jsxs)(S,{bgColor:"#e4eff6",children:[(0,D.jsx)(A,{iconBgColor:"#096CAE",children:(0,D.jsx)(y.A,{style:{color:"white",fontSize:"24px"}})}),(0,D.jsx)(M,{children:i}),(0,D.jsx)(w,{children:"Upcoming Calibrations"})]}),(0,D.jsxs)(S,{bgColor:"#FFF4DE",children:[(0,D.jsx)(A,{iconBgColor:"#FF947A",children:(0,D.jsx)(f.A,{style:{color:"white",fontSize:"24px"}})}),(0,D.jsx)(M,{children:s}),(0,D.jsx)(w,{children:"Overdue Calibrations"})]})]})})};var B=t(22019);const z=()=>{const a=[35,5,10];return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)("h4",{className:"mb-4",children:"Machine Status Distribution"}),(0,D.jsx)(B.A,{options:{chart:{type:"pie"},labels:["Up-to-Date","Overdue Maintenance","Upcoming Maintenance"],colors:["#36A2EB","#FF6384","#FFCE56"],legend:{position:"bottom"}},series:a,type:"pie",height:350})]})};var E=t(22626);const N=()=>(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)("h4",{className:"mb-4",children:"Machine Details"}),(0,D.jsx)(E.A,{dataSource:[{id:1,name:"Machine A",maintenanceStatus:"Up-to-date",calibrationStatus:"Upcoming",lastMaintenance:"2024-11-01",lastCalibration:"2024-11-15",expenses:"\u20b9200"},{id:2,name:"Machine B",maintenanceStatus:"Overdue",calibrationStatus:"Overdue",lastMaintenance:"2024-09-01",lastCalibration:"2024-08-15",expenses:"\u20b9500"},{id:3,name:"Machine C",maintenanceStatus:"Upcoming",calibrationStatus:"Up-to-date",lastMaintenance:"2024-11-10",lastCalibration:"2024-11-25",expenses:"\u20b9300"},{id:4,name:"Machine D",maintenanceStatus:"Overdue",calibrationStatus:"Upcoming",lastMaintenance:"2024-08-20",lastCalibration:"2024-09-10",expenses:"\u20b9450"}],columns:[{title:"Machine Name",dataIndex:"name",key:"name"},{title:"Maintenance Status",dataIndex:"maintenanceStatus",key:"maintenanceStatus"},{title:"Calibration Status",dataIndex:"calibrationStatus",key:"calibrationStatus"},{title:"Last Maintenance",dataIndex:"lastMaintenance",key:"lastMaintenance"},{title:"Last Calibration",dataIndex:"lastCalibration",key:"lastCalibration"},{title:"Expenses",dataIndex:"expenses",key:"expenses",align:"right"}],rowKey:"id",bordered:!0})]});(0,r.Mh)("instrument_dashboard",b);const U=()=>{const a=(0,s.wA)();(0,n.useEffect)(()=>{a(h())},[]);(0,s.d4)(a=>a.instrument_dashboard.data.staticData);return(0,D.jsxs)(i.Rh,{loading:!1,children:[(0,D.jsx)(k,{}),(0,D.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4",children:[(0,D.jsx)(g.Zp,{className:"",children:(0,D.jsx)(z,{})}),(0,D.jsx)(g.Zp,{className:"col-span-2",children:(0,D.jsx)(N,{})})]})]})}}}]);
//# sourceMappingURL=2478.98443db7.chunk.js.map