import React from "react";
import { Avatar, Rating } from "@mui/material";
import { useSelector } from "react-redux/es/hooks/useSelector";

const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 50,
      height: 50,
    },
    children: `${name.charAt(0).toUpperCase()}`,
  };
};

function Feedback() {
  const user = useSelector((state) => state.auth.user);
  const userDummy = ["jeetha lal", "champak lal", "tappu"];
  return (
    <section style={{ padding: "60px 0" }}>
      <div className="section-head">
        <span className="section-sub">CUSTOMER FEEDBACKS</span>

        <p className="section-main">Ratings.</p>
      </div>

      <div className="w-full py-5 border-b-2 border-black feedback-input mobile:flex-col mobile:gap-4">
        <div className="w-full gap-4 input-box">
          {user?.f_name ? (
            <Avatar {...stringAvatar(user.f_name + " " + user.l_name)} />
          ) : (
            <Avatar sx={{ bgcolor: "#212529", width: 50, height: 50 }}>
              <ion-icon name="person-outline"></ion-icon>
            </Avatar>
          )}
          <input
            className="w-full p-2 text-lg border-2 border-gray-700 rounded"
            type="text"
            placeholder="Write a review..."
            name=""
            id=""
          />
        </div>
        <div className="justify-center w-full gap-2">
          <Rating
            name="size-large"
            defaultValue={2}
            size="large"
            style={{ fontSize: "40px" }}
          />
        </div>

        <button className="w-[30%] bg-zinc-800 rounded text-white hover:bg-zinc-700 duration-500 hover:drop-shadow-2xl mobile:w-full p-4">
          Give Feedback
        </button>
      </div>

      {userDummy?.map((usr, index) => (
        <div className="py-4 text-left w-fit" key={index}>
          <div>
            <div className="flex gap-3 align-middle">
              <Avatar {...stringAvatar(usr)} sx={{ width: 45, height: 45 }} />
              <div>
                <span className="text-lg capitalize">{usr}</span>
                <div className="flex gap-2">
                  <span>
                    <Rating
                      name="size-large"
                      defaultValue={5}
                      size="small"
                      readOnly
                    />
                  </span>
                  <span className="text-sm italic">24 Jun 2022</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-light-yellow ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum,
            qui? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Blanditiis pariatur officiis excepturi, eos labore soluta amet
            perferendis ipsam quidem maxime voluptas a reiciendis consequuntur
            ab quasi dignissimos, consectetur culpa veritatis beatae dicta
            cupiditate. Quam obcaecati ducimus odio nobis expedita, doloribus
            omnis ut unde quae harum adipisci aliquam deleniti exercitationem
            magnam corporis odit consequuntur modi at vel. Magni labore fuga
            aperiam architecto molestias porro nemo consequatur soluta dolore?
            Soluta odit, aperiam laudantium deserunt facere, similique
            recusandae quasi dicta repellendus nihil dolorum.
          </div>
        </div>
      ))}
    </section>
  );
}

export default Feedback;
