import React, { useEffect, useState } from "react";
//Modal Start
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useAuth } from "../../AuthProvider/AuthProvider";
import BasicPie from "./BasicPie";

function TaskModal({ isOpen, onClose, task, setTasks }) {
  const { employees, setEmployees } = useAuth();

  if (!task) return null;

  const completed = async () => {
    try {
      const loggedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      const employee = employees.find((emp) => emp.id == loggedUser.id);

      if (!employee) {
        return;
      }

      const updatedTasks = employee.tasks.map((t) =>
        t.assignedAt === task.assignedAt
          ? {
              ...t,
              newTask: false,
              active: false,
              completed: true,
              failed: false,
            }
          : t
      );

      const updateTaskCount = {
        ...employee.taskCount,
        active: (employee.taskCount?.active || 1) - 1,
        completed: (employee.taskCount?.failed || 0) + 1,
      };

      const updatedEmployee = {
        ...employee,
        tasks: updatedTasks,
        taskCount: updateTaskCount,
      };
      const res = await fetch(
        `https://6883945221fa24876a9e938e.mockapi.io/api/v1/employees/${employee.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedEmployee),
        }
      );

      const data = await res.json();

      const updatedEmployees = employees.map((emp) =>
        emp.id === data.id ? data : emp
      );

      setEmployees(updatedEmployees);
      sessionStorage.setItem("loggedInUser", JSON.stringify(data));
      setTasks(data.tasks);
      onClose();
    } catch (err) {
      console.log("failed Task Error:", err);
    }
  };
  const failed = async () => {
    try {
      const loggedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      const employee = employees.find((emp) => emp.id == loggedUser.id);

      if (!employee) {
        return;
      }

      const updatedTasks = employee.tasks.map((t) =>
        t.assignedAt === task.assignedAt
          ? {
              ...t,
              newTask: false,
              active: false,
              completed: false,
              failed: true,
            }
          : t
      );

      const updateTaskCount = {
        ...employee.taskCount,
        active: (employee.taskCount?.active || 1) - 1,
        failed: (employee.taskCount?.failed || 0) + 1,
      };

      const updatedEmployee = {
        ...employee,
        tasks: updatedTasks,
        taskCount: updateTaskCount,
      };
      const res = await fetch(
        `https://6883945221fa24876a9e938e.mockapi.io/api/v1/employees/${employee.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedEmployee),
        }
      );

      const data = await res.json();

      const updatedEmployees = employees.map((emp) =>
        emp.id === data.id ? data : emp
      );

      setEmployees(updatedEmployees);
      sessionStorage.setItem("loggedInUser", JSON.stringify(data));
      setTasks(data.tasks);
      onClose();
    } catch (err) {
      console.log("failed Task Error:", err);
    }
  };

  const remove = async () => {
    try {
      const loggedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      const employee = employees.find((emp) => emp.id === loggedUser.id);

      if (!employee) return;

      const updatedTasks = employee.tasks.filter(
        (t) => t.assignedAt !== task.assignedAt
      );

      const updateTaskCount = {
        ...employee.taskCount,
        completed: task.completed
          ? (employee.taskCount?.completed || 1) - 1
          : employee.taskCount?.completed || 0,
        failed: task.failed
          ? (employee.taskCount?.failed || 1) - 1
          : employee.taskCount?.failed || 0,
      };

      const updatedEmployee = {
        ...employee,
        tasks: updatedTasks,
        taskCount: updateTaskCount,
      };

      const res = await fetch(
        `https://6883945221fa24876a9e938e.mockapi.io/api/v1/employees/${employee.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedEmployee),
        }
      );

      const data = await res.json();

      const updatedEmployees = employees.map((emp) =>
        emp.id === data.id ? data : emp
      );

      setEmployees(updatedEmployees);
      sessionStorage.setItem("loggedInUser", JSON.stringify(data));
      setTasks(data.tasks);
      onClose();
    } catch (err) {
      console.log("Accept Task Error:", err);
    }
  };
  const accept = async () => {
    try {
      const loggedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      const employee = employees.find((emp) => emp.id === loggedUser.id);

      if (!employee) return;

      const updatedTasks = employee.tasks.map((t) =>
        t.assignedAt === task.assignedAt
          ? {
              ...t,
              newTask: false,
              active: true,
              completed: false,
              failed: false,
            }
          : t
      );

      const updateTaskCount = {
        ...employee.taskCount,
        newTask: (employee.taskCount?.newTask || 1) - 1,
        active: (employee.taskCount?.active || 0) + 1,
      };

      const updatedEmployee = {
        ...employee,
        tasks: updatedTasks,
        taskCount: updateTaskCount,
      };

      const res = await fetch(
        `https://6883945221fa24876a9e938e.mockapi.io/api/v1/employees/${employee.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedEmployee),
        }
      );

      const data = await res.json();

      const updatedEmployees = employees.map((emp) =>
        emp.id === data.id ? data : emp
      );

      setEmployees(updatedEmployees);
      sessionStorage.setItem("loggedInUser", JSON.stringify(data));
      setTasks(data.tasks);
      onClose();
    } catch (err) {
      console.log("Accept Task Error:", err);
    }
  };

  return (
    <>
      <Modal
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-linear-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        isOpen={isOpen}
        onOpenChange={onClose}
        setTasks={setTasks}
      >
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="flex bg-transparent flex-col gap-1">
                Task Detail
              </ModalHeader>
              <ModalBody>
                <div className="shadow-lg shadow-blue-200 p-2 flex-wrap rounded-3xl break-words overflow-auto bg-gray-200 max-h-60">
                  {task.description}
                </div>
              </ModalBody>
              <ModalFooter>
                {task.newTask &&
                  !task.active &&
                  !task.completed &&
                  !task.failed && (
                    <Button color="primary" onPress={accept}>
                      Accept
                    </Button>
                  )}
                {task.active && !task.failed && !task.completed && (
                  <>
                    <Button color="success" onPress={completed}>
                      Completed
                    </Button>
                    <Button color="danger" onPress={failed}>
                      Failed
                    </Button>
                  </>
                )}

                {(task.failed || task.completed) && (
                  <Button color="danger" variant="solid" onPress={remove}>
                    Remove Task
                  </Button>
                )}
                {/* Close always shown */}
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
//model END

export default function AllTaskList() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tasks, setTasks] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch tasks assigned to the logged-in user
  useEffect(() => {
    const fetchLoggedUserTasks = async () => {
      try {
        const loggedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        if (!loggedUser?.id) return;

        const res = await fetch(
          `https://6883945221fa24876a9e938e.mockapi.io/api/v1/employees/${loggedUser.id}`
        );
        const updatedUser = await res.json();
        setTasks(updatedUser?.tasks || []);
      } catch (err) {
        console.log("Failed to fetch tasks:", err);
      }
    };

    fetchLoggedUserTasks();
  }, []);

  // Calculate progress and time left for each task
  useEffect(() => {
    const updateProgress = () => {
      const updatedProgress = tasks.map((task) => {
        const currentTime = new Date();
        const assignTime = new Date(task.assignedAt);
        const dueTime = new Date(task.dueDate);

        const totalTime = dueTime - assignTime;
        const elapsed = currentTime - assignTime;
        const timeLeft = dueTime - currentTime;

        const percent =
          totalTime > 0
            ? Math.min(Math.max((elapsed / totalTime) * 100, 0), 100)
            : 0;

        let color = "bg-blue-600";
        let label = "Bohot time hai";

        if (timeLeft <= 0) {
          color = "bg-red-600";
          label = "Overdue";
        } else if (timeLeft <= 5 * 60 * 1000) {
          color = "bg-orange-500";
          label = "5 mins left";
        } else if (timeLeft <= 30 * 60 * 1000) {
          color = "bg-yellow-300";
          label = "30 mins left";
        }

        return {
          progress: percent.toFixed(1),
          color,
          label,
        };
      });

      setProgressData(updatedProgress);
    };

    updateProgress(); // Initial call
    const interval = setInterval(updateProgress, 1000); // Recalculate every second

    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <div className="flex">
      <TaskModal
        isOpen={isOpen}
        onClose={onOpenChange}
        task={selectedTask}
        setTasks={setTasks}
      />

      <div className="w-full overflow-auto shadow-xl rounded-2xl justify-start  flex flex-nowrap lg:gap-5 h-75">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg ">
          <thead className="sticky top-0 z-10">
            <tr className="bg-blue-300 text-gray-700">
              <th className="py-2 min-w-[12rem] h-[5rem] text-center">Tasks</th>
              <th className="py-2 min-w-[12rem] h-[5rem] text-center">
                Assigned Date
              </th>
              <th className="py-2 min-w-[12rem] h-[5rem] text-center">
                Status
              </th>
              <th className="py-2 min-w-[12rem] h-[5rem] text-center">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No tasks available.
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <tr
                  key={index}
                  className="border-t transition duration-300 ease-in-out hover:shadow-md hover:bg-blue-100  cursor-pointer"
                  onClick={() => {
                    setSelectedTask(task);
                    onOpen();
                  }}
                >
                  <td className="py-2 text-center w-[25%]">{task.title}</td>
                  <td className="py-2 text-center w-[25%]">
                    {new Date(task.assignedAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="py-2 capitalize text-center w-[25%]">
                    {task.newTask && progressData[index] ? (
                      <div className="flex flex-col items-center justify-center py-3 px-3 w-full">
                        <p className="justify-center bg-purple-200 rounded-full p-1 flex">
                          New Task
                        </p>
                        <div className="mt-2 w-full justify-between flex">
                          <p className="text-[10px] ">
                            {new Intl.DateTimeFormat("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            }).format(new Date(task.assignedAt))}
                            <br />
                            {new Intl.DateTimeFormat("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }).format(new Date(task.assignedAt))}
                          </p>
                          <p className="text-xs mt-1 text-center">
                            {progressData[index].label}
                          </p>
                          <p className="text-[10px] ">
                            {new Intl.DateTimeFormat("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            }).format(new Date(task.dueDate))}
                            <br />
                            {new Intl.DateTimeFormat("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }).format(new Date(task.dueDate))}
                          </p>
                        </div>
                        <div className="h-4 bg-blue-200 rounded-full overflow-hidden w-full">
                          <div
                            className={`h-full ${progressData[index].color} rounded-full transition-all`}
                            style={{
                              width: `${progressData[index].progress}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ) : task.completed ? (
                      <p className="justify-center bg-green-200 rounded-full p-1 flex">
                        Completed
                      </p>
                    ) : task.active ? (
                      <p className="justify-center bg-blue-200 rounded-full flex">
                        Active
                      </p>
                    ) : (
                      <p className="justify-center bg-red-200 rounded-full p-1 flex">
                        Failed
                      </p>
                    )}
                  </td>
                  <td className="py-2 text-center w-[25%]">{task.category}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
