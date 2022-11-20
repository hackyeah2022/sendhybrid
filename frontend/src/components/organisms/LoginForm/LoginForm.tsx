import { FC } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { showNotification } from '@mantine/notifications';

import routes from 'utils/routes';
import { useGlobalState } from 'utils/store';

import * as S from './LoginForm.styles';

export interface Props {}

type FormData = {
  username: string;
  password: string;
};

const LoginForm: FC<Props> = ({ ...props }) => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const [, setUserRole] = useGlobalState('userRole');
  const onSubmit = handleSubmit(({ username, password }) => {
    if (username === 'user' && password === 'user1234') {
      setUserRole('privileged');
      router.push(routes.SUBMISSIONS);
    }
    if (username === 'admin' && password === 'admin1234') {
      setUserRole('admin');
      router.push(routes.SUBMISSIONS);
    } else if (!!username && !!password) {
      showNotification({
        title: 'Błąd!',
        message: 'Podano nieprawidłowe dane logowania.',
        color: 'red',
      });
    }
  });
  return (
    <S.Wrapper onSubmit={onSubmit} {...props}>
      <S.InputWrapper>
        <S.Label>Nazwa użytkownika</S.Label>
        <S.Input
          {...register('username', { required: true })}
          aria-invalid={errors.username ? 'true' : 'false'}
        />
        {errors.username?.type === 'required' && (
          <S.InputErrorText>Nazwa użytkownika jest wymagana</S.InputErrorText>
        )}
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>Hasło</S.Label>
        <S.Input
          type="password"
          {...register('password', { required: true })}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password?.type === 'required' && (
          <S.InputErrorText>Hasło jest wymagane</S.InputErrorText>
        )}
      </S.InputWrapper>
      <S.SubmitButton>Zaloguj się</S.SubmitButton>
    </S.Wrapper>
  );
};

export default LoginForm;
