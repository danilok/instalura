import React from 'react';
import userService from './userService';

const useUserService = {
  getProfilePage() {
    const [response, setResponse] = React.useState({
      data: null,
      loading: true,
      error: null,
    });

    React.useEffect(() => {
      const user = userService(null);
      user.getProfilePage()
        .then((responseFromServer) => {
          setResponse((currentState) => ({
            ...currentState,
            data: responseFromServer,
            loading: false,
            error: null,
          }));
        })
        .catch((err) => {
          setResponse((currentState) => ({
            ...currentState,
            data: null,
            loading: false,
            error: err.message,
          }));
        });
    }, []);

    return response;
  },
};

export default useUserService;
