import React, { useEffect } from "react";
import DataTable from "../../../../../components/shared/DataTable";
import { Card, Button } from "../../../../../components/ui";
// import { FaCrown } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getTopSellingProduct } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";

const TopSellingProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.product_dashboard.data.topSellingProductList
  );

  console.log("data", data);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch(getTopSellingProduct());
  };

  const NameColumn = ({ value }) => {
    return <div className="items-center uppercase w-42">{value}</div>;
  };

  // Table columns
  // const columns = [
  //   {
  //     header: "Product Name",
  //     accessorKey: "product_name",
  //     cell: (props) => {
  //       const isFirstRow = props.row.index === 0;
  //       const value = props.row.original.name;

  //       return (
  //         <div className="flex items-center">
  //           {isFirstRow && (
  //             <div className="mr-2 text-red-400">
  //               <FaCrown />
  //             </div>
  //           )}
  //           <NameColumn value={value} />
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     header: "Item Code",
  //     accessorKey: "itemCode",
  //     cell: (props) => {
  //       const value = props.row.original.itemCode;
  //       return <NameColumn value={value} />;
  //     },
  //   },
  //   {
  //     header: "P. Code",
  //     accessorKey: "pCode",
  //     cell: (props) => {
  //       const value = props.row.original.pCode;
  //       return <NameColumn value={value} />;
  //     },
  //   },
  //   {
  //     header: "Pattern No",
  //     accessorKey: "patternNo",
  //     cell: (props) => {
  //       const value = props.row.original.patternNo;
  //       return <NameColumn value={value} />;
  //     },
  //   },
  //   {
  //     header: "Category",
  //     accessorKey: "category",
  //     cell: (props) => {
  //       const value = props.row.original.category;
  //       return <NameColumn value={value} />;
  //     },
  //   },
  //   {
  //     header: "Mat. Grd. No",
  //     accessorKey: "matGrdNo",
  //     cell: (props) => {
  //       const value = props.row.original.matGrdNo;
  //       return <NameColumn value={value} />;
  //     },
  //   },
  //   {
  //     header: "HSN Code",
  //     accessorKey: "hsnCode",
  //     cell: (props) => {
  //       const value = props.row.original.hsnCode;
  //       return <NameColumn value={value} />;
  //     },
  //   },
  //   {
  //     header: "SLT",
  //     accessorKey: "slt",
  //     cell: (props) => {
  //       const value = props.row.original.slt;
  //       return <NameColumn value={value} />;
  //     },
  //   },
  // ];
  const columns = [
    {
      header: "Product Name",
      accessorKey: "product_name",
      cell: (props) => {
        const isFirstRow = props.row.index === 0;
        const value = props.row.original.product_name;

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
      header: "Quantity",
      accessorKey: "Quantity",
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
