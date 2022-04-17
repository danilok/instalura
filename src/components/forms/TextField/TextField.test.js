import React from 'react';
import UserEvent from '@testing-library/user-event';
import { render, screen } from '../../../infra/test/testUtils';
import TextField from './index';

describe('<TextField />', () => {
  test('renders component', () => {
    render(
      <TextField
        placeholder="Nome"
        value="Danilo"
        onChange={() => {}}
        name="nome"
      />,
    );

    // screen.debug();
    const textField = screen.getByPlaceholderText(/nome/i);
    expect(textField).toMatchSnapshot();
  });

  describe('when field is valid', () => {
    describe('and user is typing', () => {
      test('the value must be updated', async () => {
        const user = UserEvent.setup();
        const onChangeMock = jest.fn();
        render(
          <TextField
            placeholder="Nome"
            value=""
            onChange={onChangeMock}
            name="nome"
            isTouched
          />,
        );
        const inputNome = screen.getByPlaceholderText(/nome/i);
        await user.type(inputNome, 'Danilo');
        expect(onChangeMock).toBeCalledTimes(6);
      });
    });
  });

  describe('when field is invalid', () => {
    // elemento tenha o span de texto
    // muda o CSS da borda
    test('displays the respective error message', () => {
      render(
        <TextField
          placeholder="Email"
          value="daniloemail.teste.com"
          onChange={() => {}}
          name="email"
          isTouched
          error="O campo email é obrigatório"
        />,
      );
      // screen.debug();
      const inputEmail = screen.getByPlaceholderText(/email/i);
      expect(inputEmail).toHaveValue('daniloemail.teste.com');
      expect(screen.getByRole('alert')).toHaveTextContent('O campo email é obrigatório');
      expect(inputEmail).toMatchSnapshot();
    });
  });
});
