import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LessonQuizSlider from "../../features/learn/shared/LessonQuizSlider";

const QUIZ = {
  type: "quiz",
  question: "What does print() do?",
  options: ["Reads input", "Deletes a file", "Opens a window", "Writes output"],
  answer: 3,
  explanation: "print() writes to standard output.",
};

/** Stands in for useLessonQuizAttempts: records answers and feeds them back. */
function Harness({ quizzes, onRecord, keepState = true }) {
  const [attempts, setAttempts] = useState({});
  return (
    <LessonQuizSlider
      quizzes={quizzes}
      getSelection={(quizIndex) => attempts[quizIndex] ?? null}
      onQuizAnswer={(quizIndex, selectedIndex, correct) => {
        onRecord(quizIndex, selectedIndex, correct);
        if (keepState) {
          setAttempts((prev) => ({ ...prev, [quizIndex]: selectedIndex }));
        }
      }}
    />
  );
}

const option = (text) => screen.getByRole("button", { name: new RegExp(text) });

describe("LessonQuizSlider", () => {
  it("records the first answer once and locks the options", () => {
    const onRecord = jest.fn();
    render(<Harness quizzes={[{ block: QUIZ, quizIndex: 0 }]} onRecord={onRecord} />);

    fireEvent.click(option("Reads input"));
    fireEvent.click(option("Writes output"));

    expect(onRecord).toHaveBeenCalledTimes(1);
    expect(onRecord).toHaveBeenCalledWith(0, 0, false);
    expect(option("Writes output")).toBeDisabled();
    expect(screen.getByText(/0 correct/)).toBeInTheDocument();
  });

  it("makes Solve again an unscored practice round", () => {
    const onRecord = jest.fn();
    render(<Harness quizzes={[{ block: QUIZ, quizIndex: 0 }]} onRecord={onRecord} />);

    fireEvent.click(option("Reads input"));
    fireEvent.click(screen.getByRole("button", { name: /Solve again/ }));
    expect(screen.getByText(/Practice round – not scored/)).toBeInTheDocument();

    fireEvent.click(option("Writes output"));

    expect(onRecord).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Practice – not scored/)).toBeInTheDocument();
    expect(screen.getByText("Nice!")).toBeInTheDocument();
    // The score still reflects the wrong first answer.
    expect(screen.getByText(/0 correct · 1 to review/)).toBeInTheDocument();
  });

  it("ignores a second click before the parent has recorded the first", () => {
    const onRecord = jest.fn();
    render(
      <Harness
        quizzes={[{ block: QUIZ, quizIndex: 0 }]}
        onRecord={onRecord}
        keepState={false}
      />,
    );

    fireEvent.click(option("Reads input"));
    fireEvent.click(option("Writes output"));

    expect(onRecord).toHaveBeenCalledTimes(1);
  });

  it("still scores the first answer on the next lesson's question", () => {
    const onRecord = jest.fn();
    const { rerender } = render(
      <Harness quizzes={[{ block: QUIZ, quizIndex: 0 }]} onRecord={onRecord} keepState={false} />,
    );
    fireEvent.click(option("Reads input"));

    const nextLesson = { ...QUIZ, question: "What does input() do?" };
    rerender(
      <Harness quizzes={[{ block: nextLesson, quizIndex: 0 }]} onRecord={onRecord} keepState={false} />,
    );
    fireEvent.click(option("Reads input"));

    expect(onRecord).toHaveBeenCalledTimes(2);
  });
});
