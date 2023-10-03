import Head from 'next/head';
import Panel from '@/components/Panel';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://opendata.ecdc.europa.eu/covid19/casedistribution/json/')
      .then((res) => res.json())
      .then((data) => {
        const addDate = data.records.map((item, index) => ({
          ...item,
          id: index,
          date: new Date(`${item.year}-${item.month}-${item.day}`).getTime(),
        }));

        setData(addDate);
      });
  }, []);
  return (
    <>
      <Head>
        <title>Test task</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Panel data={data} />
      </Box>
    </>
  );
}
