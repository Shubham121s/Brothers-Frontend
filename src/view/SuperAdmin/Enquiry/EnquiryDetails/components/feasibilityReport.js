import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";

const FeasibilityTable = () => {
  const data = useSelector((state) => state.enquiry_detail.data.reviewDetails);

  const customer = data?.customer_requirement
    ? JSON.parse(data?.customer_requirement)
    : [];
  const feasibility = data?.feasibility ? JSON.parse(data?.feasibility) : [];
  const customer_po = data?.customer_po_review
    ? JSON.parse(data?.customer_po_review)
    : [];
  return (
    <>
      <div bg-white>
        <h2 className="text-center text-current text-2xl ">
          VAISHNAVI PROFILE INDUSTRIES
        </h2>
        <h4 className="text-center text-current text-xl">
          INQUIRY REVIEW FORM
        </h4>
        <table className="border-2 mt-2  ">
          <thead>
            <tr>
              <th className="border-2  text-left " style={{ width: "50vw" }}>
                Part Name- {data?.EnquiryList?.part_name}
              </th>
              <th className="border-2  text-left" style={{ width: "50vw" }}>
                Part Number - {data?.EnquiryList?.part_number}
              </th>
            </tr>
          </thead>
        </table>
        <table className="border-2   ">
          <thead>
            <tr>
              <th className="border-2  text-left " style={{ width: "50vw" }}>
                Customer Name- {data?.EnquiryList?.Enquiry?.Customer?.name}
              </th>
              <th className="border-2  text-left" style={{ width: "50vw" }}>
                Date - {dayjs().format("YYYY-MM-DD")}
              </th>
            </tr>
          </thead>
        </table>
        <table className="border-2   ">
          <thead>
            <tr>
              <th className="border-2  text-left " style={{ width: "15vw" }}>
                NO
              </th>
              <th className="border-2  text-left" style={{ width: "55vw" }}>
                Review Points
              </th>
              <th className="border-2  text-left" style={{ width: "15vw" }}>
                Review Result <br /> Yes/No
              </th>
              <th className="border-2  text-left" style={{ width: "15vw" }}>
                Remarks
              </th>
            </tr>
          </thead>
        </table>
        <div className="border-2 text-left ">A)CUSTOMER REQUIREMENTS</div>
        <table className="border-2 ">
          {customer?.map((row, index) => (
            <tr key={row.id}>
              <td className="border-2 text-left" style={{ width: "15vw" }}>
                {index + 1}
              </td>
              <td className="border-2 text-left" style={{ width: "55vw" }}>
                {row.label}
              </td>
              <td className="border-2 text-left" style={{ width: "15vw" }}>
                {row.value === true ? "YES" : "NO"}
              </td>
              <td className="border-2 text-left" style={{ width: "15vw" }}>
                {row.remark || "-"}
              </td>
            </tr>
          ))}
        </table>
        <br />
        <div className="border-2 text-left ">B)Feasibility</div>
        <table className="border-2 ">
          {feasibility?.map((row, index) => (
            <tr key={row.id}>
              <td className="border-2 text-left" style={{ width: "15vw" }}>
                {index + 1}
              </td>
              <td className="border-2 text-left" style={{ width: "55vw" }}>
                {row.label}
              </td>
              <td className="border-2 text-left" style={{ width: "15vw" }}>
                {row.value === true ? "YES" : "NO"}
              </td>
              <td className="border-2 text-left" style={{ width: "15vw" }}>
                {row.remark || "-"}
              </td>
            </tr>
          ))}
        </table>
        <table className="border-2  ">
          <thead>
            <tr>
              <th className="border-2 w-[100vw] text-left ">
                Feasible/ Not Feasible/ - Feasible/{" "}
              </th>
            </tr>
          </thead>
        </table>
        <br />
        <div className="border-2 text-left ">C)Customer PO Review</div>
        <table className="border-2 ">
          {customer_po?.map((row, index) => (
            <tr key={row.id}>
              <td className="border-2 text-left" style={{ width: "15vw" }}>
                {index + 1}
              </td>
              <td className="border-2 text-left" style={{ width: "55vw" }}>
                {row.label}
              </td>
              <td className="border-2 text-left" style={{ width: "15vw" }}>
                {row.value === true ? "YES" : "NO"}
              </td>
              <td className="border-2 text-left" style={{ width: "15vw" }}>
                {row.remark || "-"}
              </td>
            </tr>
          ))}
        </table>
        <table className="border-2 ">
          <thead>
            <tr>
              <th
                className="border-2 w-[100vw] text-left "
                style={{ width: "100vw" }}
              >
                Note - 1) Points mentioned in section (A) &(B) are to be
                reviewed from exiting as well as potential customers
                <br />{" "}
                <span className="ml-12">
                  2) Points mentioned in section (A),(B)&(C) are Reviewed when
                  customer PO is received.
                </span>
                <br />
                <span className="font-semibold ml-12">
                  FEASIBILITY :YES/ NO
                </span>
              </th>
            </tr>
          </thead>
        </table>
        <br />
        <table className="border-2  h-[10vh] ">
          <tr className="">
            <th
              className="border-2 w-[50vw] text-left  "
              style={{ width: "50vw" }}
            >
              Prepared by
            </th>
            <th
              className="border-2 w-[50vw] text-left  "
              style={{ width: "50vw" }}
            >
              Approved by
            </th>
          </tr>
        </table>
        <table className="border-2   ">
          <thead>
            <tr>
              <th
                className="border-2 w-[25vw] text-left "
                style={{ width: "25vw" }}
              >
                Reference No:
                <br />
                {data?.reference_number}
              </th>
              <th
                className="border-2 w-[25vw] text-left"
                style={{ width: "25vw" }}
              >
                Issue No /Date:
                <br />
                {dayjs().format("YYYY-MM-DD")}
              </th>
              <th
                className="border-2 w-[25vw] text-left"
                style={{ width: "25vw" }}
              >
                Rev No /Date:
                <br />
                {dayjs().format("YYYY-MM-DD")}
              </th>
              <th
                className="border-2 w-[25vw] text-left"
                style={{ width: "25vw" }}
              >
                Page:
                <br />
                Page 1 of 1
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default FeasibilityTable;
