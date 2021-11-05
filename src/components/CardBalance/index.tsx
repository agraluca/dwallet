import { useState } from "react";
import Image from "next/image";
import { formatNumberToBrlCurrency, formatNumberToPercent } from "utils";

import * as S from "./styles";

export type CardProps = {
  type: "total" | "rf" | "rv";
  value: number | string;
  total?: number | string;
  hide?: boolean;
};

function CardBalance({ type, value, total = 0, hide = false }: CardProps) {
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
          <S.DesactivatedButton>
            <Image
              src="/icons/dollar-sign.svg"
              width={iconsWidth}
              height={iconsHeight}
            />
          </S.DesactivatedButton>
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
      <S.Title className={`card__value_size ${hide && "is_hidding"}`}>
        {type === "total"
          ? formatNumberToBrlCurrency(value)
          : isPercentageValue
          ? formatNumberToPercent(value || 0)
          : formatNumberToBrlCurrency(total)}
      </S.Title>
    </S.Wrapper>
  );
}

export default CardBalance;
