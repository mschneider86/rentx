import React, { useState } from 'react';

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

export function SignUpFirstStep() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState(0);

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleNextStep() {
    navigation.navigate('SignUpSecondStep');
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleGoBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil</Subtitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName='user'
              placeholder='Nome'
              value={name}
              onChangeText={setName}
            />
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
            />
            <Input
              iconName='credit-card'
              placeholder='CNH'
              keyboardType='numeric'
              value={driverLicense}
              onChangeText={(value) => setDriverLicense(Number)}
            />
          </Form>

          <Button title='Próximo' onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
