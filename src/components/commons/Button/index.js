import styled, { css } from 'styled-components'
import get from 'lodash/get'

const ButtonGhost = css`
  // arrow function
  color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
  background: transparent;
`;

const ButtonDefault = css`
  // arrow function + destructuring
  background-color: ${({ theme, variant }) => get(theme, `colors.${variant}.color`)};
  // exemplo com keyword function
  color: ${function (props) {
    return get(props.theme, `colors.${props.variant}.contrastText`)
  }};
`;

export const Button = styled.button`
  border: 0;
  cursor: pointer;
  padding: 12px 26px;
  font-weight: bold;
  opacity: 1;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: ${({ theme }) => theme.transition};
  ${(props) => {
    if (props.ghost) {
      return ButtonGhost;
    }
    return ButtonDefault;
  }}
  &:hover,
  &:focus {
    opacity: .5;
  }
`;