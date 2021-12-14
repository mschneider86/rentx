import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
} from './styles';

export function Profile() {
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  const theme = useTheme();
  const navigation = useNavigation();

  function handleSignOut() {
    navigation.goBack();
  }

  function handleLogout() {}

  function handleOptionChange(selectedOption: 'dataEdit' | 'passwordEdit') {
    setOption(selectedOption);
  }

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} onPress={handleSignOut} />
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton onPress={handleLogout}>
            <Feather name='power' size={24} color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>

        <PhotoContainer>
          <Photo source={{ uri: 'https://github.com/mschneider86.png' }} />
          <PhotoButton onPress={() => {}}>
            <Feather name='camera' size={24} color={theme.colors.shape} />
          </PhotoButton>
        </PhotoContainer>
      </Header>

      <Content>
        <Options>
          <Option
            active={option === 'dataEdit'}
            onPress={() => handleOptionChange('dataEdit')}
          >
            <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
          </Option>

          <Option
            active={option === 'passwordEdit'}
            onPress={() => handleOptionChange('passwordEdit')}
          >
            <OptionTitle active={option === 'passwordEdit'}>
              Trocar Senha
            </OptionTitle>
          </Option>
        </Options>
      </Content>
    </Container>
  );
}
