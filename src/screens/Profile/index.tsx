import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { PasswordInput } from '../../components/PasswordInput';
import * as Yup from 'yup';

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
  Section,
} from './styles';
import { useNetInfo } from '@react-native-community/netinfo';

export function Profile() {
  const { user, signOut, updateUser } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const theme = useTheme();
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleOptionChange(selectedOption: 'dataEdit' | 'passwordEdit') {
    if (netInfo.isConnected === false && selectedOption === 'passwordEdit') {
      Alert.alert(
        'Você está offline',
        'Para mudar a senha, conecte-se à Internet'
      );
    } else {
      setOption(selectedOption);
    }
  }

  async function handleAvatarSelection() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleSignOut() {
    Alert.alert(
      'Tem certeza?',
      'Se você sair, precisará de internet para entrar novamente.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
        },
        {
          text: 'Sair',
          onPress: () => signOut(),
        },
      ]
    );
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória'),
        name: Yup.string().required('Nome é obrigatório'),
      });

      const data = { name, driverLicense };
      await schema.validate(data);

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token,
      });

      Alert.alert('Perfil atualizado com sucesso!');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Oops', error.message);
      } else {
        Alert.alert('Não foi possível atualizar o perfil');
      }
    }
  }
  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleGoBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name='power' size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} />}
              <PhotoButton onPress={handleAvatarSelection}>
                <Feather name='camera' size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
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
            {option === 'dataEdit' ? (
              <Section>
                <Input
                  iconName='power'
                  placeholder='Nome'
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName='mail'
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName='credit-card'
                  placeholder='CNH'
                  keyboardType='numeric'
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput iconName='lock' placeholder='Senha Atual' />
                <PasswordInput iconName='lock' placeholder='Nova Senha' />
                <PasswordInput iconName='lock' placeholder='Confirmar Senha' />
              </Section>
            )}

            <Button title='Salvar Alterações' onPress={handleProfileUpdate} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
