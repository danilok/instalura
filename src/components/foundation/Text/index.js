import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { propToStyle } from '../../../theme/utils/propToStyle';

export const TextStyleVariantsMap = {
  title: css`
    font-size: ${({ theme }) => theme.typographyVariants.title.fontSize};
    font-weight: ${({ theme }) => theme.typographyVariants.title.fontWeight};
    line-height: ${({ theme }) => theme.typographyVariants.title.lineHeight};
  `,  
  titleXS: css`
    font-size: ${({ theme }) => theme.typographyVariants.titleXS.fontSize};
    font-weight: ${({ theme }) => theme.typographyVariants.titleXS.fontWeight};
    line-height: ${({ theme }) => theme.typographyVariants.titleXS.lineHeight};
  `,  
  subTitle: css`
    font-size: ${({ theme }) => theme.typographyVariants.subTitle.fontSize};
    font-weight: ${({ theme }) => theme.typographyVariants.subTitle.fontWeight};
    line-height: ${({ theme }) => theme.typographyVariants.subTitle.lineHeight};
  `,  
  paragraph1: css`
    font-size: ${({ theme }) => theme.typographyVariants.paragraph1.fontSize};
    font-weight: ${({ theme }) => theme.typographyVariants.paragraph1.fontWeight};
    line-height: ${({ theme }) => theme.typographyVariants.paragraph1.lineHeight};
  `,
  paragraph2: css`
    font-size: ${({ theme }) => theme.typographyVariants.paragraph2.fontSize};
    font-weight: ${({ theme }) => theme.typographyVariants.paragraph2.fontWeight};
    line-height: ${({ theme }) => theme.typographyVariants.paragraph2.lineHeight};
  `,
  smallestException: css`
    font-size: ${({ theme }) => theme.typographyVariants.smallestException.fontSize};
    font-weight: ${({ theme }) => theme.typographyVariants.smallestException.fontWeight};
    line-height: ${({ theme }) => theme.typographyVariants.smallestException.lineHeight};
  `
}

const TextBase = styled.span`
  ${({ variant }) => TextStyleVariantsMap[variant] }
  ${propToStyle('textAlign')}
`;

export default function Text({ tag, variant, children, ...props }) {
  return (
    <TextBase
      as={tag}
      variant={variant}
      {...props}
    >
      {children}
    </TextBase>
  )
}

Text.propTypes = {
  tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'li', 'a', 'span']),
  variant: PropTypes.oneOf([
    'paragraph1',
    'paragraph2',
    'title',
    'titleXS',
    'smallestException',
    'subTitle',
  ]),
  children: PropTypes.node.isRequired,
}

Text.defaultProps = {
  tag: 'span',
  variant: 'paragraph1'
}

// p1
// h1, h2, h3...
// span