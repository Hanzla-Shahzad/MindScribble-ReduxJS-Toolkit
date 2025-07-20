import PostsBtn from "../buttons/postsBtn";
import TodosBtn from "../buttons/todosBtn";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Btns() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
      <PostsBtn
        isActive={location.pathname === `/id/${id}`}
        onClick={() => navigate(`/id/${id}`)}
      />
      <TodosBtn
        isActive={location.pathname === `/id/${id}/todoPage`}
        onClick={() => navigate(`/id/${id}/todoPage`)}
      />
    </div>
  );
}
