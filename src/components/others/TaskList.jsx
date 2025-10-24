// import CompleteTask from "./CompleteTask";
// import FailedTask from "./FailedTask";
// import NewTask from "./NewTask";
// import ActiveTask from "./ActiveTask";
// import employees from "../../assets/employees.png";
// import Login from "../Dashboard/login";

import AllTaskList from "./AllTaskList";
import BasicPie from "./BasicPie";

const TaskList = () => {
  // const data = JSON.parse(sessionStorage.getItem("loggedInUser"));

  return (
    <div className="gap-5 md:flex-row flex-col items-center justify-between p-3 mt-5 bg-transparent rounded-3xl flex ">
      {/* <div
        className="bg-transparent size-72  w-[25%] bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${employees})` }}
      ></div> */}
      <div className="md:w-[75%] w-[100%] rounded-2xl   ">
        <AllTaskList />
      </div>

      <BasicPie />
    </div>
  );
};

export default TaskList;
