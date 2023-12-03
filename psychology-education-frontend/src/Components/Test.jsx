import {
    Button,
    Card,
    CardBody,
    Dialog,
    DialogBody, Radio
} from "@material-tailwind/react";
import React, { useState } from "react";

const Test = () => {
  const questions = [
    {
      question:
        "Вставьте соответствующий термин на место пропуска: Психологическую структуру […] образуют: биологические особенности, индивидуальные особенности психических процессов, индивидуальный социальный опыт, направленность.",
      value: "q1",
      options: [
        { label: "характера", isTrue: false },
        { label: "личности", isTrue: true },
        { label: "мышления", isTrue: false },
        { label: "памяти", isTrue: false },
        { label: "восприятия", isTrue: false },
      ],
    },
    {
      question:
        "Свойства человека, обусловленные биологическими факторами, — это …",
      value: "q2",
      options: [
        { label: "задатки", isTrue: true },
        { label: "нравственность", isTrue: false },
        { label: "лидерство", isTrue: false },
        { label: "все ответы верны", isTrue: false },
        { label: "все ответы неверны", isTrue: false },
      ],
    },
    {
      question: "Личностные свойства, обусловленные социально, — это…",
      value: "q3",
      options: [
        { label: "рефлексы", isTrue: false },
        { label: "музыкальный слух", isTrue: false },
        { label: "инстинкты", isTrue: false },
        { label: "острота зрения", isTrue: false },
        { label: "памяти", isTrue: false },
        { label: "ценностные отношения", isTrue: true },
      ],
    },
    {
      question:
        "Кто из перечисленных ниже литературных персонажей по типу темперамента может быть отнесен к интровертам:",
      value: "q4",
      options: [
        { label: "Дон Кихот", isTrue: false },
        { label: "Обломов", isTrue: true },
        { label: "Печорин", isTrue: true },
        { label: "д’ Артаньян", isTrue: false },
        { label: "Родион Раскольников", isTrue: true },
      ],
    },
    {
      question: "Способности определяются как…",
      value: "q5",
      options: [
        { label: "все ответы неверны", isTrue: false },
        {
          label:
            "индивидуально-психологические особенности человека, обеспечивающие успех в деятельности",
          isTrue: true,
        },
        {
          label: "особенности, несводимые к знаниям, умениям, навыкам",
          isTrue: true,
        },
        { label: "все ответы верны", isTrue: false },
        { label: "функциональные органы человека", isTrue: false },
      ],
    },
    {
      question: "Понятие – это важнейший элемент…",
      value: "q6",
      options: [
        { label: "мышления", isTrue: true },
        { label: "памяти", isTrue: false },
        { label: "восприятия", isTrue: false },
        { label: "речи", isTrue: false },
        { label: "все ответы неверны", isTrue: false },
      ],
    },
    {
      question:
        "Сосредоточенность деятельности субъекта в данный момент времени на каком-либо реальном или идеальном объекте – предмете, событии, образе, рассуждении и пр. обеспечивает …",
      value: "q7",
      options: [
        { label: "восприятие", isTrue: false },
        { label: "внимание", isTrue: true },
        { label: "все ответы неверны", isTrue: false },
        { label: "узнавание", isTrue: false },
        { label: "рефлексия", isTrue: false },
      ],
    },
    {
      question:
        "Какое свойство восприятия описывает С.Л. Рубинштейн: Если бы не такое свойство восприятия, не было бы вообще восприятия предметов, а было бы одно непрерывное мерцание непрерывно сдвигающихся, увеличивающихся, уменьшающихся и растягивающихся пятен и бликов неописуемой пестроты. Ориентировка в мире и практическое воздействие на него на основе такого восприятия были бы невозможны…",
      value: "q8",
      options: [
        { label: "структурность", isTrue: false },
        { label: "избирательность", isTrue: false },
        { label: "константность", isTrue: false },
        { label: "целостность", isTrue: true },
        { label: "осмысленность", isTrue: false },
      ],
    },
    {
      question: "Воображение выражается в …",
      value: "q9",
      options: [
        {
          label:
            "отражении реальной действительности в новых, неожиданных сочетаниях и связях",
          isTrue: true,
        },
        { label: "все ответы верны", isTrue: false },
        { label: "классификации представлений", isTrue: false },
        {
          label:
            "воспроизведении представлений о ранее воспринятых предметах и явлениях",
          isTrue: false,
        },
        { label: "организации системы понятий", isTrue: false },
      ],
    },
  ];

  const [answers, setAnswers] = useState({
    q1: {},
    q2: {},
    q3: {},
    q4: {},
    q5: {},
    q6: {},
    q7: {},
    q8: {},
    q9: {},
  });

  const handleChange = (question, option) => {
    setAnswers((answers) => ({ ...answers, [question]: option }));
  };

  const [score, setScore] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const check = () => {
    let score = 0;
    if (answers.q1?.isTrue) {
      score++;
    }
    if (answers.q2?.isTrue) {
      score++;
    }
    if (answers.q3?.isTrue) {
      score++;
    }
    if (answers.q4?.isTrue) {
      score++;
    }
    if (answers.q5?.isTrue) {
      score++;
    }
    if (answers.q6?.isTrue) {
      score++;
    }
    if (answers.q7?.isTrue) {
      score++;
    }
    if (answers.q8?.isTrue) {
      score++;
    }
    if (answers.q9?.isTrue) {
      score++;
    }
    setScore(score);
    setOpen(true);
  };

  return (
    <div className="p-5">
      <div className="text-xl uppercase text-center">Тест</div>
      {questions.map((question, index) => (
        <div key={index} className="py-3">
          <Card>
            <CardBody className="text-black">
              <div className="py-2 font-medium">Вопрос {index + 1}</div>
              <div className="text-lg">{question.question}</div>
              <div className="flex flex-col gap-1">
                {question.options.map((option, ind) => (
                  <Radio
                    label={option.label}
                    key={ind}
                    value={option.label}
                    checked={answers[question.value].label === option.label}
                    onChange={() => handleChange(question.value, option)}
                    crossOrigin={undefined}
                  />
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      ))}
      <div>
        <Button
          variant="filled"
          size="sm"
          className="mt-6 rounded-none"
          onClick={() => check()}
        >
          Узнать результат
        </Button>
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="sm"
      >
        <DialogBody className="text-xl">Ваш результат: {score}/9</DialogBody>
      </Dialog>
    </div>
  );
};

export default Test;
