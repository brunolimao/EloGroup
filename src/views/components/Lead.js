import {useDrag} from 'react-dnd'

const Lead = ({ index, name, onDropLead, leadType, origin, hover }) => {
  const [, dragRef] = useDrag({
    item: { index, name, origin },
    type: leadType,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onDropLead(item, origin);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })
  if (hover === "bg-success") {
    return (
      <div className='lead bg-success' ref={dragRef}>
        {name}
      </div>
    )
  } else if (index % 2 === 0) {
    return (
      <div className='lead off-white' ref={dragRef}>
        {name}
      </div>
    )
  }
  else {
    return (
      <div className='lead grey' ref={dragRef}>
        {name}
      </div>
    )
  }
}

export default Lead