import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const Table = ({ sortedData }) => {
  const columns = [
    {
      field: 'countriesAndTerritories',
      headerName: 'Страна',
      flex: 0.7,
    },
    {
      field: 'cases',
      headerName: 'Количество случаев',
      flex: 1,
    },
    {
      field: 'deaths',
      headerName: 'Количество смертей',
      flex: 1,
    },
    {
      field: 'totalCases',
      headerName: 'Количество случаев всего',
      flex: 1,
    },
    {
      field: 'totalDeath',
      headerName: 'Количество смертей всего',
      flex: 1,
    },
    {
      field: 'casesPer1000people',
      headerName: 'Количество случаев на 1000 жителей',
      flex: 1,
    },
    {
      field: 'deathPer1000people',
      headerName: 'Количество смертей на 1000 жителей',
      flex: 1,
    },
  ];

  return (
    <Box>
      <Box mt="40px" height="75vh" sx={{}}>
        <DataGrid getRowId={(row) => row.id} rows={sortedData || []} columns={columns} />
      </Box>
    </Box>
  );
};

export default Table;
