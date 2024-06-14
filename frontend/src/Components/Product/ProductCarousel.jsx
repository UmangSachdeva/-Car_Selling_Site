import React, { useEffect, useRef, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Modal from "../common/ModalCommon";
import { Button, useRadioGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { connetBuyers, resetChat } from "../../Features/chat/chatSlice";
import toast from "react-hot-toast";

function ProductCarousel({ images, data }) {
  const params = useParams();
  const nav = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [offer, setOffer] = useState(data?.price || 0);
  const [inputValue, setInputValue] = useState("");
  const mirrorRef = useRef(null);
  const chat = useSelector((state) => state?.chatRed);
  const dispatch = useDispatch();
  const [toastId, setToastId] = useState();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePriceInc = () => {
    setOffer((prev) => prev + 10);
  };

  const handlePriceDec = () => {
    setOffer((prev) => (prev - 10 > 0 ? prev - 10 : 0));
  };

  const handleConnectChat = () => {
    const offerStr = (data?.price_type || "$") + offer + data?.price_per;

    dispatch(connetBuyers(params.id, { offer: offerStr }));
  };

  useEffect(() => {
    if (chat?.loading) {
      let id = toast.loading("Connecting to seller...");

      setToastId(id);
    }

    if (chat?.error) {
      toast.error(chat?.error, {
        id: toastId,
      });
    }

    if (chat?.success) {
      toast.success("Successfully connected!", {
        id: toastId,
      });
      dispatch(resetChat());
      handleModalClose();
      nav("/messages");
    }
  }, [chat]);

  useEffect(() => {
    if (data?.price) {
      setOffer(data?.price);
    }
  }, [data]);

  return (
    <div
      id="carouselExampleCaptions"
      class="carousel slide vertical"
      data-bs-ride="false"
    >
      <Modal
        className="rounded-lg"
        InnerClass="border-none rounded-lg"
        open={open}
        onClose={handleModalClose}
      >
        <div className="flex flex-col gap-7">
          <div>
            <p className="text-3xl font-semibold">Bargin</p>
            <p className="text-light-black">Let us know your offer</p>
          </div>
          <div className="flex justify-between">
            <Button
              variant="contained"
              className="text-3xl font-semibold"
              onClick={handlePriceDec}
            >
              -
            </Button>
            <div className="flex items-baseline justify-center w-full border-gray-300">
              <span className="text-4xl font-bold">
                {data?.price_type || "$"}
              </span>

              <div
                className={`p-1 text-4xl font-bold bg-transparent border border-none outline-none editable-div max-w-[100px]`}
              >
                {offer}
              </div>

              <span className="text-light-black">/{data?.price_per}</span>
            </div>
            <Button
              variant="contained"
              className="text-3xl font-semibold"
              onClick={handlePriceInc}
            >
              +
            </Button>
          </div>

          <div>
            <Button
              variant="contained"
              className="w-full"
              onClick={handleConnectChat}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
      <div class="carousel-indicators">
        {images?.map((item, index) => (
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={`${index}`}
            class={`${index === 0 ? "active" : ""}`}
            aria-current="true"
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="button-list">
        <button>Rent now</button>
        <button onClick={handleModalOpen}>Bargin</button>
      </div>
      <div class="carousel-caption d-none d-md-block z-10">
        <h5>
          {data?.name} | {data?.model}
        </h5>
        <p>
          Rent Now at ${data?.price}/{data?.price_per}
        </p>
      </div>
      <div class="carousel-inner">
        {images?.map((image, index) => (
          <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <div className="absolute top-0 left-0 right-0 h-full m-auto text-white transition-opacity opacity-100 z-4 bg-gradient-black"></div>
            <img src={image} class="d-block w-100" alt="..." />
          </div>
        ))}
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default ProductCarousel;
