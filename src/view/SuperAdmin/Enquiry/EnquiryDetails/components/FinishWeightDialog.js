import React, { useRef, useEffect, useMemo, useState, memo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { Table, Checkbox, Input } from "../../../../../components/ui";
import { toggleFinishWeights } from "../store/stateSlice";
import {
  getProfileProduct,
  setQuantityQuotationProfile,
} from "../store/dataSlice";

const { Tr, Th, Td, THead, TBody } = Table;

function IndeterminateCheckbox({ row }) {
  const dispatch = useDispatch();
  const onCheck = (e) => {
    dispatch(toggleFinishWeights(row));
  };

  return <Checkbox color="green-500" value={row} onChange={onCheck} />;
}

function QuantityInput({ row }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(row.quantity);

  const handleChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    // dispatch({ type: 'UPDATE_QUANTITY', payload: { id: row.id, quantity: newQuantity } });
    dispatch(
      setQuantityQuotationProfile({
        quotation_profile_id: row.quotation_profile_id,
        quantity: newQuantity,
      })
    );
  };
  return (
    <Input
      value={quantity}
      type="number"
      size="sm"
      onChange={handleChange}
      placeholder="Quantity"
    />
  );
}

const FinishWeightDialog = () => {
  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.enquiry_detail.data.quotationProfile
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getProfileProduct());
    };
    fetchData();
  }, []);

  const columns = useMemo(() => {
    return [
      {
        id: "select",
        header: "",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="px-1">
              <IndeterminateCheckbox row={row} />
            </div>
          );
        },
      },
      {
        header: "Drawing No",
        accessorKey: "drawing_number",
      },
      {
        header: "Part name",
        accessorKey: "part_name",
      },
      {
        header: "cutting mm",
        accessorKey: "cutting_mm",
      },
      {
        header: "weight",
        accessorKey: "weight",
      },
      {
        header: "quantity",
        accessorKey: "quantity",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div>
              <QuantityInput row={row} />
            </div>
          );
        },
      },
    ];
  }, []);

  // const data = [
  //   {
  //     drawing_number: "DWG001",
  //     part_name: "Widget A",
  //     cutting_mm: 4468,
  //     weight: 80.9,
  //     quantity: "",
  //   },
  //   {
  //     drawing_number: "DWG002",
  //     part_name: "Widget B",
  //     cutting_mm: 470,
  //     weight: 1.75,
  //     quantity: "",
  //   },
  // ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Table>
      <THead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <Th key={header.id} colSpan={header.colSpan}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              );
            })}
          </Tr>
        ))}
      </THead>
      <TBody>
        {table.getRowModel().rows.map((row) => {
          return (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </TBody>
    </Table>
  );
};

export default memo(FinishWeightDialog);
