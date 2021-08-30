import Image from "next/image";
import { formatNumberToBrlCurrency } from "utils";

import * as S from "./styles";

export type CardProps = {
  type: "total" | "rf" | "rv";
  value: number;
};

function CardBalance({ type = "total", value = 1000 }: CardProps) {
  const card = {
    total: { name: "Total", src: "/icons/dolar.svg", width: 16, height: 16 },
    rf: {
      name: "Renda Fixa",
      src: "/icons/renda-fixa.svg",
      width: 32,
      height: 16,
    },
    rv: {
      name: "Renda Variável",
      src: "/icons/renda-variavel.svg",
      width: 48,
      height: 16,
    },
  };
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Title>{card[type].name}</S.Title>
        <Image
          src={card[type].src}
          width={card[type].width}
          height={card[type].height}
        />
      </S.TitleWrapper>
      <S.Title className="card__value_size">
        {type === "total" ? formatNumberToBrlCurrency(value) : `${value}%`}
      </S.Title>
    </S.Wrapper>
  );
}

export default CardBalance;
