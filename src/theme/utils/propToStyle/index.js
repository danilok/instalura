import breakpointsMedia from '../breakpointsMedia';
// import { css } from 'styled-components'

export default function propToStyle(propName) {
  return (props) => {
    const propValue = props[propName];

    if (typeof propValue === 'string' || typeof propValue === 'number') {
      return {
        [propName]: propValue,
      };
    }

    if (typeof propValue === 'object') {
      const breakpoints = {};

      if (propValue.xs) breakpoints.xs = { [propName]: propValue.xs };
      if (propValue.sm) breakpoints.sm = { [propName]: propValue.sm };
      if (propValue.md) breakpoints.md = { [propName]: propValue.md };
      if (propValue.lg) breakpoints.lg = { [propName]: propValue.lg };
      if (propValue.xl) breakpoints.xl = { [propName]: propValue.xl };

      return breakpointsMedia(breakpoints);
    }

    return '';
  };
  // Codigo do repositorio da aula 08
  // return (props) => {
  //   const propValue = props[propName];

  //   if (typeof propValue === 'object') {
  //     return css`
  //       ${breakpointsMedia({
  //         ...(propValue.xs && {
  //           xs: { [propName]: propValue.xs },
  //         }),
  //         ...(propValue.sm && {
  //           sm: { [propName]: propValue.sm },
  //         }),
  //         ...(propValue.md && {
  //           md: { [propName]: propValue.md },
  //         }),
  //         ...(propValue.lg && {
  //           lg: { [propName]: propValue.lg },
  //         }),
  //         ...(propValue.xl && {
  //           xl: { [propName]: propValue.xl },
  //         }),
  //       })}
  //     `;
  //   }

  //   return {
  //     [propName]: props[propName],
  //   };
  // };
}
