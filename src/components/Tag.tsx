interface Props {
  icon: any;
  title?: string;
}

function Tag(props: Props) {
  return (
    <div className="tag">
      <div className="tag-icon">{props.icon}</div>
      {props.title && <div className="tag-desc">{props.title} </div>}
    </div>
  );
}

export default Tag;
