import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useAuth } from "../../AuthProvider/AuthProvider";

export default function BasicPie() {
  const user = JSON.parse(sessionStorage.getItem("loggedInUser"));

  const { employees } = useAuth();

  const employee = employees.find((emp) => emp.id === user.id);

  const taskCount = employee?.taskCount || {
    completed: 0,
    active: 0,
    failed: 0,
  };

  const taskData = [
    { id: 0, label: "Completed", value: taskCount.completed || 0 },
    { id: 1, label: "Active", value: taskCount.active || 0 },
    { id: 2, label: "Failed", value: taskCount.failed || 0 },
    { id: 3, label: "New Task", value: taskCount.newTask || 0 },
  ];

  const valueFormatter = (item) => `${item.value} ${item.label}`;

  return (
    <div className=" p-6 shadow-xl bg-white rounded-2xl w-[300px]">
      <PieChart
        series={[
          {
            data: taskData,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            valueFormatter,
          },
        ]}
        height={250}
        width={250}
      />
    </div>
  );
}
