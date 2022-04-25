import { useAuth0 } from '@auth0/auth0-react';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import http from '$lib/http';

export const AdminContext = createContext({});

export const AdminProvider = ({ children }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [org, setOrg] = useState({});
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');

  const username = user?.sub.replace('|', '.');

  const fetchOrg = useCallback(async () => {
    const res = await http
      .get(`/orgs/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch(() => ({}));

    setOrg(res.data);
  }, [accessToken]);

  const fetchUser = useCallback(async () => {
    const res = await http.get('/users/', {
      params: {
        user: username,
      },
    });

    setUserData(res.data);
  }, [username]);

  const fetchAccessToken = useCallback(async () => {
    const token = await getAccessTokenSilently().catch((err) => {
      console.error(err);
      return '';
    });

    setAccessToken(token);
    return token;
  }, [getAccessTokenSilently]);

  useEffect(() => {
    const run = async () => {
      await fetchUser();
    };
    run();
  }, [fetchUser]);

  useEffect(() => {
    const run = async () => {
      if (!accessToken) {
        const tok = await fetchAccessToken();
        if (tok === '') {
          setIsLoading(false);
        }
      }

      if (!accessToken) return;
      await fetchOrg();
      setIsLoading(false);
    };
    run();
  }, [accessToken, fetchAccessToken, fetchOrg, getAccessTokenSilently]);

  const hasOrg = !!org?.name;

  const memoValue = useMemo(
    () => ({
      user,
      org,
      accessToken,
      isLoading,
      hasOrg,
      userData,
      setOrg,
      refetchOrg: fetchOrg,
      refetchUser: fetchUser,
      refetchAll: async () => {
        await fetchAccessToken();
        await fetchOrg();
        await fetchUser();
      },
    }),
    [accessToken, fetchAccessToken, fetchOrg, fetchUser, hasOrg, isLoading, org, user, userData]
  );

  return <AdminContext.Provider value={memoValue}>{children}</AdminContext.Provider>;
};
