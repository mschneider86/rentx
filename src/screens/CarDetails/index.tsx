import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { Container, Header, CarImages } from './styles';

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={[
            'https://www.webmotors.com.br/imagens/prod/347501/AUDI_TT_RS_2.5_TFSI_GASOLINA_QUATTRO_STRONIC_34750116195765418.png?s=fill&w=275&h=183&q=70&t=true',
          ]}
        />
      </CarImages>
    </Container>
  );
}
