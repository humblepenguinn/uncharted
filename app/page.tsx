"use client";

import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Progress } from "@nextui-org/react";

import { useState, useEffect } from "react";

import PopOver from "./popOver";
import { getRandomRiddle, codes } from "./riddles";

const DEFAULT_RIDDLE_INDEX = 0;

export default function Home() {
  const [riddleIndex, setRiddleIndex] = useState(() => {
    return Number(localStorage.getItem("riddleIndex")) || DEFAULT_RIDDLE_INDEX;
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedRiddleIndex =
        Number(localStorage.getItem("riddleIndex")) || DEFAULT_RIDDLE_INDEX;
      setRiddleIndex(storedRiddleIndex);

    } else {
      console.error("localStorage is not supported in this environment.");
    }
  }, []);

  const [riddleText, setRiddleText] = useState("");

  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);

  const [isCorrect, setIsCorrect] = useState(false);

  // Input
  const [userInput, setUserInput] = useState("");
  const [isInvalidInput, setIsInvalidInput] = useState(false);

  // Popover
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  // Game State
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    localStorage.setItem("riddleIndex", riddleIndex.toString());
  }, [riddleIndex]);

  useEffect(() => {
    setRiddleIndex(Number(localStorage.getItem("riddleIndex")));

    const isPageRefreshed =
      window.performance && window.performance.navigation.type === 1;

    if (isPageRefreshed) {
      const object = getRandomRiddle(riddleIndex);
      setCurrentRiddleIndex(object.index);

      setRiddleText(object.riddle);
    }
  }, []);

  // Functions
  const handleUserInputSubmit = (e: any) => {
    e.preventDefault();
    setIsPopOverOpen(true);

    setUserInput("");
    
    if (userInput === codes[riddleIndex]) {
      setIsCorrect(true);
      setUserInput("");

      const newRiddleIndex = riddleIndex + 1;

      if (newRiddleIndex === 18) {
        setIsGameOver(true);
        return;
      }

      setRiddleIndex(newRiddleIndex);
      localStorage.setItem("riddleIndex", newRiddleIndex.toString());

      const object = getRandomRiddle(newRiddleIndex);

      setCurrentRiddleIndex(object.index);
      setRiddleText(object.riddle);

      console.log(`Setting Riddle Text ${object.riddle}`);
    } else {
      setIsCorrect(false);
      setUserInput("");

      setIsInvalidInput(true);
    }
  };

  return !isGameOver ? (
    <div className="flex flex-col items-center justify-start min-h-screen pt-8">
      <h1 className="text-4xl mb-24 font-bold">Uncharted Day 3</h1>
      {/* Card Component */}
      <div className="w-full max-w-md p-6 border-transparent rounded-md mb-12">
        <Card isBlurred shadow="lg">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">
              Location: {riddleIndex + 1}
            </p>
            <small className="text-default-500">
              Riddle Number: {currentRiddleIndex + 1}
            </small>
          </CardHeader>
          <CardBody className="text-lg">{riddleText}</CardBody>
        </Card>
      </div>

      {/* Input Component */}
      <form onSubmit={handleUserInputSubmit}>
        <Input
          type="input"
          label="Answer"
          variant="bordered"
          isInvalid={isInvalidInput}
          className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
      </form>

      <PopOver
        isOpen={isPopOverOpen}
        setIsPopOverOpen={setIsPopOverOpen}
        isCorrect={isCorrect}
        setIsInvalidInput={setIsInvalidInput}
      />

      {/* Progress Bar */}
      <div className="w-full flex items-center justify-center mt-auto p-4">
        <div className="w-full max-w-screen-md mb-4">
          <Progress
            className="w-full"
            size="md"
            value={riddleIndex}
            color="success"
            showValueLabel={true}
            maxValue={18}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-start min-h-screen pt-8">
      <h1 className="text-4xl mb-24 font-bold">You Won!</h1>
    </div>
  );
}
