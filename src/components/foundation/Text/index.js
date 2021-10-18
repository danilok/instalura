/* eslint-disable indent */
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Link from '../../commons/Link';
import propToStyle from '../../../theme/utils/propToStyle';
import breakpointsMedia from '../../../theme/utils/breakpointsMedia';
import WebsitePageContext from '../../wrappers/WebsitePage/context';

export const TextStyleVariantsMap = {
  title: css`
    ${({ theme }) => css`
      font-size: ${theme.typographyVariants.titleXS.fontSize};
      font-weight: ${theme.typographyVariants.titleXS.fontWeight};
      line-height: ${theme.typographyVariants.titleXS.lineHeight};
    `}
    ${breakpointsMedia({
      md: css`
        ${({ theme }) => css`
          font-size: ${theme.typographyVariants.title.fontSize};
          font-weight: ${theme.typographyVariants.title.fontWeight};
          line-height: ${theme.typographyVariants.title.lineHeight};
        `}
      `,
    })}
  `,
  subTitle: css`
    ${({ theme }) => css`
      font-size: ${theme.typographyVariants.subTitleXS.fontSize};
      font-weight: ${theme.typographyVariants.subTitleXS.fontWeight};
      line-height: ${theme.typographyVariants.subTitleXS.lineHeight};
    `}
    ${breakpointsMedia({
      md: css`
        ${({ theme }) => css`
          font-size: ${theme.typographyVariants.subTitle.fontSize};
          font-weight: ${theme.typographyVariants.subTitle.fontWeight};
          line-height: ${theme.typographyVariants.subTitle.lineHeight};
        `}
      `,
    })}
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
  `,
  profileTitle: css`
    ${({ theme }) => css`
      font-size: ${theme.typographyVariants.profileTitleXS.fontSize};
      font-weight: ${theme.typographyVariants.profileTitleXS.fontWeight};
      line-height: ${theme.typographyVariants.profileTitleXS.lineHeight};
    `}
    ${breakpointsMedia({
    md: css`
        ${({ theme }) => css`
          font-size: ${theme.typographyVariants.profileTitle.fontSize};
          font-weight: ${theme.typographyVariants.profileTitle.fontWeight};
          line-height: ${theme.typographyVariants.profileTitle.lineHeight};
        `}
      `,
  })}
  `,
  profileInfo: css`
    ${({ theme }) => css`
      font-size: ${theme.typographyVariants.profileInfoXS.fontSize};
      font-weight: ${theme.typographyVariants.profileInfoXS.fontWeight};
      line-height: ${theme.typographyVariants.profileInfoXS.lineHeight};
    `}
    ${breakpointsMedia({
    md: css`
        ${({ theme }) => css`
          font-size: ${theme.typographyVariants.profileInfo.fontSize};
          font-weight: ${theme.typographyVariants.profileInfo.fontWeight};
          line-height: ${theme.typographyVariants.profileInfo.lineHeight};
        `}
      `,
  })}
  `,
  profileBio: css`
    ${({ theme }) => css`
      font-size: ${theme.typographyVariants.profileBioXS.fontSize};
      font-weight: ${theme.typographyVariants.profileBioXS.fontWeight};
      line-height: ${theme.typographyVariants.profileBioXS.lineHeight};
    `}
    ${breakpointsMedia({
    md: css`
        ${({ theme }) => css`
          font-size: ${theme.typographyVariants.profileBio.fontSize};
          font-weight: ${theme.typographyVariants.profileBio.fontWeight};
          line-height: ${theme.typographyVariants.profileBio.lineHeight};
        `}
      `,
  })}
  `,
};

const TextBase = styled.span`
  ${({ variant }) => TextStyleVariantsMap[variant]}
  color: ${(props) => get(props.theme, `colors.${props.color}.color`)};
  ${propToStyle('textAlign')}
  ${propToStyle('marginBottom')}
  ${propToStyle('margin')}
`;

export default function Text({
  tag,
  variant,
  children,
  href,
  cmsKey,
  ...props
}) {
  const websitePageContext = React.useContext(WebsitePageContext);

  const componentContent = cmsKey
    ? websitePageContext.getCMSContent(cmsKey)
    : children;

  return href
    ? (
      <TextBase
        as={Link}
        variant={variant}
        href={href}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {componentContent}
      </TextBase>
    )
    : (
      <TextBase
        as={tag}
        variant={variant}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {componentContent}
      </TextBase>
    );
}

Text.propTypes = {
  tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'li', 'a', 'span', 'input']),
  variant: PropTypes.oneOf([
    'paragraph1',
    'paragraph2',
    'title',
    'titleXS',
    'smallestException',
    'subTitle',
    'profileBio',
    'profileInfo',
    'profileTitle',
  ]),
  children: PropTypes.node,
  href: PropTypes.string,
  cmsKey: PropTypes.string,
};

Text.defaultProps = {
  tag: 'span',
  variant: 'paragraph1',
  children: null,
  href: '',
  cmsKey: undefined,
};

// p1
// h1, h2, h3...
// span
