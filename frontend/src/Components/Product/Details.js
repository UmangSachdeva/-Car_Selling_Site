import React from "react";
import DetailsCard from "./DetailsCard";

function Details() {
  return (
    <section>
      <div className="section-head">
        <span className="section-sub">know you car</span>

        <p className="section-main">details.</p>
      </div>

      <div className="section-body">
        <DetailsCard cardFor="engine" />
        <DetailsCard cardFor="tyre" />
        <DetailsCard cardFor="gearbox" />
        <DetailsCard cardFor="clutch" />
      </div>

      <div className="more-details">
        <div>
          <span className="detail-head">Max. Speed</span>
          <p className="value">
            120 <span className="unit">kmph</span>
          </p>
        </div>
        <div className="bdr"></div>
        <div>
          <span className="detail-head">Max. Speed</span>
          <p className="value">
            120 <span className="unit">kmph</span>
          </p>
        </div>
        <div className="bdr"></div>
        <div>
          <span className="detail-head">Max. Speed</span>
          <p className="value">
            120 <span className="unit">kmph</span>
          </p>
        </div>
        <div className="bdr"></div>
        <div>
          <span className="detail-head">Max. Speed</span>
          <p className="value">
            120 <span className="unit">kmph</span>
          </p>
        </div>
        <div className="bdr"></div>
        <div>
          <span className="detail-head">Max. Speed</span>
          <p className="value">
            120 <span className="unit">kmph</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Details;
