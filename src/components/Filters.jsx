import { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Filters = ({
  search,
  allCountryData,
  filterHandleChange,
  filterKey,
  filtersClear,
  setSearchValue,
  searchValue,
}) => {
  const [filterKeys, setFiltersKeys] = useState();

  useEffect(() => {
    setFiltersKeys(allCountryData.length !== 0 && Object.keys(allCountryData[0]));
  }, [allCountryData]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 200,
            height: 40,
            mr: '10px',
            border: '1px solid #727272',
            borderRadius: '5px',
          }}>
          <InputBase
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Поиск страны"
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" color="#727272" />
          <IconButton
            onClick={() => search(searchValue)}
            type="button"
            sx={{ p: '10px' }}
            aria-label="search">
            <SearchIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box sx={{ width: 230 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Фильтровать по полям</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterKey}
              label="Age"
              onChange={(value) => filterHandleChange(value)}>
              {filterKeys &&
                filterKeys?.map((item, index) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <TextField
            id="outlined-number"
            label="От"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            sx={{ pl: 2 }}
            id="outlined-number"
            label="До"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </Box>
      <Box sx={{ textAlign: 'right', pt: 2 }}>
        <Button size="large" sx={{ ml: 5 }} onClick={() => filtersClear()} variant="outlined">
          Сбросить фильтры
        </Button>
      </Box>
    </Box>
  );
};

export default Filters;
