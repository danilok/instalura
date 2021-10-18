/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import LoggedPageWrapper from '..';
import LoggedGlobalProvider from '../provider';

export default function LoggedPageHOC(
  PageComponent,
  { pageWrapperProps } = { pageWrapperProps: {} },
) {
  return (props) => (
    <LoggedGlobalProvider>
      <LoggedPageWrapper
        {...pageWrapperProps}
        {...props.pageWrapperProps}
        profileProps={props}
      >
        <PageComponent {...props} />
      </LoggedPageWrapper>
    </LoggedGlobalProvider>
  );
}
