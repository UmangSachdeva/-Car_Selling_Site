import React from "react";
import { Avatar, AvatarGroup } from "@mui/material";

function ProductBanner() {
  return (
    <div>
      <div className="flex items-center gap-4 p-12 m-auto rounded shadow-lg w-fit mobile:flex-col">
        <div>
          <AvatarGroup
            max={3}
            sx={{
              ".MuiAvatarGroup-avatar": {
                width: 70,
                height: 70,
              },
            }}
            spacing="small"
          >
            <Avatar sx={{ bgcolor: "#212529", width: 50, height: 50 }}>
              <ion-icon name="person-outline"></ion-icon>
            </Avatar>
            <Avatar sx={{ bgcolor: "#212529", width: 50, height: 50 }}>
              <ion-icon name="person-outline"></ion-icon>
            </Avatar>
            <Avatar sx={{ bgcolor: "#212529", width: 50, height: 50 }}>
              <ion-icon name="person-outline"></ion-icon>
            </Avatar>
            <Avatar sx={{ bgcolor: "#212529", width: 50, height: 50 }}>
              <ion-icon name="person-outline"></ion-icon>
            </Avatar>
            <Avatar sx={{ bgcolor: "#212529", width: 50, height: 50 }}>
              <ion-icon name="person-outline"></ion-icon>
            </Avatar>
            <Avatar sx={{ bgcolor: "#212529", width: 50, height: 50 }}>
              <ion-icon name="person-outline"></ion-icon>
            </Avatar>
            <Avatar sx={{ bgcolor: "#212529", width: 50, height: 50 }}>
              <ion-icon name="person-outline"></ion-icon>
            </Avatar>
          </AvatarGroup>
        </div>
        <div className="text-left">
          <p className="capitalize text-[45px] italic font-semibold">
            Book your dream car now
          </p>
          <span className="w-full text-2xl italic font-thin">
            Trusted by over 25000+ customers.
          </span>
          <br />
          <button className="my-3 p-2 text-white capitalize px-4 rounded bg-zinc-800 hover:bg-zinc-700 duration-500 hover:shadow-md hover:shadow-gray-700 hover:translate-y-[-2px]">
            Book this car
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductBanner;
