import CardColumn from "./CardColumn";
import { Data, GroupedData } from "./groupByPrioritise";

interface Props {
  data: Data;
  groupedData: GroupedData[];
  groupBy: any;
  setGroupBy: any;
  sortBy: any;
  setSortBy: any;
}

function Kanban(props: Props) {
  const { groupedData } = props;

  return (
    <div className="kanban-container">
      {groupedData.map((item: GroupedData, index) => {
        return (
          <CardColumn
            key={index}
            title={item.key}
            icon={item.icon}
            tickets={item.tickets}
            users={props.data.users}
          />
        );
      })}
    </div>
  );
}

export default Kanban;
