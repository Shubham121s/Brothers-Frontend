import { Card } from "../../../../components/ui";
import ChatPage from "./components/Message";
import { injectReducer } from "../../../../store";
import chatReducer from "./store";

injectReducer("chat", chatReducer);

const TaskChat = () => {
  return (
    <div>
      <ChatPage />
    </div>
  );
};

export default TaskChat;
