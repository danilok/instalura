import React from 'react';
import UserEvent from '@testing-library/user-event';
import FormLogin from './index';
import {
  render,
  screen,
  act,
  waitFor,
} from '../../../infra/test/testUtils';

const onSubmit = jest.fn();
onSubmit.mockImplementation((event) => {
  event.preventDefault();
});
// eslint-disable-next-line global-require
jest.mock('next/router', () => require('next-router-mock'));

describe('<FormLogin />', () => {
  describe('when form fields are valid', () => {
    test('complete the submission', async () => {
      const user = UserEvent.setup();
      await act(async () => render(
        <FormLogin
          onSubmit={onSubmit}
        />,
      ));

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();

      const inputUsuario = screen.getByPlaceholderText('Usuário');
      await user.type(inputUsuario, 'someusername');
      await waitFor(() => expect(inputUsuario).toHaveValue('someusername'));

      const inputSenha = screen.getByPlaceholderText('Senha');
      await user.type(inputSenha, 'somepassword');
      await waitFor(() => expect(inputSenha).toHaveValue('somepassword'));

      expect(button).not.toBeDisabled();

      await user.click(button);

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('when form fields are invalid', () => {
    test('displays the respective errors', async () => {
      await act(async () => render(
        <FormLogin
          onSubmit={onSubmit}
        />,
      ));

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();

      const inputUsuario = screen.getByPlaceholderText('Usuário');
      inputUsuario.focus();
      act(() => {
        inputUsuario.blur();
      });
      await waitFor(() => screen.getByRole('alert'));

      expect(screen.getByRole('alert'))
        .toHaveTextContent('Preencha ao menos 3 caracteres');
    });
  });
});
