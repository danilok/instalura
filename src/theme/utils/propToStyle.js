import breakpointsMedia from './breakpointsMedia';
// import { css } from 'styled-components'

export function propToStyle(propName) {
	return function(props) {
    const propValue = props[propName];

    if (typeof propValue === 'string') {
      return {
        [propName]: propValue,
      }
    }

    if (typeof propValue === 'object') {
      return breakpointsMedia({
        xs: {
          [propName]: propValue.xs,
        },
        sm: {
          [propName]: propValue.sm,
        },
        md: {
          [propName]: propValue.md,
        },
        lg: {
          [propName]: propValue.lg,
        },
        xl: {
          [propName]: propValue.xl,
        },
      })
    }
	}
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