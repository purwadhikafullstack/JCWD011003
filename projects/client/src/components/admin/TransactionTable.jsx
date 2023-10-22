import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
} from 'react-table';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Box,
  Select,
  
} from '@chakra-ui/react';

function generateBranchOptions(data) {
    const branchSet = new Set();
    data.forEach((item) => {
      if (item.Branch && item.Branch.name) {
        branchSet.add(item.Branch.name);
      }
    });
    return [...branchSet];
  }

// Define a default filter function for text columns
const defaultColumn = {
  Filter: DefaultColumnFilter,
};

// Create a custom filter component
function DefaultColumnFilter({ column }) {
  const { filterValue, setFilter } = column;

  return (
    <Input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder={`Filter ${column.Header}`}
    />
  );
}

// Define your table component
function TransactionTable({ data }) {
    const branchOptions = generateBranchOptions(data);
    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleDateRangeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  // Filter function for date range
  const dateRangeFilter = ({ id, value }, rows) => {
    if (id === 'createdAt') {
      return rows.filter((row) => {
        const rowDate = new Date(row.values[id]).getTime();
        if (startDate && endDate) {
          const startUTC = startDate.toUTCString();
          const endUTC = new Date(endDate.getTime() + 24 * 60 * 60 * 1000).toUTCString(); // Add one day to the end date
          return rowDate >= new Date(startUTC).getTime() && rowDate <= new Date(endUTC).getTime();
        } else if (startDate) {
          const startUTC = startDate.toUTCString();
          return rowDate >= new Date(startUTC).getTime();
        } else if (endDate) {
          const endUTC = new Date(endDate.getTime() + 24 * 60 * 60 * 1000).toUTCString();
          return rowDate <= new Date(endUTC).getTime();
        }
        return true;
      });
    }
    return rows;
  };

  const columns = React.useMemo(
    () => [
      // Define your columns here
      // For example:
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'User Address',
        accessor: 'userAddress',
        Filter: 'text', // Use the default text filter
      },
      {
        Header: 'Branch',
        accessor: 'Branch.name',
        Filter: 'text',
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        Filter: 'text',
      },
      // Add more columns as needed
    ],
    []
  );
const navigate = useNavigate()
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
        columns,
        data,
        defaultColumn,
        // Add your custom filter functions
        filterTypes: {
          dateRange: dateRangeFilter,
        },
      },
    useFilters, // Use the filtering plugin
    useGlobalFilter, // Use the global filter plugin
    useSortBy // Use sorting plugin
  );
function checker (data) {
  console.log(data)
}
  return (
    <Box>
        <div>
        {/* Date picker for start date */}
        <DatePicker
          selected={startDate}
          onChange={date => handleDateRangeChange(date, endDate)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        {/* Date picker for end date */}
        <DatePicker
          selected={endDate}
          onChange={date => handleDateRangeChange(startDate, date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
        />
      </div>
      <Select
  value={state.filters[2]?.value || 'All Branches'} // Assuming branch filter is the third column
  onChange={(e) => {
    const selectedBranch = e.target.value;
    setGlobalFilter(selectedBranch === 'All Branches' ? '' : selectedBranch, 2);
  }}
>
  <option value="All Branches">All Branches</option>
  {branchOptions.map((branch) => (
    <option key={branch} value={branch}>
      {branch}
    </option>
  ))} {/* You were missing the closing parenthesis here */}
</Select>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <Box>{column.canFilter && column.render('Filter')}</Box>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}
              onClick={() => navigate(`${row.original.id}`)}
              >
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}

export default TransactionTable;
