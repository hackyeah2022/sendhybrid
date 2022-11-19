import { FC } from 'react';
import { useForm } from 'react-hook-form';

import * as S from './LoginForm.styles';

export interface Props {}

type FormData = {
  username: string;
  password: string;
};

const LoginForm: FC<Props> = ({ ...props }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const onSubmit = handleSubmit(data => console.log(data));
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
