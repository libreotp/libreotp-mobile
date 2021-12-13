import React, {useState} from 'react';
import {List, Checkbox} from 'react-native-paper';

import TokenGet from '../../TokenGet';

type Props = {
  account: UserAccount;
  showSelectBar: boolean;
  selectedAccounts: number[];
  setSelectedAccounts: (value: React.SetStateAction<number[]>) => void;
};

const AccountListItem = ({
  account,
  showSelectBar,
  selectedAccounts,
  setSelectedAccounts,
}: Props) => {
  const [trigger, setTrigger] = useState<boolean>(false);

  const setChecked = (value: number) => {
    const newSelectedAccounts = selectedAccounts.includes(value)
      ? selectedAccounts.filter(accountId => accountId !== value)
      : [...selectedAccounts, value];
    setSelectedAccounts(newSelectedAccounts);
  };

  return (
    <>
      <List.Item
        title={
          trigger ? (
            <TokenGet account={account} setTrigger={setTrigger} />
          ) : (
            account.label.issuer || account.query.issuer
          )
        }
        description={!trigger && account.label.account}
        onPress={(): void => {
          setTrigger(true);
        }}
        left={props => <List.Icon {...props} icon="timelapse" />}
        right={() =>
          showSelectBar ? (
            <Checkbox.Android
              onPress={() => setChecked(account.id)}
              status={
                selectedAccounts.includes(account.id) ? 'checked' : 'unchecked'
              }
            />
          ) : null
        }
      />
    </>
  );
};

export default AccountListItem;
