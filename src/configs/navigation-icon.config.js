import React from "react";
import { HiOutlineUserGroup, HiOutlineUsers } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import { TbFileInvoice, TbMoneybag } from "react-icons/tb";
import { RiProductHuntLine } from "react-icons/ri";
import { LuList } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { BiPurchaseTagAlt, BiTask } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import {
  FaRegBuilding,
  FaWarehouse,
  FaRegHandRock,
  FaHireAHelper,
} from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsTools } from "react-icons/bs";

const navigationIcon = {
  dashboard: <RxDashboard />,
  user: <HiOutlineUsers />,
  payout: <TbMoneybag />,
  product: <RiProductHuntLine />,
  productList: <LuList />,
  productAdd: <IoMdAdd />,
  purchase: <BiPurchaseTagAlt />,
  purchaseList: <LuList />,
  purchaseAdd: <IoMdAdd />,
  customer: <HiOutlineUserGroup />,
  customerList: <LuList />,
  customerAdd: <IoMdAdd />,
  setting: <FiSettings />,
  invoice: <TbFileInvoice />,
  company: <FaRegBuilding />,
  stock: <FaWarehouse />,
  orders: <MdOutlineShoppingCart />,
  master: <FaRegHandRock />,
  worker: <FaHireAHelper />,
  instrument: <BsTools />,
  task: <BiTask />,
};

export default navigationIcon;
