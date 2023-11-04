import { useEffect, useState } from "react";
import Kanban from "./Kanban";
import NavBar from "./NavBar";
import {
  Data,
  GroupedData,
  groupByStatus,
  sortTicketsByPriority,
} from "./groupByPrioritise";

function KanbanBoard() {
  const [data, setData] = useState<Data>({ tickets: [], users: [] });
  const [groupedData, setGroupedData] = useState<GroupedData[]>([
    { tickets: [], key: "" },
  ]);
  const [groupBy, setGroupBy] = useState<"status" | "user" | "priority">(
    "status"
  );
  const [sortBy, setSortBy] = useState<"priority" | "title">("priority");

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((d) => {
        setData(d);
        setGroupedData(sortTicketsByPriority(groupByStatus(d)));
      });
  }, []);

  return (
    <div className="page">
      <NavBar
        groupedData={groupedData}
        setGroupedData={setGroupedData}
        data={data}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <Kanban
        data={data}
        groupedData={groupedData}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </div>
  );
}

export default KanbanBoard;
