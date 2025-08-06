import background from "../../assets/emsBG.png";
import Header from "../others/Header";
import TaskListNumbers from "../others/TaskStatus";
import TaskList from "../others/TaskList";

const EmployeeDashBoard = () => {
  return (
    <div
      className=" p-5 bg-cover bg-center "
      style={{ backgroundImage: `url(${background})` }}
    >
      <Header />
      <div className=" bg-blue-100 rounded-3xl p-5 mt-1">
        <TaskListNumbers />
        <TaskList />
      </div>
    </div>
  );
};

export default EmployeeDashBoard;
