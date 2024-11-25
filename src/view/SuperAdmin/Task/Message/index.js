import { Card } from "../../../../components/ui";
import ChatPage from "./components/Message";
import { injectReducer } from "../../../../store";
import chatReducer from "./store";

injectReducer("chat", chatReducer);

const TaskChat = () => {
  return (
    <div>
      <Card>
        <ChatPage />
      </Card>
    </div>
  );
};

export default TaskChat;
