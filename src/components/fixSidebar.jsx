import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { userData } from "../thunks/userAsyncThunk";
import { fetchTodos } from "../thunks/postAsynThunk";
import { todoData } from "../thunks/todoAsyncThunk";
import { commentsData } from "../thunks/commentsAsyncThunk";
import { useNavigate, useParams } from "react-router-dom";

function FixSidebar() {
  const {
    data: users,
    isLoading,
    isError,
  } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { id: routeUserId } = useParams();
  const naviGate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);

  const handleClickUser = (userId) => {
    setSelectedId(userId);
    naviGate(`/id/${userId}`);
    dispatch(fetchTodos({ id: userId }));
    dispatch(todoData({ id: userId }));
    dispatch(commentsData({ id: userId }));
  };

  useEffect(() => {
    dispatch(userData());
  }, []);

  useEffect(() => {
    if (users?.length > 0) {
      const initialId = parseInt(routeUserId) || users[0].id;
      setSelectedId(initialId);
      dispatch(fetchTodos({ id: initialId }));
      dispatch(todoData({ id: initialId }));
      dispatch(commentsData({ id: initialId }));
    }
  }, [users]);

  return (
    <div className="w-[22%] h-full fixed left-0 top-0 bg-white shadow-lg p-5 overflow-y-auto border-r border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Users</h2>

      {isLoading && (
        <div className="flex items-center justify-center h-full w-full bg-white/50 rounded-lg">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
            <div className="absolute inset-2 bg-blue-500 rounded-full animate-pulse opacity-70"></div>
          </div>
        </div>
      )}

      {isError && (
        <p className="text-red-500 font-medium">Failed to load users.</p>
      )}

      {!isLoading && !isError && (
        <ul className="flex flex-col gap-3">
          {users?.map((user) => (
            <li
              key={user.id}
              onClick={() => handleClickUser(user.id)}
              className={`${
                selectedId === user.id ? "bg-red-400 text-white" : "bg-white"
              } hover:bg-blue-100 transition-colors p-3 rounded-lg shadow-sm border border-gray-200 cursor-pointer`}
            >
              <p className="font-medium">{user.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FixSidebar;
