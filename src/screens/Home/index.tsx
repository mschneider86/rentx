import React from 'react';
import { StatusBar } from 'react-native';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';
import { Car } from '../../components/Car';

import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';

export function Home() {
  const carData = {
    make: 'Audi',
    model: 'RS S Coupé',
    rent: {
      period: 'Ao Dia',
      price: 120,
    },
    thumbnail:
      'https://www.webmotors.com.br/imagens/prod/347501/AUDI_TT_RS_2.5_TFSI_GASOLINA_QUATTRO_STRONIC_34750116195765418.png?s=fill&w=275&h=183&q=70&t=true',
  };

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => <Car data={carData} />}
      />
    </Container>
  );
}
