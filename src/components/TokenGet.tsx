import React, {useState, useEffect} from 'react';
import {Buffer} from 'buffer';
global.Buffer = Buffer;
import {Authenticator} from '@otplib/core';
import {keyDecoder, keyEncoder} from '@otplib/plugin-base32-enc-dec';
import {createDigest, createRandomBytes} from '@otplib/plugin-crypto-js';
import type {UserAccount} from '../types';

const authenticator = new Authenticator({
  createDigest,
  createRandomBytes,
  keyDecoder,
  keyEncoder,
});

type Props = {
  account: UserAccount;
  setTrigger: (value: React.SetStateAction<boolean>) => void;
};

const TokenGet = ({account, setTrigger}: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(
    authenticator.timeRemaining(),
  );

  useEffect(() => {
    if (account.query.secret) {
      setToken(authenticator.generate(account.query.secret));
    }
  }, [account]);

  useEffect(() => {
    if (timeLeft === 30) {
      setToken(null);
      setTrigger(false);
    }
  }, [account, timeLeft, setTrigger]);

  useEffect(() => {
    const timing = setInterval(() => {
      setTimeLeft(authenticator.timeRemaining());
    }, 1000);

    return () => {
      clearInterval(timing);
    };
  }, []);

  return <>{token}</>;
};

export default TokenGet;
