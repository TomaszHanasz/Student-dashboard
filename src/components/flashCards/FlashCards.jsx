import { flashcards } from "../../flashcards";
import React, { useRef, useState, useEffect } from "react";
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
  const [countCards, setCountCards] = useState(0);
  const [score, setScore] = useState(0);

  const onClickIknow = () => {
    setScore(score + 1);
    setCountCards(countCards + 1);
    onClickNextCard();

    console.log(score);
  };

  const onClickIdontknow = () => {
    setCountCards(countCards + 1);
    onClickNextCard();
  };

  // useEffect(() => {
  //   const updateScore = () => {
  //     if (checked === true) {
  //       setScore(score + 1);
  //     } else if (checked === false) {
  //       // setScore((score + 0) / countCards);
  //     }
  //     console.log("Score: ", score);
  //   };
  //   setChecked(false);
  //   return updateScore();
  // }, [countCards]);

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
    setCountCards(countCards + 1);
    setRandomIndex(randomCardIndex);
    console.log(countCards);
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
        <div className="flesh-cards">
          <button
            className="flash-cards__inotknow-btn"
            onClick={onClickIdontknow}
          >
            I don't know it
          </button>
          <button className="flash-cards__iknow-btn" onClick={onClickIknow}>
            I know it
          </button>
        </div>
        <div>
          <p className="flash-cards__correctAnsw" id="correctAnsw">
            correct answers {score} out of {countCards}
          </p>
          <p className="flash-cards__correctAnsw" id="correctAnsw">
            your score is{" "}
            {countCards ? ((score / countCards) * 100).toFixed(2) : 0}%
          </p>
        </div>
      </Swiper>
    </>
  );
};

export default FlashCards;
