import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, FAB, Searchbar, Menu} from 'react-native-paper';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Plural, t} from '@lingui/macro';
import AccountList from '../components/AccountList';
import type {UserAccount} from '../types';

const Home = ({navigation}: {navigation: any}) => {
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [showSelectBar, setShowSelectBar] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');

  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([]);

  const [open, setOpen] = useState(false);

  const handleMenuClick = () => {
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  const handleSelect = () => {
    setShowSelectBar(true);
  };

  const handleSelectCancel = () => {
    setShowSelectBar(false);
  };

  const handleDelete = async () => {
    const userAccounts: UserAccount[] = JSON.parse(
      (await EncryptedStorage.getItem('accounts')) || '[]',
    );
    const deletion = userAccounts.filter(account =>
      selectedAccounts.includes(account.id),
    );
    await EncryptedStorage.setItem('accounts', JSON.stringify(deletion));

    setAccounts(userAccounts);

    setShowSelectBar(false);
  };

  useEffect(() => {
    async function getAccounts() {
      const userAccounts: UserAccount[] = JSON.parse(
        (await EncryptedStorage.getItem('accounts')) || '[]',
      );
      setAccounts(userAccounts);
    }

    getAccounts();
  });

  return (
    <>
      <Appbar.Header>
        {showSelectBar ? (
          <>
            <Appbar.Action
              onPress={handleSelectCancel}
              icon="close"
              color="#fff"
            />
            <Appbar.Content
              title={
                selectedAccounts.length ? (
                  <Plural
                    value={selectedAccounts.length}
                    one="# selected"
                    other="# selected"
                  />
                ) : (
                  t`Select accounts`
                )
              }
            />
          </>
        ) : null}
        {accounts.length && !showSelectBar ? (
          <Appbar.Content title="LibreOTP" />
        ) : null}
        {accounts.length ? (
          <Menu
            visible={open}
            onDismiss={handleMenuClose}
            anchor={
              <Appbar.Action
                icon="dots-vertical"
                onPress={handleMenuClick}
                color="#fff"
              />
            }
          >
            {!showSelectBar ? (
              <Menu.Item
                key="select"
                onPress={handleSelect}
                title={t`Select`}
              />
            ) : (
              <Menu.Item
                key="delete"
                onPress={handleDelete}
                title={t`Delete`}
              />
            )}
          </Menu>
        ) : null}
      </Appbar.Header>
      {accounts.length && !showSelectBar ? (
        <Searchbar
          placeholder={t`Search accounts`}
          onChangeText={value => {
            setFilter(value);
          }}
        />
      ) : null}
      <AccountList
        navigation={navigation}
        accounts={accounts}
        filter={filter}
        showSelectBar={showSelectBar}
        selectedAccounts={selectedAccounts}
        setSelectedAccounts={setSelectedAccounts}
      />
      <FAB
        style={styles.fab}
        icon="crop-free"
        onPress={() => navigation.navigate('Scan')}
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
