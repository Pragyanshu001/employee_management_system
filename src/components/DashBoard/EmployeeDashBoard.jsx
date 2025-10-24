import background from "../../assets/emsBG.png";
import Header from "../others/Header";
import TaskListNumbers from "../others/TaskStatus";
import TaskList from "../others/TaskList";

const EmployeeDashBoard = () => {
  return (
    // <div
    //   className="w-[100vw] h-[100vh] p-5"
    //   style={{ backgroundImage: `url(${background})` }}
    // >
    <div
      className="w-[100vw] h-[100%] bg-center bg-cover p-5 bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Header />
      <div className=" bg-blue-200 rounded-3xl p-5 mt-1">
        <TaskListNumbers />
        <TaskList />
      </div>
    </div>
  );
};

export default EmployeeDashBoard;
