import React from 'react';
import SideBar from './SideBar';
import TopBar from './TopBar';
import CenterDiv from './CenterDiv';
function Teacher() {
  return (
    <div className=" flex">
        <SideBar />
        <div className="w-[82%]">
          <TopBar />
          <CenterDiv />
        </div>
      </div>
  )
}

export default Teacher
