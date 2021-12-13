import React from 'react';
import {Snackbar} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import EncryptedStorage from 'react-native-encrypted-storage';
import keyUriParser from '../utils/keyUriParser';
import {Trans} from '@lingui/macro';
import type {UserAccount} from '../types';

const Scan = ({navigation}: {navigation: any}) => {
  const handleSave = async (event: any): Promise<void> => {
    const result = keyUriParser(event.data);

    if (result) {
      const accounts: UserAccount[] = JSON.parse(
        (await EncryptedStorage.getItem('accounts')) || '[]',
      );

      const account: UserAccount = {
        id: accounts.length + 1,
        text: event.data,
        ...result,
      };

      accounts.push(account);

      await EncryptedStorage.setItem('accounts', JSON.stringify(accounts));
    }

    return navigation.navigate('Home');
  };

  return (
    <QRCodeScanner
      onRead={handleSave}
      bottomContent={
        <Snackbar visible={true} onDismiss={() => {}}>
          <Trans>Scanning QR code...</Trans>
        </Snackbar>
      }
    />
  );
};

export default Scan;
