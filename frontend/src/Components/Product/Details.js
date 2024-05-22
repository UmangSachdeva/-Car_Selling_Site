import React from "react";
import DetailsCard from "./DetailsCard";

function Details({ data }) {
  return (
    <section>
      <div className="section-head">
        <span className="section-sub">know you car</span>

        <p className="section-main">details.</p>
      </div>

      <div className="gap-1 section-body mobile:flex-wrap">
        <DetailsCard description={data?.engine?.description} cardFor="engine" />
        <DetailsCard description={data?.tyre?.description} cardFor="tyre" />
        <DetailsCard
          description={data?.gearbox?.description}
          cardFor="gearbox"
        />
        <DetailsCard description={data?.clutch?.description} cardFor="clutch" />
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
