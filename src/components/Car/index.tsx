import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

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

interface CarProps extends RectButtonProps {
  data: CarData;
}

export function Car({ data, ...rest }: CarProps) {
  return (
    <Container {...rest}>
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
