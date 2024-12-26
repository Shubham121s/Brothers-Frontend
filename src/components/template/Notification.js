import React, { useEffect, useState, useCallback } from "react";
import classNames from "classnames";
import withHeaderItem from "../../utils/hoc/withHeaderItem";
import {
  Avatar,
  Dropdown,
  ScrollBar,
  Spinner,
  Badge,
  Button,
  Tooltip,
  Toast,
  Alert,
} from "../ui";
import {
  HiOutlineBell,
  HiOutlineCalendar,
  HiOutlineClipboardCheck,
  HiOutlineBan,
  HiOutlineMailOpen,
} from "react-icons/hi";
// import {
//   apiGetNotificationList,
//   apiGetNotificationCount,
// } from "services/CommonService";
import { Link } from "react-router-dom";
import isLastChild from "../../utils/isLastChild";
import useTwColorByName from "../../utils/hooks/useTwColorByName";
import useThemeClass from "../../utils/hooks/useThemeClass";
import { useSelector } from "react-redux";
import useResponsive from "../../utils/hooks/useResponsive";
import acronym from "../../utils/acronym";
import defaultProfile from "../shared/defaultProfile.jpg";
import { useLocation } from "react-router-dom";

const notificationHeight = "h-72";
const imagePath = "/img/avatars/";

const GeneratedAvatar = ({ target }) => {
  const color = useTwColorByName();
  return (
    <Avatar shape="circle" className={`${color(target)}`}>
      {acronym(target)}
    </Avatar>
  );
};

const notificationTypeAvatar = (data) => {
  const { type, target, image, status } = data;
  switch (type) {
    case 0:
      if (image) {
        return <Avatar shape="circle" src={defaultProfile} />;
      } else {
        return <GeneratedAvatar target={target} />;
      }
    case 1:
      return (
        <Avatar
          shape="circle"
          className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100"
          icon={<HiOutlineCalendar />}
        />
      );
    case 2:
      const statusSucceed = status === "succeed";
      const statusColor = statusSucceed
        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100"
        : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100";
      const statusIcon = statusSucceed ? (
        <HiOutlineClipboardCheck />
      ) : (
        <HiOutlineBan />
      );
      return (
        <Avatar shape="circle" className={statusColor} icon={statusIcon} />
      );
    default:
      return <Avatar />;
  }
};

const NotificationToggle = ({ className, dot }) => {
  return (
    <div className={classNames("text-2xl", className)}>
      {dot ? (
        <Badge badgeStyle={{ top: "3px", right: "6px" }}>
          <HiOutlineBell className="vibrate" />
        </Badge>
      ) : (
        <HiOutlineBell />
      )}
    </div>
  );
};

