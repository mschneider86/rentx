import React, { useState, useEffect } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Acessory } from '../../components/Acessory';
import { Button } from '../../components/Button';

import { Feather } from '@expo/vector-icons';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

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
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { CarDTO } from '../../dtos/carDTO';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';
import { Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [updatedCar, setUpdatedCar] = useState<CarDTO>({} as CarDTO);
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const netInfo = useNetInfo();

  const theme = useTheme();

  const navigation = useNavigation();

  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.price);

  async function handleConfirmRental() {
    try {
      setLoading(true);

      await api.post('/rentals', {
        user_id: 1,
        car_id: car.id,
        start_ate: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      });

      navigation.navigate('Confirmation', {
        nextScreenRoute: 'Home',
        title: 'Carro alugado!',
        message: `Agora você só precisa ir \n até a concessionária da RENTX \n
        pegar o seu automóvel.`,
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível realizar o agendamento.');
      setLoading(false);
    }
  }

  function handleBackButton() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      ),
    });
  }, []);

  useEffect(() => {
    async function fetchUpdatedCars() {
      const response = await api.get(`/cars/${car.id}`);
      setUpdatedCar(response.data);
    }
    if (netInfo.isConnected === true) {
      fetchUpdatedCars();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBackButton} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={
            !!updatedCar.photos
              ? updatedCar.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Make>{car.brand}</Make>
            <Model>{car.name}</Model>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        {updatedCar.accessories && (
          <Accessories>
            {updatedCar.accessories.map((accessory) => (
              <Acessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x${dates.length} ${
              dates.length > 1 ? 'diárias' : 'diária'
            }`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title='Alugar agora'
          onPress={handleConfirmRental}
          color={theme.colors.success}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
