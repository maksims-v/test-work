import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Box, Tab, Tabs } from '@mui/material';
import Table from './Table';
import DatePickerValue from './DatePicker';
import dayjs from 'dayjs';
import Chart from './Chart';
import Filters from './Filters';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Panel = ({ data }) => {
  const [value, setValue] = useState(0);
  const [sortedData, setSortedDAta] = useState();
  const [allCountryData, setAllCountrData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [fromDate, setFromDate] = useState(dayjs(new Date()));
  const [toDate, setToDate] = useState(dayjs(new Date()));
  const [minDate, setMinDate] = useState();
  const [maxDate, setMaxDate] = useState();
  const [isSort, setIsSort] = useState(false);
  const [filterKey, setFilterKey] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filterCountry, setFilterCountry] = useState();

  useEffect(() => {
    if (data) {
      const newData = data.reduce((acc, item) => {
        const { countriesAndTerritories, cases, deaths, date, id, popData2019 } = item;

        if (!acc[countriesAndTerritories])
          acc[countriesAndTerritories] = {
            cases: 0,
            deaths: 0,
            totalDeath: 0,
            totalCases: 0,
            casesPer1000people: 0,
            deathPer1000people: 0,
          };

        acc[countriesAndTerritories].countriesAndTerritories = countriesAndTerritories;
        acc[countriesAndTerritories].cases += cases;
        acc[countriesAndTerritories].deaths += deaths;
        acc[countriesAndTerritories].date = date;
        acc[countriesAndTerritories].id = id;
        acc[countriesAndTerritories].popData2019 = popData2019;
        acc[countriesAndTerritories].totalDeath += deaths;
        acc[countriesAndTerritories].totalCases += cases;
        acc[countriesAndTerritories].casesPer1000people = (
          (acc[countriesAndTerritories].totalCases * 1000) /
          popData2019
        ).toFixed(3);
        acc[countriesAndTerritories].deathPer1000people = (
          (acc[countriesAndTerritories].totalDeath * 1000) /
          popData2019
        ).toFixed(3);

        return acc;
      }, []);
      setChartData(data);
      setSortedDAta(Object.values(newData));
      setAllCountrData(Object.values(newData));

      if (sortedData) {
        const dateArr = data.map(({ date }) => date);
        setFromDate(dayjs(Math.min.apply(null, dateArr)));
        setToDate(dayjs(Math.max.apply(null, dateArr)));
        if (!isSort) {
          setMinDate(dayjs(Math.min.apply(null, dateArr)));
          setMaxDate(dayjs(Math.max.apply(null, dateArr)));
        }
      }
    }
  }, [data, isSort]);

  const changeMinDate = (value) => {
    setIsSort(true);
    setFromDate(value);
    const dateStart = new Date(value).getTime();

    const newData = data.filter((item) => {
      return item.date >= dateStart && item.date <= toDate;
    });

    setChartData(newData);

    const sortByDate = Object.values(
      newData.reduce((acc, item) => {
        const { countriesAndTerritories, cases, deaths, date, id, popData2019 } = item;

        if (!acc[countriesAndTerritories])
          acc[countriesAndTerritories] = {
            cases: 0,
            deaths: 0,
            totalDeath: 0,
            totalCases: 0,
            casesPer1000people: 0,
            deathPer1000people: 0,
          };

        acc[countriesAndTerritories].countriesAndTerritories = countriesAndTerritories;
        acc[countriesAndTerritories].cases += cases;
        acc[countriesAndTerritories].deaths += deaths;
        acc[countriesAndTerritories].date = date;
        acc[countriesAndTerritories].id = id;
        acc[countriesAndTerritories].popData2019 = popData2019;
        acc[countriesAndTerritories].totalDeath += deaths;
        acc[countriesAndTerritories].totalCases += cases;
        acc[countriesAndTerritories].casesPer1000people = (
          (acc[countriesAndTerritories].totalCases * 1000) /
          popData2019
        ).toFixed(3);
        acc[countriesAndTerritories].deathPer1000people = (
          (acc[countriesAndTerritories].totalDeath * 1000) /
          popData2019
        ).toFixed(3);

        return acc;
      }, []),
    );

    setSortedDAta(sortByDate);
  };

  const changeMaxDate = (value) => {
    setIsSort(true);
    setToDate(value);
    const dateTo = new Date(value).getTime();

    const newData = data.filter((item) => {
      return item.date >= fromDate && item.date <= dateTo;
    });
    setChartData(newData);

    const sortByDate = Object.values(
      newData.reduce((acc, item) => {
        const { countriesAndTerritories, cases, deaths, date, id, popData2019 } = item;

        if (!acc[countriesAndTerritories])
          acc[countriesAndTerritories] = {
            cases: 0,
            deaths: 0,
            totalDeath: 0,
            totalCases: 0,
            casesPer1000people: 0,
            deathPer1000people: 0,
          };

        acc[countriesAndTerritories].countriesAndTerritories = countriesAndTerritories;
        acc[countriesAndTerritories].cases += cases;
        acc[countriesAndTerritories].deaths += deaths;
        acc[countriesAndTerritories].date = date;
        acc[countriesAndTerritories].id = id;
        acc[countriesAndTerritories].popData2019 = popData2019;
        acc[countriesAndTerritories].totalDeath += deaths;
        acc[countriesAndTerritories].totalCases += cases;
        acc[countriesAndTerritories].casesPer1000people = (
          (acc[countriesAndTerritories].totalCases * 1000) /
          popData2019
        ).toFixed(3);
        acc[countriesAndTerritories].deathPer1000people = (
          (acc[countriesAndTerritories].totalDeath * 1000) /
          popData2019
        ).toFixed(3);

        return acc;
      }, []),
    );

    setSortedDAta(sortByDate);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const search = (value) => {
    setIsSort(true);
    const searchValue = value.toLowerCase();

    const filterData = allCountryData.filter((item) => {
      if (item.countriesAndTerritories.toLowerCase() === searchValue) {
        return item;
      }
    });

    setSortedDAta(filterData);
    setChartData(filterData);
  };

  const filterHandleChange = (event) => {
    setIsSort(true);
    setFilterKey(event.target.value);
    console.log(event.target.value);
  };

  const countryHandleChange = (e) => {
    setFilterCountry(e.target.value);

    const newData = data.filter((item) => {
      return item.countriesAndTerritories == e.target.value;
    });

    setChartData(newData);
  };

  const filtersClear = () => {
    setFilterCountry('');
    setIsSort(false);
    setSearchValue('');
    setFilterKey('');
    setFromDate(dayjs(new Date()));
    setToDate(dayjs(new Date()));
    setChartData(data);
    setSortedDAta(allCountryData);
  };

  return (
    <Container sx={{ width: '100%', pt: 5, pb: 5 }}>
      <Box sx={{ textAlign: 'center', width: '100%' }}>
        <DatePickerValue
          changeMinDate={changeMinDate}
          changeMaxDate={changeMaxDate}
          minDate={minDate}
          maxDate={maxDate}
          fromDate={fromDate}
          toDate={toDate}
        />
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Таблица" {...a11yProps(0)} />
          <Tab label="График" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <Box>
          <Filters
            search={search}
            allCountryData={allCountryData}
            filterHandleChange={filterHandleChange}
            filterKey={filterKey}
            filtersClear={filtersClear}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
          />
          <Table sortedData={sortedData} />
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Chart
          filterCountry={filterCountry}
          chartData={chartData}
          sortedData={sortedData}
          countryHandleChange={countryHandleChange}
        />
      </CustomTabPanel>
    </Container>
  );
};

export default Panel;
