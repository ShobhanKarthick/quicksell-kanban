import Card from "./Card";
import CardColumnHeader from "./CardColumnHeader";
import { Ticket, User } from "./groupByPrioritise";

interface Props {
  title: string;
  icon?: any;
  tickets: Ticket[];
  users: User[];
}

function CardColumn(props: Props) {
  return (
    <div className="card-column">
      <CardColumnHeader
        title={props.title}
        icon={props.icon}
        count={props.tickets.length}
      />
      <div className="card-column-body">
        {props.tickets.map((ticket: Ticket, index) => {
          const user_ = props.users.find((user) => user.id === ticket.userId);
          console.log(user_);
          return <Card ticket={ticket} key={index} user={user_?.name} />;
        })}
      </div>
    </div>
  );
}

export default CardColumn;
