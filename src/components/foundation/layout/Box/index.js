import styled from 'styled-components';
import propToStyle from '../../../../theme/utils/propToStyle';

const Box = styled.div`
  ${propToStyle('display')}
  ${propToStyle('flex')}
  ${propToStyle('flexWrap')}
  ${propToStyle('flexDirection')}
  ${propToStyle('justifyContent')}
  ${propToStyle('alignItems')}
  ${propToStyle('backgroundColor')}
  ${propToStyle('backgroundImage')}
  ${propToStyle('backgroundPosition')}
  ${propToStyle('backgroundRepeat')}
  ${propToStyle('boxShadow')}
  ${propToStyle('padding')}
  ${propToStyle('width')}
  ${propToStyle('listStyle')}
  ${propToStyle('margin')}
  ${propToStyle('marginLeft')}
  ${propToStyle('marginTop')}
  ${propToStyle('marginRight')}
  ${propToStyle('marginBottom')}
  ${propToStyle('paddingLeft')}
  ${propToStyle('paddingTop')}
  ${propToStyle('paddingRight')}
  ${propToStyle('paddingBottom')}
  ${propToStyle('overflow')}
  ${({ theme, borderRadiusTheme }) => borderRadiusTheme && `border-radius: ${theme.borderRadius}`};
`;

export default Box;
