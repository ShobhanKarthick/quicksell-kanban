import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { FaCircleHalfStroke } from "react-icons/fa6";

interface Props {
  title: string;
  icon?: React.ComponentType;
  count: number;
}

function CardColumnHeader(props: Props) {
  console.log(props.icon);
  const IconComponent = props.icon || FaCircleHalfStroke; // Use the default icon if no icon is provided
  return (
    <div className="card-column-header">
      <div className="card-column-icon">
        <IconComponent />
      </div>
      <div className="card-column-title">{props.title}</div>
      <div className="card-column-count">{props.count}</div>
      <div className="card-column-add">
        <AiOutlinePlus />
      </div>
      <div className="card-column-menu">
        <BiDotsHorizontalRounded />
      </div>
    </div>
  );
}

export default CardColumnHeader;
