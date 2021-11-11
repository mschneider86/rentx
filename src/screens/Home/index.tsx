import React from 'react';
import { StatusBar } from 'react-native';

import { Container, Header } from './styles';

import Logo from '../../assets/logo.svg';

export function Home() {
  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <Logo />
      </Header>
    </Container>
  );
}
