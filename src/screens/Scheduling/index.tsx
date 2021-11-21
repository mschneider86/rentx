import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import {
  Calendar,
  DayProps,
  MarkedDateProps,
  generateInterval,
} from '../../components/Calendar';

import { useTheme } from 'styled-components';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';
import { StatusBar } from 'react-native';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { format } from 'date-fns';
import { CarDTO } from '../../dtos/carDTO';

interface RentalPeriod {
  formattedStart: string;
  formattedEnd: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const navigation = useNavigation();
  const theme = useTheme();

  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleBackButton() {
    navigation.goBack();
  }

  function handleDateChange(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const startDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      formattedStart: format(
        getPlatformDate(new Date(startDate)),
        'dd/MM/yyyy'
      ),
      formattedEnd: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle='light-content'
          translucent
          backgroundColor='transparent'
        />
        <BackButton onPress={handleBackButton} color={theme.colors.shape} />

        <Title>
          Escolha uma {'\n'}data de início e{'\n'}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.formattedStart}>
              {rentalPeriod.formattedStart}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.formattedEnd}>
              {rentalPeriod.formattedEnd}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleDateChange} />
      </Content>
      <Footer>
        <Button
          title='Confirmar'
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.formattedStart}
        />
      </Footer>
    </Container>
  );
}
