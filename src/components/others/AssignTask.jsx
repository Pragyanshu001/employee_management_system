import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@heroui/react";
import { Modal, useDisclosure } from "@heroui/react";
import CustomModal from "../MinnorComp.jsx/CustomModal";
import { useAuth } from "../../AuthProvider/AuthProvider";
import React from "react";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export const DeleteIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

const statusColorMap = {
  Active: "success",
  Failed: "danger",
  Conpleted: "warning",
};

export default function AssignTask() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { employees, setEmployees } = useAuth();

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(
        `https://6883945221fa24876a9e938e.mockapi.io/api/v1/employees/${id}`,
        {
          method: "DELETE",
        }
      );

      // Remove from UI
      const updated = employees.filter((emp) => emp.id !== id);
      setEmployees(updated);

      // Optional: Remove from sessionStorage if needed
      const logged = JSON.parse(sessionStorage.getItem("loggedInUser"));
      if (logged?.id === id) {
        sessionStorage.removeItem("loggedInUser");
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip color="danger" content="Delete user">
              <span
                onClick={() => handleDelete(user.id)}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      {/* Modal Include */}
      <CustomModal isOpen={isOpen} onClose={onOpenChange} />

      <div className="flex py-3 px-10 items-center justify-between bg-white rounded-2xl h-20">
        <div className="text-3xl text-blue-900 font-semibold s   flex ">
          Create New Employee
        </div>

        <button
          onClick={onOpen}
          className=" font-semibold transition duration-300 ease-in-out hover:shadow-md hover:scale-105 text-white hover:bg-cyan-700  cursor-pointer bg-cyan-600 rounded-full h-[70%] w-[15%] "
        >
          Create
        </button>
      </div>
      <div className=" bg-white rounded-2xl mt-5 p-1 h-94">
        <Table
          className=" rounded-2xl overflow-auto h-94"
          aria-label="Example table with custom cells"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                className="sticky top-0 z-10 "
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody items={employees} emptyContent="No Employees Found">
            {(item) => (
              <TableRow
                key={item.id}
                className="transition duration-300 ease-in-out hover:shadow-md hover:bg-blue-100 hover:scale-[1.01] cursor-pointer"
              >
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
