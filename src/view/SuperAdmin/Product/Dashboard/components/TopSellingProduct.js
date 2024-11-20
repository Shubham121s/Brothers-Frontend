import React from "react";
import DataTable from "../../../../../components/shared/DataTable";
import { Card, Button } from "../../../../../components/ui";
// import { FaCrown } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TopSellingProduct = () => {
  const navigate = useNavigate();
  const data = [
    {
      name: "Product A",
      itemCode: "FA-001",
      pCode: "P-1001",
      patternNo: "PT-500",
      category: "FIXED ASSET",
      matGrdNo: "MG-001",
      hsnCode: "HSN1234",
      slt: "10",
    },
    {
      name: "Product B",
      itemCode: "RM-002",
      pCode: "P-1002",
      patternNo: "PT-501",
      category: "RAW MATERIAL",
      matGrdNo: "MG-002",
      hsnCode: "HSN5678",
      slt: "20",
    },
    {
      name: "Product C",
      itemCode: "FG-003",
      pCode: "P-1003",
      patternNo: "PT-502",
      category: "FINISH GOODS",
      matGrdNo: "MG-003",
      hsnCode: "HSN9101",
      slt: "15",
    },
    {
      name: "Product D",
      itemCode: "CN-004",
      pCode: "P-1004",
      patternNo: "PT-503",
      category: "CONSUMABLE",
      matGrdNo: "MG-004",
      hsnCode: "HSN1122",
      slt: "25",
    },
  ];

  const NameColumn = ({ value }) => {
    return <div className="items-center uppercase w-28">{value}</div>;
  };

  // Table columns
  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (props) => {
        const isFirstRow = props.row.index === 0;
        const value = props.row.original.name;

        return (
          <div className="flex items-center">
            {isFirstRow && (
              <div className="mr-2 text-red-400">
                <FaCrown />
              </div>
            )}
            <NameColumn value={value} />
          </div>
        );
      },
    },
    {
      header: "Item Code",
      accessorKey: "itemCode",
      cell: (props) => {
        const value = props.row.original.itemCode;
        return <NameColumn value={value} />;
      },
    },
    {
      header: "P. Code",
      accessorKey: "pCode",
      cell: (props) => {
        const value = props.row.original.pCode;
        return <NameColumn value={value} />;
      },
    },
    {
      header: "Pattern No",
      accessorKey: "patternNo",
      cell: (props) => {
        const value = props.row.original.patternNo;
        return <NameColumn value={value} />;
      },
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (props) => {
        const value = props.row.original.category;
        return <NameColumn value={value} />;
      },
    },
    {
      header: "Mat. Grd. No",
      accessorKey: "matGrdNo",
      cell: (props) => {
        const value = props.row.original.matGrdNo;
        return <NameColumn value={value} />;
      },
    },
    {
      header: "HSN Code",
      accessorKey: "hsnCode",
      cell: (props) => {
        const value = props.row.original.hsnCode;
        return <NameColumn value={value} />;
      },
    },
    {
      header: "SLT",
      accessorKey: "slt",
      cell: (props) => {
        const value = props.row.original.slt;
        return <NameColumn value={value} />;
      },
    },
  ];

  return (
    <Card>
      <div className="flex justify-between">
        <h4 className="mb-4">Top Selling Products</h4>
        <Button
          className="mb-6 text-sm text-gray-400"
          onClick={() => {
            navigate("/product/new");
          }}
        >
          New Product
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        loading={false}
        selectable={false}
      />
    </Card>
  );
};

export default TopSellingProduct;
