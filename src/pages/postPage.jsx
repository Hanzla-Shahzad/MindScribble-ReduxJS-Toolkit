import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  deleteTodo,
  addTodo,
  editTodo,
} from "../thunks/postAsynThunk";
import {
  addComment,
  commentsData,
  deleteCommentsData,
  editComment,
} from "../thunks/commentsAsyncThunk";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoMdAddCircle } from "react-icons/io";

function Main() {
  const dispatch = useDispatch();
  const { data: posts } = useSelector((state) => state.post);
  const { data: comments } = useSelector((state) => state.comments);

  const [inputVal, setInputVal] = useState("");
  const [editPost, setEditPost] = useState(null);
  const [visibleCommentId, setVisibleCommentId] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [editCommentData, setEditCommentData] = useState(null);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = (id) => dispatch(deleteTodo(id));

  const handleAddOrEditPost = () => {
    if (!inputVal.trim()) return;
    if (editPost) {
      dispatch(editTodo({ id: editPost.id, post: { title: inputVal } }));
      setEditPost(null);
    } else {
      dispatch(addTodo({ title: inputVal }));
    }
    setInputVal("");
    setShowInput(false);
  };

  const handleToggleComments = (id) => {
    if (visibleCommentId === id) {
      setVisibleCommentId(null);
    } else {
      dispatch(commentsData({ id }));
      setVisibleCommentId(id);
    }
  };

  const handleDeleteComment = (id) => dispatch(deleteCommentsData({ id }));

  const handleAddOrEditComment = (postId) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    if (editCommentData) {
      dispatch(editComment({ id: editCommentData.id, postId, body: text }));
      setEditCommentData(null);
    } else {
      dispatch(addComment({ postId, body: text }));
    }
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleFloatingButton = () => {
    if (editPost) {
      alert("Please finish editing before adding a new post.");
      return;
    }
    setShowInput((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-8 w-[80%] float-end">
      <div className="max-w-6xl mx-auto text-center">
        {showInput && (
          <div className="flex justify-center items-center gap-3 mt-8 mb-44 fixed top-20 left-[57%] right-1/3 z-10">
            <input
              type="text"
              className="bg-white shadow-md text-black pl-4 w-72 py-2 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Write something..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button
              onClick={handleAddOrEditPost}
              className="bg-indigo-500 text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all font-semibold"
            >
              {editPost ? <CiEdit size={20} /> : "Add"}
            </button>
          </div>
        )}

        <ul className="space-y-8 mt-40">
          {posts?.map((post) => (
            <li key={post.id} className="w-full">
              <div className="bg-gray-900 p-6 rounded-xl shadow w-full max-w-2xl mx-auto border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={`https://i.pravatar.cc/40?img=${post.id}`}
                    className="w-10 h-10 rounded-full"
                    alt="avatar"
                  />
                  <div>
                    <p className="text-sm font-semibold">User {post.id}</p>
                    <p className="text-xs text-gray-400">Posted just now</p>
                  </div>
                </div>

                <h2 className="text-xl font-bold mb-2 break-words">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  Completed:{" "}
                  <span
                    className={
                      post.completed ? "text-green-400" : "text-red-400"
                    }
                  >
                    {post.completed ? "Yes" : "No"}
                  </span>
                </p>

                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-gradient-to-tr from-red-500 via-red-600 to-red-700 text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 hover:shadow-md transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setInputVal(post.title);
                      setEditPost(post);
                      setShowInput(true);
                    }}
                    className="bg-gradient-to-tr from-yellow-400 via-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 hover:shadow-md transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleComments(post.id)}
                    className="text-indigo-400 underline text-sm hover:text-indigo-300"
                  >
                    {visibleCommentId === post.id
                      ? "Hide Comments"
                      : "Show Comments"}
                  </button>
                </div>

                {visibleCommentId === post.id && (
                  <div className="mt-6 space-y-4 text-left">
                    <div className="flex items-start gap-3">
                      <img
                        src={`https://i.pravatar.cc/40?img=${post.id + 20}`}
                        className="w-8 h-8 rounded-full"
                        alt="avatar"
                      />
                      <div className="flex flex-col w-full">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={commentInputs[post.id] ?? ""}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({
                              ...prev,
                              [post.id]: e.target.value,
                            }))
                          }
                          className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
                        />
                        <button
                          onClick={() => handleAddOrEditComment(post.id)}
                          className="self-end mt-2 text-sm px-4 py-1 rounded-full bg-indigo-500 text-white hover:bg-indigo-600"
                        >
                          {editCommentData ? "Update" : "Post"}
                        </button>
                      </div>
                    </div>

                    {comments
                      ?.filter((c) => c.postId === post.id)
                      .map((comment) => (
                        <div
                          key={comment.id}
                          className="flex items-start gap-3 p-4 border rounded-lg bg-gray-800 shadow-sm border-gray-700"
                        >
                          <img
                            src={`https://i.pravatar.cc/40?img=${
                              comment.id + 10
                            }`}
                            className="w-9 h-9 rounded-full"
                            alt="avatar"
                          />
                          <div className="flex flex-col w-full">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-semibold">
                                  {comment.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {comment.email}
                                </p>
                              </div>
                              <p className="text-xs text-gray-500">Just now</p>
                            </div>
                            <p className="text-sm text-gray-200 mt-2">
                              {comment.body}
                            </p>

                            <div className="flex gap-3 text-xs text-gray-400 mt-3">
                              <button
                                className="hover:underline"
                                onClick={() => {
                                  setCommentInputs((prev) => ({
                                    ...prev,
                                    [comment.postId]: comment.body,
                                  }));
                                  setEditCommentData(comment);
                                }}
                              >
                                ✏️ Edit
                              </button>
                              <button
                                className="hover:underline"
                                onClick={() => handleDeleteComment(comment.id)}
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleFloatingButton}
        className="fixed bottom-6 right-6 bg-gradient-to-tr from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-4xl p-4 rounded-full shadow-lg transition-all"
      >
        <IoMdAddCircle />
      </button>
    </div>
  );
}

export default Main;
