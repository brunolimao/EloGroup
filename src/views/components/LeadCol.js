import React from "react";
import Col from 'react-bootstrap/Col';
import Lead from "./Lead";

function LeadCol({lead, leadRef, dragHover, leadType, onDropLead, origin, name}) {
  return (
    <Col className={`col-10 col-sm-10 col-lg-3 col-md-3 m-2 px-0 ${dragHover}`}>
      <div className={`${leadType} text-white`}>
        <div className="font-weight-bold py-2">{name}</div>
      </div>
      <ul className="list-group h-100" ref={leadRef}>
        {lead.map((lead, idx) => (
          <Lead
            {...lead}
            key={idx}
            hover={dragHover}
            index={idx}
            leadType={leadType}
            onDropLead={onDropLead}
            origin={origin}
          />
        ))}
      </ul>
    </Col>
  )
}

export default LeadCol