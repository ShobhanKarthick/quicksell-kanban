import { RxAvatar } from "react-icons/rx";
import { AiFillCheckCircle } from "react-icons/ai";
import { PiCircleFill } from "react-icons/pi";
import Tag from "./Tag";
import { Ticket } from "./groupByPrioritise";

interface Props {
  ticket: Ticket;
  user?: string;
}

function Card(props: Props) {
  return (
    <div className="card">
      <div className="card-head">
        <div className="card-id">{props.ticket.id}</div>
        <div className="card-user-avatar" title={props.user}>
          <RxAvatar />
        </div>
      </div>
      <div className="card-body">
        <div className="card-checkbox">
          <AiFillCheckCircle />
        </div>
        <div className="card-title">{props.ticket.title}</div>
      </div>
      <div className="card-footer">
        <Tag icon={<PiCircleFill />} title={""} />
        {props.ticket.tag.map((t, index) => {
          return <Tag icon={<PiCircleFill />} key={index} title={t} />;
        })}
      </div>
    </div>
  );
}

export default Card;
