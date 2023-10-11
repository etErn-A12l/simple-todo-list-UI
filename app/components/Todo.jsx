"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
export const maxTitle = 30;

const Todo = ({ task, index, handleDelete, handleEdit }) => {
  const [isDone, setIsDone] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [isDetailsVisible, setDetailsVisible] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDesc, setEditedDesc] = useState(task.desc);

  const handleTitle = (e) => {
    const title_ = e.target.value;
    if (title_.length <= maxTitle) {
      setEditedTitle(title_);
    }
  };

  const toggleDetails = () => {
    setDetailsVisible(!isDetailsVisible);
  };

  const handletaskDone = () => {
    setIsDone(!isDone);
  };

  const handleToggleEdit = () => {
    setToggleEdit(true);
  };

  const handleSaveEdit = () => {
    handleEdit(index, editedTitle, editedDesc);
    setToggleEdit(false);
  };

  return (
    <li className="flex flex-grow justify-between w-full md:w-auto md:min-w-[500px] max-w-2xl items-center bg-[#F4F2FF] rounded-lg px-5 py-3 my-5 md:mx-8 gap-4 md:flex-row md:flex-grow shadow-lg shadow-black/30">
      <div className="flex flex-col">
        {toggleEdit ? (
          <div className="flex flex-col gap-3 mt-3 w-[62vw] md:w-[40vw]">
            <input
              type="text"
              placeholder="Edit the title"
              className="bg-[#F4F2FF]  p-2 border-2 border-[#2B1887] rounded-lg"
              value={editedTitle}
              onChange={handleTitle}
            />
            <textarea
              rows={3}
              placeholder="Edit the description"
              className="bg-[#F4F2FF]  p-2 border-2 border-[#2B1887] rounded-lg"
              value={editedDesc}
              onChange={(e) => setEditedDesc(e.target.value)}
            />
            <button
              className="text-white bg-green-400 hover:bg-green-700 rounded-md p-2"
              onClick={handleSaveEdit}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-3">
              <input
                type="checkbox"
                id="done"
                name="title"
                className="h-5 w-5 rounded-lg"
                onClick={() => {
                  handletaskDone(index);
                }}
              />
              <label
                for="title"
                className={`md:text-xl font-bold ${
                  isDone ? "line-through" : ""
                }`}
              >
                {task.title}
              </label>
              <button
                className={`text-pink-400 text-sm ${
                  isDetailsVisible ? "hidden" : "block"
                }`}
                onClick={toggleDetails}
              >
                Show Details
              </button>
              <button
                className={`text-pink-400 text-sm ${
                  !isDetailsVisible ? "hidden" : "block"
                }`}
                onClick={toggleDetails}
              >
                Hide Details
              </button>
            </div>
            {isDetailsVisible ? (
              <p className="mt-4 text-sm text-justify px-8">{task.desc}</p>
            ) : (
              <p></p>
            )}
          </div>
        )}
      </div>

      {isDone ? (
        <button
          className="text-white rounded-md p-2"
          onClick={() => {
            handleDelete(index);
          }}
        >
          <FontAwesomeIcon className="text-red-600" icon={faTrash} />
        </button>
      ) : (
        <button
          className="text-white rounded-md p-2"
          onClick={handleToggleEdit}
        >
          <FontAwesomeIcon className="text-yellow-600" icon={faPencil} />
        </button>
      )}
    </li>
  );
};

export default Todo;
