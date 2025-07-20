import { Outlet } from "react-router-dom";
import FixSidebar from "./fixSidebar";
import Btns from "../allBtns/btns";

function FixItems() {
  return (
    <>
      <Btns />
      <Outlet />
      <FixSidebar />
    </>
  );
}
export default FixItems;
