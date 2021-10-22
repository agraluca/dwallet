import { useState } from "react";
import Image from "next/image";
import { formatNumberToBrlCurrency, formatNumberToPercent } from "utils";

import * as S from "./styles";

export type CardProps = {
  type: "total" | "rf" | "rv";
  value: number | string;
  total?: number | string;
};

function CardBalance({ type = "total", value = 1000, total = 0 }: CardProps) {
  const [isPercentageValue, setIsPercentageValue] = useState(true);

  function handleTogglePercentageValue() {
    setIsPercentageValue((state) => !state);
  }

  const iconsWidth = 25;
  const iconsHeight = 20;

  const card = {
    rf: "Renda Fixa",
    total: "Total",
    rv: "Renda Variável",
  };

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Title>{card[type]}</S.Title>
        {type === "total" ? (
          <Image
            src="/icons/dollar-sign.svg"
            width={iconsWidth}
            height={iconsHeight}
          />
        ) : (
          <S.ToggleButton
            onClick={handleTogglePercentageValue}
            title={isPercentageValue ? "Percentual" : "Valor Total"}
          >
            <Image
              src={
                isPercentageValue
                  ? "/icons/percent.svg"
                  : "/icons/dollar-sign.svg"
              }
              width={iconsWidth}
              height={iconsHeight}
            />
          </S.ToggleButton>
        )}
      </S.TitleWrapper>
      <S.Title className="card__value_size">
        {type === "total"
          ? formatNumberToBrlCurrency(value)
          : isPercentageValue
          ? formatNumberToPercent(value)
          : formatNumberToBrlCurrency(total)}
      </S.Title>
    </S.Wrapper>
  );
}

export default CardBalance;
