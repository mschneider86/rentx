import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Make,
  Model,
  Rent,
  Period,
  Price,
  About,
} from './styles';

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

      <Content>
        <Details>
          <Description>
            <Make>Audi</Make>
            <Model>A4</Model>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 350</Price>
          </Rent>
        </Details>

        <About>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
          porro harum, quasi aspernatur hic eos eligendi expedita laudantium
          itaque provident soluta doloribus vero possimus numquam, aut dolor
          molestias ut inventore!
        </About>
      </Content>
    </Container>
  );
}
