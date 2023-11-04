import { BsSliders2 } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { useRef, useState } from "react";
import {
  Data,
  GroupedData,
  groupByPriority,
  groupByStatus,
  groupByUser,
  sortTicketsByPriority,
  sortTicketsByTitle,
} from "./groupByPrioritise";

interface Props {
  data: Data;
  groupedData: GroupedData[];
  setGroupedData: any;
  groupBy: any;
  setGroupBy: any;
  sortBy: any;
  setSortBy: any;
}

function NavBar(props: Props) {
  const [show, setShow] = useState(false);
  const { data, setGroupedData, groupedData } = props;
  const dropdownRef = useRef(null);

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  // const handleClickOutside = (event: any) => {
  //   if (dropdownRef.current && !(event.target in dropdownRef.current)) {
  //     // Clicked outside the dropdown, close it
  //     setShow(false);
  //   }
  // };

  const handleGroupByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setGroupBy(event.target.value);

    switch (event.target.value) {
      case "user":
        const userGroupedData = groupByUser(data);
        setGroupedData(userGroupedData);
        break;

      case "status":
        const statusGroupedData = groupByStatus(data);
        setGroupedData(statusGroupedData);
        break;

      case "priority":
        const priorityGroupedData = groupByPriority(data);
        setGroupedData(priorityGroupedData);
        break;
    }
  };

  const handleOrderByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setSortBy(event.target.value);

    switch (event.target.value) {
      case "title":
        setGroupedData(sortTicketsByTitle(groupedData));
        break;

      case "priority":
        setGroupedData(sortTicketsByPriority(groupedData));
        break;
    }
  };

  const displayHandler = () => {
    setShow(!show);
  };

  return (
    <div className="nav-bar">
      <div className="display-button" onClick={displayHandler}>
        <BsSliders2 />
        Display
        <BiChevronDown />
      </div>

      {show && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            display: "flex",
            background: "#ddd",
            padding: 15,
            flexDirection: "column",
            borderRadius: 8,
            top: 50,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div style={{ flex: 1, padding: "5px" }}>Grouping</div>
            <div style={{ flex: 1, padding: "5px", marginLeft: 40 }}>
              <select value={props.groupBy} onChange={handleGroupByChange}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flex: 1, padding: "5px" }}>Ordering</div>
            <div style={{ flex: 1, padding: "5px", marginLeft: 40 }}>
              <select value={props.sortBy} onChange={handleOrderByChange}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
