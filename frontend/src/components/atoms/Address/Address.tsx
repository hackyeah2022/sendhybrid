const isAddressNotEmpty = (reportDetails, prefix) =>
  Object.entries(reportDetails)
    .filter(([key, val]) => key.startsWith(prefix))
    .reduce((prev, [key, val]) => prev || Boolean(val), false);

const Address = ({ reportDetails, prefix }) => {
  if (!isAddressNotEmpty(reportDetails, prefix))
    return <address>Brak danych</address>;

  const getProperty = (keyWithoutPrefix: string) =>
    reportDetails[`${prefix}${keyWithoutPrefix}`];
  return (
    <address>
      {getProperty('Name')} {getProperty('Surname')} <br />
      {getProperty('Street')} {getProperty('HouseNumber')}{' '}
      {getProperty('FlatNumber') && `m. ${getProperty('FlatNumber')}`}
      <br />
      {getProperty('Zipcode')} {getProperty('City')}
    </address>
  );
};

export default Address;
