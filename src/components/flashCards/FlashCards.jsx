import { flashcards } from "../../flashcards";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Navigation } from "swiper";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "./flashCards.style.css";

// checkbox

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// checkbox categories
const categories = ["React", "JS", "Html", "Css", "General"];

const onSubmitCategoriesHandler = (e) => {
  e.preventDefault();
};

const FlashCards = () => {
  const [category, setCategory] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <div className="flash-cards__categories__checkbox">
        <FormControl sx={{ m: 1, width: 400 }}>
          <InputLabel id="flash-cards__categories__checkbox">
            Category
          </InputLabel>
          <Select
            labelId="flash-cards__categories__checkbox"
            id="categories-multiple-checkbox"
            multiple
            value={category}
            onChange={handleChange}
            input={<OutlinedInput label="Category" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            onSubmit={onSubmitCategoriesHandler}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={category.indexOf(category) > -1} />
                <ListItemText primary={category} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Swiper
        effect={"flip"}
        grabCursor={true}
        navigation={true}
        modules={[EffectFlip, Navigation]}
        className="mySwiper"
      >
        {flashcards.map((el, index) => {
          return (
            <div key={index}>
              <SwiperSlide>
                <p className="flash-cards__question">{el.question}</p>
              </SwiperSlide>
              <SwiperSlide>
                <p className="flash-cards__answer">{el.answer}</p>
              </SwiperSlide>
            </div>
          );
        })}
        <button className="flash-cards__next-btn">Next card</button>
      </Swiper>
    </>
  );
};

export default FlashCards;
