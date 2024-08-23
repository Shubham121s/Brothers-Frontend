import React, { useEffect, useCallback, useMemo } from "react";
import { Badge } from "../../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import useThemeClass from "../../../../../../utils/hooks/useThemeClass";
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import { getAllCategories, setTableData } from "../store/dataSlice";
import DataTable from "../../../../../../components/shared/DataTable";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
// import CategoryDeleteConfirmation from "./CategoryDeleteConfirmation";
import {
  setSelectedCategory,
  toggleDeleteCategoryDialog,
  toggleEditCategoryDialog,
} from "../store/stateSlice";
// import CategoryEditFormDialog from "./CategoryEditDialog";
import NoteNewDialog from "./NoteNewDialog";
import NoteEditDialog from "./NoteEditDialog";

const statusColor = {
  true: {
    label: "Active",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  false: {
    label: "In-Active",
    dotClass: "bg-red-500",
    textClass: "text-red-500",
  },
};

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();

  const onEdit = () => {
    dispatch(toggleEditCategoryDialog(true));
    dispatch(setSelectedCategory(row));
  };
  const onDelete = () => {
    dispatch(toggleDeleteCategoryDialog(true));
    dispatch(setSelectedCategory(row));
  };

  return (
    <div className="flex justify-end gap-x-4 text-lg">
      <span className={`cursor-pointer hover:${textTheme}`} onClick={onEdit}>
        <HiOutlinePencil />
      </span>
      <span className="cursor-pointer hover:text-red-500" onClick={onDelete}>
        <HiOutlineTrash />
      </span>
    </div>
  );
};

const columns = [
  {
    header: "sr no.",
    accessorKey: "sr no",
    cell: (props) => {
      const index = props.row.index;
      return <span className="uppercase">{index + 1}</span>;
    },
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: (props) => {
      const row = props.row.original;
      return <span className="">{row.name}</span>;
    },
  },
  //   {
  //     header: "Status",
  //     accessorKey: "status",
  //     cell: (props) => {
  //       const row = props.row.original;
  //       return (
  //         <div className="flex items-center">
  //           <Badge className={statusColor[row?.status]?.dotClass} />
  //           <span
  //             className={`ml-2 font-semibold capitalize ${
  //               statusColor[row?.status]?.textClass
  //             }`}
  //           >
  //             {statusColor[row?.status]?.label}
  //           </span>
  //         </div>
  //       );
  //     },
  //   },
  {
    header: "Reg. Date",
    accessorKey: "createdAt",
    cell: (props) => {
      const row = props.row.original;
      return (
        <div className="flex items-center">
          {dayjs(row?.createdAt).format("DD/MM/YYYY")}
        </div>
      );
    },
  },
  {
    header: "",
    accessorKey: "note_id",
    cell: (props) => {
      const row = props.row.original;
      return <ActionColumn row={row} />;
    },
  },
];

const NoteTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.note.data.categoryList);
  const loading = useSelector((state) => state.note.data.loading);
  const { status } = useSelector((state) => state.note.data.filterData);

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.note.data.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(getAllCategories({ pageIndex, pageSize, query, status }));
  }, [pageIndex, pageSize, query, status, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageIndex, pageSize, status]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, query, total }),
    [pageIndex, pageSize, query, total]
  );

  const onPaginationChange = (page) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = page;
    dispatch(setTableData(newTableData));
  };

  const onSelectChange = (value) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageSize = Number(value);
    newTableData.pageIndex = 1;
    dispatch(setTableData(newTableData));
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        pagingData={{ pageIndex, pageSize, query, total }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
      {/* <CategoryDeleteConfirmation />
      <CategoryEditFormDialog /> */}
      <NoteNewDialog />
      <NoteEditDialog />
    </>
  );
};

export default NoteTable;
