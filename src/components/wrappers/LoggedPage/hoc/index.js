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
  function loggedPageHoc(props) {
    return (
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
  return loggedPageHoc;
}
