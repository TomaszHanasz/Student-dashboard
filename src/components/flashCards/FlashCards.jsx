import { flashcards } from "../../flashcards";
import React, { useEffect, useState } from "react";
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
const categories = ["React", "Js", "Html", "Css", "General"];

const FlashCards = () => {
  const [category, setCategory] = useState([]);
  const [randomIndex, setRandomIndex] = useState(0);

  const onClickNextCard = () => {
    const categoryFilter = flashcards.filter((el) => {
      return category.includes(el.category);
    });

    if (categoryFilter.length === 0) {
      console.log("No flashcards found for the selected categories.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * categoryFilter.length);
    const randomCardIndex = categoryFilter[randomIndex].id - 1;
    setRandomIndex(randomCardIndex);
    console.log(category);
    console.log(categoryFilter);
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
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
          >
            {categories.map((el) => (
              <MenuItem key={el} value={el}>
                <Checkbox checked={category.includes(el)} />
                <ListItemText primary={el} />
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
        <div key={randomIndex}>
          <SwiperSlide>
            <p className="flash-cards__question">
              {flashcards[randomIndex].question}
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <p className="flash-cards__answer">
              {flashcards[randomIndex].answer}
            </p>
          </SwiperSlide>
        </div>
        <button className="flash-cards__next-btn" onClick={onClickNextCard}>
          Next card
        </button>
      </Swiper>
    </>
  );
};

export default FlashCards;
