import React from 'react';

import GasolineSvg from '../../assets/gasoline.svg';

import {
  Container,
  Details,
  Make,
  Model,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

interface CarData {
  make: string;
  model: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
}

interface CarProps {
  data: CarData;
}

export function Car({ data }: CarProps) {
  return (
    <Container>
      <Details>
        <Make>{data.make}</Make>
        <Model>{data.model}</Model>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: data.thumbnail }} resizeMode='contain' />
    </Container>
  );
}
