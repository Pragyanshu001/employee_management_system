import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [description, setDescription] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  // Fetch sab employees ek baar component mount pe
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://6883945221fa24876a9e938e.mockapi.io/api/v1/employees"
        );
        const data = await res.json();
        setTeamMembers(data);
      } catch (err) {
        console.error("Failed to fetch team members", err);
      }
    })();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDueDate(null);
    setDescription("");
    setCategory("");
    setAssignTo("");
    toast.info("Form reset ho gaya!");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // naya task object
    const now = new Date();
    const newTask = {
      active: false,
      newTask: true,
      completed: false,
      failed: false,
      title,
      description,
      category,
      dueDate,
      assignedAt: now.toISOString(),
    };

    try {
      // pehle sab employees fetch karo
      const res = await fetch(
        "https://6883945221fa24876a9e938e.mockapi.io/api/v1/employees"
      );
      const allEmps = await res.json();

      // jisko assign karna hai find karo
      const emp = allEmps.find((e) => e.name === assignTo);
      if (!emp) {
        toast.error("Employee nahi mila!");
        return;
      }

      // updated employee object
      const updatedEmp = {
        ...emp,
        tasks: [...(emp.tasks || []), newTask],
        taskCount: {
          ...emp.taskCount,
          newTask: (emp.taskCount?.newTask || 0) + 1,
        },
      };

      // ab PUT request
      const putRes = await fetch(
        `https://6883945221fa24876a9e938e.mockapi.io/api/v1/employees/${emp.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedEmp),
        }
      );

      if (!putRes.ok) throw new Error("Update failed");

      // yahan updated data milega
      const saved = await putRes.json();
      console.log(saved);

      // sessionStorage update (taaki loggedInUser bhi reflect kare)
      const logged = JSON.parse(sessionStorage.getItem("loggedInUser"));
      if (logged?.id === saved.id) {
        sessionStorage.setItem("loggedInUser", JSON.stringify(saved));
        window.location.reload(); // ✅ This reloads the app so Header gets latest data
      }

      toast.success("Task assign ho gaya!");
      setTitle("");
      setDueDate(null);
      setDescription("");
      setCategory("");
      setAssignTo("");
    } catch (err) {
      console.error(err);
      toast.error("Kuch gadbad ho gayi.");
    }
  };

  return (
    <div className="w-full mt-7 rounded-3xl">
      <form
        onSubmit={submitHandler}
        className="w-full bg-white rounded-3xl px-10 py-6 flex flex-col gap-4"
      >
        <h1 className="text-4xl text-[#053E82]">Create new Task</h1>

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Task Title"
          className="w-full bg-gray-200 p-2 rounded focus:ring-2 focus:ring-blue-400"
        />

        {/* Dates */}
        <div className="flex justify-between">
          <input
            readOnly
            value={new Date().toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
            className="w-1/3 bg-gray-200 p-2 rounded text-center"
          />
          <DatePicker
            showTimeSelect
            timeIntervals={5}
            timeFormat="h:mm aa"
            dateFormat="dd-MMM-yyyy h:mm aa"
            selected={dueDate}
            onChange={setDueDate}
            placeholderText="Select Due Date & Time"
            className="px-30 bg-gray-200 p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Assign To */}
        <select
          value={assignTo}
          onChange={(e) => setAssignTo(e.target.value)}
          className="w-full bg-gray-200 p-2 rounded focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            Select Employee
          </option>
          {teamMembers.map((emp) => (
            <option key={emp.id} value={emp.name}>
              {emp.name}
            </option>
          ))}
        </select>

        {/* Category */}
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          placeholder="Category"
          className="w-full bg-gray-200 p-2 rounded focus:ring-2 focus:ring-blue-400"
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={4}
          className="w-full bg-gray-200 p-2 rounded focus:ring-2 focus:ring-blue-400"
        />

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-emerald-400 py-2 px-6 rounded text-white hover:bg-emerald-500"
          >
            Create Task
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-cyan-900 py-2 px-6 rounded text-white hover:bg-cyan-800"
          >
            RESET
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
