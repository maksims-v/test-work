import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import dynamic from 'next/dynamic';
const ResponsiveLine = dynamic(() => import('@nivo/line').then((m) => m.ResponsiveLine), {
  ssr: false,
});

const Chart = ({ chartData, sortedData, countryHandleChange, filterCountry }) => {
  const getAllCountry = sortedData.map((item) => item.countriesAndTerritories);

  const getTotalDeath = chartData?.reduce((acc, { deaths, date }) => {
    let arr = acc.find((oldDate) => oldDate.x === date);

    if (arr) {
      arr.y = arr.y + deaths;
    } else {
      acc.push({ y: deaths, x: date });
    }

    return acc;
  }, []);

  const getTotalCases = chartData?.reduce((acc, { date, cases }) => {
    let arr = acc.find((oldDate) => oldDate.x === date);

    if (arr) {
      arr.y = arr.y + cases / 10;
    } else {
      acc.push({ y: cases, x: date });
    }

    return acc;
  }, []);

  const sortedByDate = getTotalDeath?.sort((a, b) => (a.x < b.x ? 1 : -1));
  const sortedByDate2 = getTotalCases?.sort((a, b) => (a.x < b.x ? 1 : -1));

  const data = [
    {
      id: 'Смерти',
      data: getTotalDeath && sortedByDate,
    },
    {
      id: 'Заболевания x10',
      data: getTotalCases && sortedByDate2,
    },
  ];

  if (!getTotalDeath) return 'Loading...';

  return (
    <Box sx={{ height: '500px' }}>
      <Box sx={{ width: 230 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Все страны</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterCountry}
            onChange={(value) => countryHandleChange(value)}>
            {getAllCountry &&
              getAllCountry?.map((item, index) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <ResponsiveLine
        margin={{ top: 80, right: 110, bottom: 50, left: 50 }}
        theme={{
          axis: {
            ticks: {
              line: {
                strokeWidth: 0,
              },
              text: {
                fontSize: '0px',
              },
            },
          },
        }}
        data={data}
        curve="monotoneX"
        enablePoints={false}
        // isInteractive={false}
        colors={{ scheme: 'category10' }}
        xScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
        }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Случаи',
          legendOffset: -20,
          legendPosition: 'middle',
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Период',
          legendOffset: 20,
          legendPosition: 'middle',
        }}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: -840,
            translateY: -340,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 16,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
          },
        ]}
      />
    </Box>
  );
};

export default Chart;
