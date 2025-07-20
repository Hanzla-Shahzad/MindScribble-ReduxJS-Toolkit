import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentsData } from "../thunks/commentsAsyncThunk";

export default function CommentsPage() {
  const state = useSelector((state) => state.comments);
  const disPtach = useDispatch();

  useEffect(() => {
    disPtach(commentsData());
  }, [disPtach]);
  return (
    <>
      <div className="w-[78%] float-end mx-auto p-6 space-y-6 mt-15">
        {/* Input Section */}
        <div className="flex flex-col sm:flex-row items-stretch gap-4">
          <input
            type="text"
            placeholder="Enter comment..."
            className="flex-1 px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
            Add
          </button>
        </div>

        <ul className="space-y-4">
          {Array.isArray(state.data) &&
            state.data.map((curVal) => (
              <li
                key={curVal.id}
                className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 space-y-2"
              >
                <p className="text-2xl font-bold text-gray-900 mb-3 break-words">
                  🆔 ID: {curVal.id}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {curVal.name}
                </p>
                <p className="text-sm text-gray-500">{curVal.email}</p>
                <p className="text-gray-700">{curVal.body}</p>

                <div className="flex gap-3 mt-4">
                  <button className="px-4 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 transition">
                    Delete
                  </button>
                  <button className="px-4 py-1 bg-yellow-400 text-white rounded-xl hover:bg-yellow-500 transition">
                    Edit
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
