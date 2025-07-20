import { NavLink, useParams } from "react-router-dom";

export default function PostsBtn({ onClick, isActive }) {
  const { id } = useParams();
  return (
    <>
      <NavLink
        onClick={onClick}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          isActive
            ? "border-b-4 border-indigo-600 text-indigo-700"
            : "text-gray-500"
        }`}
        to={`/id/${id}`}
      >
        Posts
      </NavLink>
    </>
  );
}
