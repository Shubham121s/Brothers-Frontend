import React from "react";
import Header from "./components/Header";
import PoTable from "./components/PoTable";
import Footer from "./components/Footer";

const POInvoice = (props) => {
  const { data, PoLists = [] } = props;

  return (
    <div className="invoice w-full p-4 relative h-full">
      <div className="w-full h-full absolute top-0" style={{ opacity: 0.15 }}>
        {/* <img src='/img/logo/logo.png' className='w-full h-full' style={{ objectFit: 'contain', objectPosition: 'center' }}></img> */}
      </div>
      <Header className={"bg-inherit"} data={data} />
      <PoTable
        className={"bg-inherit print:text-xs"}
        data={PoLists}
        currency_type={data.currency_type}
      />
      <Footer className={"bg-inherit"} data={data} />
    </div>
  );
};

export default POInvoice;
