import React, { useState, useEffect } from 'react';
import { Alert, StatusBar, FlatList } from 'react-native';
import { CarDTO } from '../../dtos/carDTO';
import { BackButton } from '../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Car } from '../../components/Car';

import { api } from '../../services/api';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsAmount,
} from './styles';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  function handleBackButton() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');

        setCars(response.data);
      } catch (error) {
        console.log(error);
        Alert.alert('Erro', 'Erro ao carregar os carros alugados');
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);
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

        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsAmount>3</AppointmentsAmount>
        </Appointments>

        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Car data={item.car} />}
        />
      </Content>
    </Container>
  );
}
