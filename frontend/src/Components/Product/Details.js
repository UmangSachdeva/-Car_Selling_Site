import React from "react";
import DetailsCard from "./DetailsCard";

function Details() {
  return (
    <section>
      <div className="section-head">
        <span className="section-sub">know you car</span>

        <p className="section-main">details.</p>
      </div>

      <div className="section-body mobile:flex-wrap">
        <DetailsCard cardFor="engine" />
        <DetailsCard cardFor="tyre" />
        <DetailsCard cardFor="gearbox" />
        <DetailsCard cardFor="clutch" />
      </div>

      <div className="more-details mobile:flex-wrap mobile:gap-4">
        <div>
          <span className="detail-head mobile:text-lg">Max. Speed</span>
          <p className="value mobile:text-4xl">
            120 <span className="unit mobile:text-xl">kmph</span>
          </p>
        </div>
        <div className="bdr mobile:hidden"></div>
        <div>
          <span className="detail-head mobile:text-lg">Max. Speed</span>
          <p className="value mobile:text-4xl">
            120 <span className="unit mobile:text-xl">kmph</span>
          </p>
        </div>
        <div className="bdr mobile:hidden"></div>
        <div>
          <span className="detail-head mobile:text-lg">Max. Speed</span>
          <p className="value mobile:text-4xl">
            120 <span className="unit mobile:text-xl">kmph</span>
          </p>
        </div>
        <div className="bdr mobile:hidden"></div>
        <div>
          <span className="detail-head mobile:text-lg">Max. Speed</span>
          <p className="value mobile:text-4xl">
            120 <span className="unit mobile:text-xl">kmph</span>
          </p>
        </div>
        <div className="bdr mobile:hidden"></div>
        <div>
          <span className="detail-head mobile:text-lg">Max. Speed</span>
          <p className="value mobile:text-4xl">
            120 <span className="unit mobile:text-xl">kmph</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Details;
