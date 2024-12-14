import { useEffect, useState } from 'react';
import { QrCode } from 'react-qrcode-pretty';

export default function QrCodeCustom() {
  const [url, setUrl] = useState('');

  useEffect(() => {
   
      const homeUrl = window.location.origin; 
      setUrl(homeUrl);

  }, []);

  return (
    <QrCode
      value={url}
      variant={{
        eyes: 'gravity',
        body: 'fluid',
      }}
      color={{
        eyes: '#223344',
        body: '#335577',
      }}
      padding={20}
      margin={20}
      bgColor='#ddeeff'
      bgRounded
      divider
    />
  );
}
