import { FC, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';

import axios from 'utils/axios';
import PageContainer from 'components/atoms/PageContainer/PageContainer';
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import { showNotification } from '@mantine/notifications';

type AdminSettings = {
  maxSenderSize: number;
  maxSender2Size: number;
  maxSenderStreetSize: number;
  maxSenderZipcodeSize: number;
  maxSenderCitySize: number;
  maxSenderHouseSize: number;
  maxSenderFlatSize: number;
  maxReceiverSize: number;
  maxReceiver2Size: number;
  maxReceiverStreetSize: number;
  maxReceiverZipcodeSize: number;
  maxReceiverCitySize: number;
  maxReceiverHouseSize: number;
  maxReceiverFlatSize: number;
};

type SettingArray = Array<{ name: string; value: number }>;

const settingDisplayNames = {
  maxSenderSize: 'Imię / Nazwa firmy',
  maxSender2Size: 'Nazwisko / Nazwa firmy cd.',
  maxSenderStreetSize: 'Ulica',
  maxSenderZipcodeSize: 'Kod pocztowy',
  maxSenderCitySize: 'Miasto',
  maxSenderHouseSize: 'Dom',
  maxSenderFlatSize: 'Mieszkanie',
  maxReceiverSize: 'Imię / Nazwa firmy',
  maxReceiver2Size: 'Nazwisko / Nazwa firmy cd.',
  maxReceiverStreetSize: 'Ulica',
  maxReceiverZipcodeSize: 'Kod pocztowy',
  maxReceiverCitySize: 'Miasto',
  maxReceiverHouseSize: 'Dom',
  maxReceiverFlatSize: 'Mieszkanie',
};

export interface Props {
  settings: AdminSettings;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const settings: AdminSettings = (await axios
    .get('/settings')
    .then(r => r.data)) as AdminSettings;
  return {
    props: {
      settings,
    },
  };
};

export const SuperPageContainer = styled(PageContainer)`
  align-items: center;
  margin: 2rem 0;
`;

export const MainHeading = styled(Heading)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.neutral[2]};
  margin-bottom: 3rem;
  font-weight: 600;
`;

export const SectionHeading = styled(Heading)`
  font-size: 1.75rem;
  padding-bottom: 0.5rem;
  margin-bottom: 0.25rem;
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary[1]};

  &:last-of-type {
    margin-top: 3rem;
  }
`;

export const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.15rem 0;

  &:last-of-type {
    margin-bottom: 2rem;
  }
`;

export const ValueBox = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors.neutral[1]}6F;
`;

const AdminSettingsPage: FC<Props> = ({ settings, ...props }) => {
  const [settingArray, setSettingArray] = useState<SettingArray>([]);

  useEffect(() => {
    let arr: SettingArray = [];
    for (const settKey in settings) {
      arr.push({
        name: settKey,
        value: settings[settKey as keyof AdminSettings],
      });
    }
    arr.shift();
    setSettingArray(arr);
  }, [settings]);

  return (
    <SuperPageContainer {...props}>
      <div style={{ width: '524px' }}>
        <MainHeading>Panel ustawień</MainHeading>
        <SectionHeading>Sekcja adresata</SectionHeading>
        {settingArray.slice(0, 7).map((sett, i) => (
          <SettingRow key={i}>
            {settingDisplayNames[sett.name as keyof AdminSettings]} :{' '}
            <ValueBox>{sett.value}</ValueBox>
          </SettingRow>
        ))}
        <SectionHeading>Sekcja odbiorcy</SectionHeading>
        {settingArray.slice(7).map((sett, i) => (
          <SettingRow key={i}>
            {settingDisplayNames[sett.name as keyof AdminSettings]} :{' '}
            <ValueBox>{sett.value}</ValueBox>
          </SettingRow>
        ))}
        <Button
          solid
          onClick={() =>
            showNotification({
              color: 'green',
              title: 'Sukces!',
              message: 'Zmieniono globalne ustawienia.',
            })
          }
        >
          Zmień
        </Button>
      </div>
    </SuperPageContainer>
  );
};

export default AdminSettingsPage;
