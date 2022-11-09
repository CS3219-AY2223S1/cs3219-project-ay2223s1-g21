import { HiMinus, HiPlus } from "react-icons/hi";
import {
  FAQContainer,
  FAQH1,
  FAQWrapper,
  FAQSet,
  Question,
  Answer,
  OpenIcon,
  Image,
  BlockContainer
} from "./FAQElements";
import { useState } from "react";
import { Data } from "./Data.js";
import Icon1 from "../../assets/dancing-duck.gif";

const FAQ = () => {
  const [isOpen, setIsOpen] = useState(false);

  const makeOpen = (index) => {
    if (isOpen === index) {
      return setIsOpen(null);
    }
    return setIsOpen(index);
  };

  return (
    <FAQContainer id="faq">
      <FAQH1>Frequently Asked Questions </FAQH1>
      <BlockContainer>
        <Image src={Icon1} />
        <FAQWrapper>
          {Data.map((element, index) => {
            return (
              <FAQSet key={index}>
                <Question onClick={() => makeOpen(index)}>
                  {element.question}
                  <OpenIcon>
                    {isOpen === index ? (
                      <HiMinus className="plusminus" />
                    ) : (
                      <HiPlus className="plusminus" />
                    )}
                  </OpenIcon>
                </Question>
                <Answer
                  onClick={() => makeOpen(index)}
                  isOpen={isOpen}
                  index={index}
                >
                  {" "}
                  {element.answer}{" "}
                </Answer>
              </FAQSet>
            );
          })}
        </FAQWrapper>
      </BlockContainer>
    </FAQContainer>
  );
};

export default FAQ;