export const Notification = ({ className }) => {
  const [notificationList, setNotificationList] = useState([]);
  const [unreadNotification, setUnreadNotification] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const socket = useSelector((state) => state.socket.instance);
  const userAuthority = useSelector((state) => state.auth.user.authority);
  const location = useLocation();
  const { bgTheme } = useThemeClass();

  const { larger } = useResponsive();

  const direction = useSelector((state) => state.theme.direction);

  // const getNotificationCount = useCallback(async () => {
  //   // const resp = await apiGetNotificationCount();
  //   // resp.data.count > 0
  //   if (true) {
  //     setNoResult(false);
  //     setUnreadNotification(true);
  //   } else {
  //     setNoResult(true);
  //   }
  // }, [setUnreadNotification]);

  // useEffect(() => {
  //   getNotificationCount();
  // }, [getNotificationCount]);

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (message) => {
      setUnreadNotification(true);
      setNotificationList((prevMessages) => [
        {
          ...message.data,
        },
        ...prevMessages,
      ]);
    };
    if (location.pathname !== "/task/chat") {
      if (Array.isArray(userAuthority) && userAuthority[0] !== "super-admin") {
        socket.on("New Task", handleNotification);
      }

      socket.on("Reply", handleNotification);
    }
    return () => {
      socket.off("Reply", handleNotification);
      socket.off("New Task", handleNotification);
    };
  }, [socket]);

  if (unreadNotification) {
    //  Toast.push(
    //   <Notification
    //     title="hi"
    //     closable
    //     customIcon={<Avatar shape="circle" src={defaultProfile} />}
    //     duration={3000}
    //   >
    //     You Have Got New Notification
    //   </Notification>,
    //   {
    //     placement: "top-center",
    //   }
    // );
  }

  const onNotificationOpen = useCallback(async () => {
    if (notificationList.length === 0) {
      setLoading(true);
      //   const resp = await apiGetNotificationList();
      setLoading(false);
      setNotificationList([]);
    }
  }, [notificationList, setLoading]);

  const onMarkAllAsRead = useCallback(() => {
    const list = notificationList.map((item) => {
      if (!item.readed) {
        item.readed = true;
      }
      return item;
    });
    setNotificationList(list);
    setUnreadNotification(false);
  }, [notificationList]);

  const onMarkAsRead = useCallback(
    (id) => {
      const list = notificationList.map((item, index) => {
        if (index === id) {
          item.readed = true;
        }
        return item;
      });
      setNotificationList(list);
      const hasUnread = notificationList.some((item) => !item.readed);

      if (!hasUnread) {
        setUnreadNotification(false);
      }
    },
    [notificationList]
  );

  return (
    <>
      {/* <Alert
        type="success"
        showIcon
        customIcon={<Avatar shape="circle" src={defaultProfile} />}
        closable
        rounded={true}
      >
        Additional description and information about copywriting.
      </Alert> */}

      <Dropdown
        renderTitle={
          <NotificationToggle dot={unreadNotification} className={className} />
        }
        menuClass="p-0 min-w-[280px] md:min-w-[340px]"
        placement={larger.md ? "middle-end-top" : "middle-end-top"}
        onOpen={onNotificationOpen}
      >
        <Dropdown.Item variant="header">
          <div className="border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
            <h6>Notifications</h6>
            <Tooltip title="Mark all as read">
              <Button
                variant="plain"
                shape="circle"
                size="sm"
                icon={<HiOutlineMailOpen className="text-xl" />}
                onClick={onMarkAllAsRead}
              />
            </Tooltip>
          </div>
        </Dropdown.Item>
        <div className={classNames("overflow-y-auto", notificationHeight)}>
          <ScrollBar direction={direction}>
            {notificationList.length > 0 &&
              notificationList.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex px-4 py-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-20  ${
                    !isLastChild(notificationList, index)
                      ? "border-b border-gray-200 dark:border-gray-600"
                      : ""
                  }`}
                  onClick={() => onMarkAsRead(index)}
                >
                  <div>{notificationTypeAvatar(item)}</div>
                  <div className="ltr:ml-3 rtl:mr-3">
                    <div className="ml-2">
                      {item.target && (
                        <span className="font-semibold heading-text">
                          {item.target}{" "}
                        </span>
                      )}
                      <br />
                      <span>{item.description}</span>
                    </div>
                    <span className="text-xs">{item.date}</span>
                  </div>
                  {/* <Badge
                  className="absolute top-4 ltr:right-4 rtl:left-4 mt-1.5"
                  innerClass={`${item.readed ? "bg-gray-300" : bgTheme} `}
                /> */}
                </div>
              ))}
            {loading && (
              <div
                className={classNames(
                  "flex items-center justify-center",
                  notificationHeight
                )}
              >
                <Spinner size={40} />
              </div>
            )}
            {noResult && (
              <div
                className={classNames(
                  "flex items-center justify-center",
                  notificationHeight
                )}
              >
                <div className="text-center">
                  <img
                    className="mx-auto mb-2 max-w-[150px]"
                    src="/img/others/no-notification.png"
                    alt="no-notification"
                  />
                  <h6 className="font-semibold">No notifications!</h6>
                  <p className="mt-1">Please Try again later</p>
                </div>
              </div>
            )}
          </ScrollBar>
        </div>
      </Dropdown>
    </>
  );
};

export default withHeaderItem(Notification);
