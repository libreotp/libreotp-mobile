import React from 'react';
import {View} from 'react-native';
import {Headline, Button} from 'react-native-paper';
import {Trans} from '@lingui/macro';
import AccountListItem from './Item';
import type {UserAccount} from '../../types';

type Props = {
  navigation: any;
  accounts: UserAccount[];
  showSelectBar: boolean;
  filter: string;
  selectedAccounts: number[];
  setSelectedAccounts: (value: React.SetStateAction<number[]>) => void;
};

const AccountList = ({
  navigation,
  accounts,
  filter,
  showSelectBar,
  selectedAccounts,
  setSelectedAccounts,
}: Props) => {
  const filteredAccounts = accounts.filter(account => {
    return (
      account.label.account.toLowerCase().includes(filter.toLowerCase()) ||
      account.label.issuer?.toLowerCase().includes(filter.toLowerCase()) ||
      account.query.issuer?.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <View>
      {!!filteredAccounts.length && (
        <>
          {filteredAccounts.map((account: UserAccount) => (
            <AccountListItem
              key={account.id}
              account={account}
              showSelectBar={showSelectBar}
              selectedAccounts={selectedAccounts}
              setSelectedAccounts={setSelectedAccounts}
            />
          ))}
        </>
      )}
      {!!accounts.length && !filteredAccounts.length && (
        <Headline>
          <Trans>No account found</Trans>
        </Headline>
      )}
      {!accounts.length && (
        <View>
          <Headline>
            <Trans>You don't have any accounts yet</Trans>
          </Headline>
          <Button onPress={() => navigation.navigate('Scan')}>
            <Trans>Scan a QR code</Trans>
          </Button>
        </View>
      )}
    </View>
  );
};

export default AccountList;
