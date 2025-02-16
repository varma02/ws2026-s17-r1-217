import React from 'react';

const items: {[key:string]: any} = {
  "Washer (8kg)": {img: "washing-machine.svg", class: "washer", dnd: true, txt: "Washer (8kg)"},
  "Washer (11 kg)": {img: "washing-machine.svg", class: "washer", dnd: true, txt: "Washer (11 kg)"},
  "Dryer (18 kg)": {img: "washing-machine.svg", class: "dryer", dnd: true, txt: "Dryer (18 kg)"},
  "Dryer (25 kg)": {img: "washing-machine.svg", class: "dryer", dnd: true, txt: "Dryer (25 kg)"},
  "Waiting Area": {img: "armchair.svg", dnd: true, txt: "Waiting Area"},
  "Folding Table": {img: "space.svg", dnd: true, txt: "Folding Table"},
  "Entrance": {class: "entrance"},
  "Wall": {class: "wall", txt: "Wall"},
  "-": {class: "empty"},
}

type Props = {
  floorplan: string[][],
  setFloorplan: React.Dispatch<React.SetStateAction<string[][]>>,
  isError: boolean,
}

export default function FloorplanDesigner(
  {floorplan, setFloorplan, isError}: Props
) {
  function drag(event:any) {
    event.dataTransfer.setData("type", event.target.dataset.type)
  }
  
  function drop(event:any) {
    event.preventDefault();
    const type = event.dataTransfer.getData("type")
    const {x: targetx, y: targety} = event.target.dataset
    setFloorplan(o => (
      o.map((arr, x) => arr.map((v, y) => x == targetx && y == targety ? type  : v))
    ))
    dragLeave(event)
  }

  function dragOver(event:any) {
    event.preventDefault()
    event.target.style = "opacity: 0.25;"
  }

  function dragLeave(event:any) {
    event.target.style = ""
  }

  return (
    <div style={{display: 'contents'}}>
      <h3>Shop layout</h3>
      <div className="dnd-row">
        {Object.entries(items).filter((v) => v[1].dnd).map((v) => (
          <div key={v[0]} className={`grid-item ${v[1].class}`} data-type={v[0]} draggable onDragStart={drag}>
            <img src={v[1].img} alt={v[1].txt} />
            <span>{v[1].txt}</span>
          </div>
        ))}
      </div>
      {isError && (
        <div className="alert">
          <img src="alert.svg" alt="Alert" />
          <span>Washers and Dryers can only be next to a wall</span>
        </div>
      )}
      <div className="grid">
        {floorplan.map((arr, x) => arr.map((v, y) => (
          <div key={(x+1)*y} data-x={x} data-y={y} className={`grid-item ${items[v].class}`}
          onDrop={drop} onDragOver={dragOver} onDragLeave={dragLeave}>
            {items[v].img && <img src={items[v].img} alt={items[v].txt} />}
            {items[v].txt && <span>{items[v].txt}</span>}
          </div>
        )))}
      </div>
    </div>
  )
}