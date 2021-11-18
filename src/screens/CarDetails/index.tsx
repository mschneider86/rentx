import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Acessory } from '../../components/Acessory';
import { Button } from '../../components/Button';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

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
  Acessories,
  Footer,
} from './styles';

export function CarDetails() {
  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.navigate('Scheduling');
  }

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

        <Acessories>
          <Acessory name='388Km/h' icon={speedSvg} />
          <Acessory name='3.2s' icon={accelerationSvg} />
          <Acessory name='800 HP' icon={forceSvg} />
          <Acessory name='Gasolina' icon={gasolineSvg} />
          <Acessory name='Auto' icon={exchangeSvg} />
          <Acessory name='2 pessoas' icon={peopleSvg} />
        </Acessories>

        <About>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
          porro harum, quasi aspernatur hic eos eligendi expedita laudantium
          itaque provident soluta doloribus vero possimus numquam, aut dolor
          molestias ut inventore!
        </About>
      </Content>

      <Footer>
        <Button title='Confirmar' onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
