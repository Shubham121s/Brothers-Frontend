import React from "react";
import { injectReducer } from "../../../store";
import userReducer from "./store";
import UsersTable from "./components/UsersTable";
import UsersTableTools from "./components/UsersTableTools";
import { Card } from "../../../components/ui";
import NewUserFormDialog from "./components/NewUserDialog";

injectReducer("user", userReducer);

const User = () => {
  return (
    <div>
      <Card className="bg-gray-50">
        <div className="flex justify-between mb-1">
          <h3>Users</h3>
          <UsersTableTools />
        </div>
        <UsersTable />
      </Card>
      <NewUserFormDialog />
    </div>
  );
};

export default User;
