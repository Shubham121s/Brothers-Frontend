import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Notification, Toast } from "../../../../components/ui";
import { togglePasswordDialog } from "../store/stateSlice";
import { getAllUsers, newUserRegister } from "../store/dataSlice";
import { ConfirmDialog, PasswordInput } from "../../../../components/shared";
import {
  apiGetPasswordOfUser,
  apiUpdateUserPassword,
} from "../../../../services/SuperAdmin/UserService";
import { SECRET_KEY } from "../../../../constants/app.constant";
import { FiEye, FiEyeOff } from "react-icons/fi";

const pushNotification = (message, type, title) => {
  return Toast.push(
    <Notification title={title} type={type} duration={2500}>
      {message}
    </Notification>,
    {
      placement: "top-center",
    }
  );
};

const UserPasswordUpdateDialog = () => {
  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.auth.user);
  const [password, setPassword] = useState("");
  const [decryptedPassword, setDecryptedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  console.log("showPassword", showPassword);

  const UserPasswordDialog = useSelector(
    (state) => state.user.state.passwordDialog
  );

  const selectedUser = useSelector((state) => state.user.state.selectedUser);

  const tableData = useSelector((state) => state.user.data.tableData);

  const onDialogClose = () => {
    dispatch(togglePasswordDialog(false));
  };

  const decryptPassword = (encryptedPassword) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return "Unable to decrypt password";
    }
  };

  useEffect(() => {
    if (UserPasswordDialog) {
      fetchUserPassword();
    }
  }, [UserPasswordDialog]);

  const fetchUserPassword = async () => {
    try {
      const response = await apiGetPasswordOfUser({
        userId: selectedUser.user_id,
      });

      if (response?.status < 300 && response?.data?.data) {
        const user = response.data.data;

        if (user?.password) {
          const decryptedPass = decryptPassword(user.password);

          setDecryptedPassword(decryptedPass);
        }
      }
    } catch (error) {
      console.error("Error fetching user password:", error);
    }
  };

  const handleFormSubmit = async () => {
    const action = await apiUpdateUserPassword({
      password: password,
      user_id: selectedUser.user_id,
    });
    if (action?.data?.success) {
      dispatch(getAllUsers(tableData));
      pushNotification(
        action?.payload?.data?.message,
        "success",
        "Successfully added"
      );
      return onDialogClose();
    }
    return pushNotification(
      action?.payload?.data?.message,
      "danger",
      "Unsuccessfully"
    );
  };

  return (
    <ConfirmDialog
      isOpen={UserPasswordDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="success"
      title="Change Password"
      onCancel={onDialogClose}
      onConfirm={handleFormSubmit}
      confirmText={"Save"}
      confirmButtonColor="purple-600"
      width={450}
    >
      {decryptedPassword && (
        <div className="text-sm text-gray-600 mb-2 mt-4 relative">
          <label
            htmlFor="current-password"
            className="block mb-1 font-medium text-gray-700"
          ></label>
          <input
            id="current-password"
            type={showPassword ? "text" : "password"}
            value={decryptedPassword}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-3 text-sm focus:outline-none focus:ring focus:ring-purple-200"
            onFocus={(e) => e.target.select()}
            style={{ width: "300px" }}
          />
          <button
            type="button"
            className="text-xs text-gray-600 absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
          </button>
        </div>
      )}
      <PasswordInput
        className="mt-4"
        placeholder="New Password"
        style={{ width: "300px" }}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
    </ConfirmDialog>
  );
};

export default UserPasswordUpdateDialog;
