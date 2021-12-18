import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Car as CarModel } from '../../database/model/car';

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
import { useNetInfo } from '@react-native-community/netinfo';

interface CarProps extends RectButtonProps {
  data: CarModel;
}

export function Car({ data, ...rest }: CarProps) {
  const netInfo = useNetInfo();
  const EngineIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Make>{data.brand}</Make>
        <Model>{data.name}</Model>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${
              netInfo.isConnected === true ? data.price : '...'
            }`}</Price>
          </Rent>

          <Type>
            <EngineIcon />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: data.thumbnail }} resizeMode='contain' />
    </Container>
  );
}
