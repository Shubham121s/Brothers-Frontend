import React from "react";
import { Dialog } from "../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import { toggleEyeDialog } from "../store/stateSlice";
import { MdOutlineMessage } from "react-icons/md";

const DescriptionModal = ({ onDialogClose }) => {
  const dispatch = useDispatch();

  const selectedTask = useSelector((state) => state.task.state.selectedTask);

  const priorityColor = {
    high: {
      label: "High",
      bgClass: "bg-red-100",
      textClass: "text-red-600",
    },
    low: {
      label: "Low",
      bgClass: "bg-orange-100",
      textClass: "text-orange-600",
    },
    medium: {
      label: "Medium",
      bgClass: "bg-emerald-100",
      textClass: "text-emerald-600",
    },
  };

  const statusColor = {
    active: {
      label: "Active",
      dotClass: "bg-emerald-500",
      textClass: "text-emerald-500",
    },
    inactive: {
      label: "In-Active",
      dotClass: "bg-red-500",
      textClass: "text-red-500",
    },
  };

  const closeModal = () => {
    dispatch(toggleEyeDialog(false));
  };

  return (
    <>
      <div className="p-4 mt-4 bg-white rounded-lg transition-transform transform hover:scale-105">
        {selectedTask ? (
          <div className="flex flex-col gap-8">
            <div className="flex items-center">
              <span className="font-semibold text-gray-800">Assigned By:</span>
              <span className="text-gray-600">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span className="text-gray-600">
                {selectedTask["AssignedBy.name"]}
              </span>
            </div>

            <div className="flex items-center">
              <span className="font-semibold text-gray-800">Description</span>
              <span className="text-gray-600 ml-5.5">
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span className="text-gray-600 text-left">
                {selectedTask.description}
              </span>
            </div>

            <div className="flex items-center">
              <span className="font-semibold text-gray-800">Task</span>
              <span className="text-gray-600 ">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span className="text-gray-600">{selectedTask.task}</span>
            </div>

            <div className="flex items-center">
              <span className="font-semibold text-gray-800">Assigned To</span>
              <span className="text-gray-600 ">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span className="text-gray-600 text-left">
                {selectedTask["AssignedTo.name"]}
              </span>
            </div>

            <div className="flex items-center">
              <span className="font-semibold text-gray-800">Priority</span>
              <span className="text-gray-600 ">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  priorityColor[selectedTask.priority]?.bgClass
                } ${priorityColor[selectedTask.priority]?.textClass}`}
              >
                {priorityColor[selectedTask.priority]?.label ||
                  selectedTask.priority}
              </span>
            </div>

            {/* Status */}
            <div className="flex">
              <span className="font-semibold text-gray-800">Status</span>
              <span className="text-gray-600">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <div className="flex items-center">
                <span
                  className={`w-3 h-3 rounded-full ${
                    statusColor[selectedTask.status]?.dotClass
                  }`}
                ></span>
                <span
                  className={`ml-2 capitalize font-semibold ${
                    statusColor[selectedTask.status]?.textClass
                  }`}
                >
                  {statusColor[selectedTask.status]?.label}
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="flex items-center px-4 py-2 text-white bg-red-500 rounded-lg shadow hover:bg-red-600 transition duration-200 transform hover:scale-105"
                onClick={onDialogClose}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No task selected.</p>
        )}
      </div>
    </>
  );
};

export default DescriptionModal;
