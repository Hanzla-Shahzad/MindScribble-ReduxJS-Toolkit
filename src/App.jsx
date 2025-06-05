import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  deleteTodo,
  addTodo,
  editTodo,
} from "./reduxSlice/asynThunk";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todo);
  const [inputShow, setInputShow] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [editBtn, setEditBtn] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleAddData = () => {
    if (inputVal === "") return;
    if (editBtn) {
      dispatch(editTodo({ id: editBtn.id, post: { title: inputVal } }));
      setEditBtn(false);
    } else {
      dispatch(addTodo({ title: inputVal }));
    }
    setInputVal("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Todo List</h1>

        <button
          className="bg-black text-white px-6 py-2 rounded-md shadow hover:bg-gray-800 transition-all mb-8"
          onClick={() => {
            dispatch(fetchTodos());
            setInputShow(true);
          }}
        >
          Fetch Todos
        </button>

        <ul>
          {inputShow && (
            <div>
              <input
                type="text"
                className="bg-white rounded-sm shadow-xl pl-2 w-64 py-2 mb-5 border-3 border-white focus:border-emerald-400 focus:outline-none"
                placeholder="Write something..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />

              <button
                className="bg-blue-500 border rounded-sm px-4 text-white ms-1 py-2 hover:bg-blue-400 cursor-pointer "
                onClick={() => handleAddData()}
              >
                {editBtn ? <CiEdit /> : "+"}
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {state.data &&
              state.data.map((curVal) => (
                <li key={curVal.id}>
                  <div className="bg-white rounded-xl shadow-md p-5 text-left hover:shadow-xl transition-shadow">
                    <p className="text-gray-700 font-semibold mb-2">
                      ID: {curVal.id}
                    </p>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                      {curVal.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Completed:{" "}
                      <span
                        className={
                          curVal.completed ? "text-green-600" : "text-red-600"
                        }
                      >
                        {curVal.completed ? "Yes" : "No"}
                      </span>
                    </p>

                    <div className="flex gap-2">
                      <button
                        className="bg-red-500 hover:bg-red-400 text-white px-4 py-1 rounded-md"
                        onClick={() => handleDelete(curVal.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-1 rounded-md"
                        onClick={() => {
                          setInputVal(curVal.title);
                          setEditBtn(curVal);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default App;
