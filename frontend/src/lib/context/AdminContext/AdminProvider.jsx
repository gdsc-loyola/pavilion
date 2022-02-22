import { useAuth0 } from '@auth0/auth0-react';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import http from '$lib/http';

export const AdminContext = createContext({});

export const AdminProvider = ({ children }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [org, setOrg] = useState({});
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');

  const username = user?.sub.replace('|', '.');

  useEffect(() => {
    const run = async () => {
      const res = await http.get('/users/', {
        params: {
          user: username,
        },
      });

      setUserData(res.data);
    };
    run();
  }, [username]);

  useEffect(() => {
    const run = async () => {
      if (!accessToken) {
        const tok = await getAccessTokenSilently().catch(() => '');
        if (tok === '') {
          setIsLoading(false);
        }
        setAccessToken(tok);
      }

      if (!accessToken) return;
      try {
        const res = await http.get(`/orgs/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setOrg(res.data);
      } catch (error) {
        setOrg({});
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [accessToken, getAccessTokenSilently]);

  const hasOrg = !!org.name;

  const memoValue = useMemo(
    () => ({
      user,
      org,
      accessToken,
      isLoading,
      hasOrg,
      userData,
      setOrg,
    }),
    [accessToken, hasOrg, isLoading, org, user, userData]
  );

  return <AdminContext.Provider value={memoValue}>{children}</AdminContext.Provider>;
};
