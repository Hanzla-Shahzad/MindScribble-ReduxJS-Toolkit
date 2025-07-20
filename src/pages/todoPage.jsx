import { useEffect, useState } from "react";
import {
  addTodos,
  editTodos,
  todoData,
  todoDelete,
} from "../thunks/todoAsyncThunk";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAddCircle } from "react-icons/io";

const cardColors = [
  "bg-yellow-100",
  "bg-blue-100",
  "bg-pink-100",
  "bg-green-100",
  "bg-purple-100",
  "bg-orange-100",
];

export default function TodoPage() {
  const state = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const [todoInp, setTodoInp] = useState("");
  const [editBtn, setEditBtn] = useState(false);
  const [hideInp, setHideInp] = useState(false);

  const handleDeleteTodo = (id) => {
    dispatch(todoDelete({ id }));
  };

  const handleAddData = () => {
    if (!todoInp.trim()) return;

    if (editBtn) {
      dispatch(editTodos({ id: editBtn.id, title: todoInp }));
      setEditBtn(false);
      setHideInp(false);
    } else {
      dispatch(addTodos({ title: todoInp }));
    }
    setTodoInp("");
  };

  useEffect(() => {
    dispatch(todoData());
  }, [dispatch]);

  const handleFloabtn = () => {
    if (editBtn) {
      alert("Please complete your editing first before adding a new todo.");
      return;
    }
    setHideInp((prev) => !prev);
    setTodoInp("");
  };

  return (
    <div className="w-[80%] float-end min-h-screen bg-gradient-to-tr from-slate-100 to-gray-200 text-black p-8 pt-4 font-sans">
      <div className="max-w-7xl mx-auto mt-20">
        {hideInp && (
          <div className="mb-6 flex gap-4 items-center animate-fade-in">
            <input
              type="text"
              placeholder="What's on your mind?"
              className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg shadow"
              value={todoInp}
              onChange={(e) => setTodoInp(e.target.value)}
            />
            <button
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg transition-all text-lg font-semibold"
              onClick={handleAddData}
            >
              {editBtn ? "Update" : "Add"}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {state.data?.map((curVal, index) => (
            <div
              key={curVal.id}
              className={`rounded-2xl p-6 shadow-md ${
                cardColors[index % cardColors.length]
              } hover:shadow-xl transition-all duration-300 animate-fade-in relative overflow-hidden`}
            >
              <span className="absolute top-2 right-3 text-[10px] font-bold bg-black/10 px-2 py-0.5 rounded-full text-gray-600">
                #{curVal.id}
              </span>
              <div className="mt-2">
                <h3 className="text-xl font-semibold leading-snug break-words">
                  {curVal.title}
                </h3>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => handleDeleteTodo(curVal.id)}
                  className="text-xs bg-gradient-to-tr from-red-500 to-rose-400 text-white px-4 py-1.5 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all font-semibold tracking-wide"
                >
                  ❌ Delete
                </button>
                <button
                  onClick={() => {
                    setTodoInp(curVal.title);
                    setEditBtn(curVal);
                    setHideInp(true);
                  }}
                  className="text-xs bg-gradient-to-tr from-teal-500 to-cyan-400 text-white px-4 py-1.5 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all font-semibold tracking-wide"
                >
                  ✏️ Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleFloabtn}
        className="fixed bottom-6 right-6 bg-gradient-to-tr from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-4xl p-4 rounded-full shadow-lg transition-all"
      >
        <IoMdAddCircle />
      </button>
    </div>
  );
}
