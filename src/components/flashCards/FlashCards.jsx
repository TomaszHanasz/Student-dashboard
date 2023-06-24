import { flashcards } from "../../flashcards";
import React, { useState, useRef } from "react";
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
import Button from "@mui/material/Button";
import "./flashCards.style.css";

// category checkbox style
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

// flash cards functions
const FlashCards = () => {
  const [category, setCategory] = useState([]);
  const [randomIndex, setRandomIndex] = useState(0);
  const [countCards, setCountCards] = useState(0);
  const [score, setScore] = useState(0);
  const [numberOfCards, setNumberOfCards] = useState("");
  const [startFlashCards, setStartFlashCards] = useState(false);

  // go to initial slide
  const swiperRef = useRef(null);

  const handleSlideTo = (slide) => {
    swiperRef.current.swiper.slideTo(slide);
  };

  // click I know the answer
  const onClickIknow = () => {
    setScore(score + 1);
    setCountCards(countCards + 1);
    onClickNextCard();
    handleSlideTo(0);
  };

  // click I didnt know the answer
  const onClickIdontknow = () => {
    setCountCards(countCards + 1);
    onClickNextCard();
    handleSlideTo(0);
  };

  // draw next card
  const onClickNextCard = () => {
    // filter by categories
    const categoryFilter = flashcards.filter((el) => {
      return category
        .map((el) => el.toLowerCase())
        .includes(el.category.toLowerCase());
    });

    if (categoryFilter.length === 0) {
      console.log("No flashcards found for the selected categories.");
      return;
    }

    // random index of next card
    const randomIndex = Math.floor(Math.random() * categoryFilter.length);
    const randomCardIndex = categoryFilter[randomIndex].id - 1;
    setCountCards(countCards + 1);
    setRandomIndex(randomCardIndex);
  };

  // category selection
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  // number of cards selection
  const SelectNumberOfCards = () => {
    const handleChangeNrCards = (event) => {
      setNumberOfCards(event.target.value);
    };

    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 350 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Number of cards
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={numberOfCards}
            onChange={handleChangeNrCards}
            label="Number of cards"
          >
            <MenuItem value={10}>Ten (10)</MenuItem>
            <MenuItem value={20}>Twenty (20)</MenuItem>
            <MenuItem value={30}>Thirty (30)</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  };

  // set the cards to start
  const onClickStart = () => {
    setStartFlashCards(true);
  };

  // play again
  const onClickRestart = () => {
    setStartFlashCards(false);
    setCategory([]);
    setCountCards(0);
    setScore(0);
    setNumberOfCards("");
  };

  // start screen
  const start = () => {
    return (
      <div className="flash-cards__start">
        <p>Select category and number of cards</p>
        <Button color="success" variant="contained" onClick={onClickStart}>
          Start
        </Button>
      </div>
    );
  };

  // end screen
  const end = () => {
    return (
      <div className="flash-cards__end">
        <h4>Congratulations!</h4>
        <p>
          Your score is {score} out of {countCards}
        </p>
        <p>{((score / countCards) * 100).toFixed(2)}% correct answers!</p>
        <Button variant="contained" color="success" onClick={onClickRestart}>
          Again
        </Button>
      </div>
    );
  };

  // flash cards app
  return (
    <>
      <div className="flash-cards__app">
        <h2>Flash Cards</h2>
        <div className="flash-cards__categories__checkbox">
          <FormControl sx={{ m: 1, width: 350 }}>
            <InputLabel id="flash-cards__categories__checkbox">
              Category
            </InputLabel>
            <Select
              labelId="flash-cards__categories__checkbox"
              id="categories-multiple-checkbox"
              multiple
              value={category}
              onChange={handleChangeCategory}
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
          <SelectNumberOfCards />
        </div>
        {countCards >= numberOfCards && countCards > 0 ? (
          end()
        ) : category.length > 0 && numberOfCards > 0 && startFlashCards ? (
          <Swiper
            effect={"flip"}
            grabCursor={true}
            navigation={true}
            modules={[EffectFlip, Navigation]}
            className="mySwiper"
            initialSlide={0}
            ref={swiperRef}
            roundLengths={true}
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
            <div className="flesh-cards__btns">
              <Button
                variant="contained"
                className="flash-cards__inotknow-btn"
                color="error"
                onClick={onClickIdontknow}
              >
                I don't know it
              </Button>
              <Button
                variant="contained"
                className="flash-cards__iknow-btn"
                color="success"
                onClick={onClickIknow}
              >
                I know it
              </Button>
            </div>
            <div className="flash-cards__score">
              <p className="flash-cards__correctAnsw" id="correctAnsw">
                Correct answers {score} out of {countCards}
              </p>
              <p className="flash-cards__correctAnsw" id="correctAnsw">
                Your score is{" "}
                {countCards ? ((score / countCards) * 100).toFixed(2) : 0}%
              </p>
            </div>
          </Swiper>
        ) : (
          start()
        )}
      </div>
    </>
  );
};

export default FlashCards;
