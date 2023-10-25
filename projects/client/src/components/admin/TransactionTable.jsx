import React, {useState} from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination
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
  IconButton,
  
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

  function generateUserOptions(data) {
    const userSet = new Set();
    data.forEach((item) => {
      if (item.User && item.User.name) {
        userSet.add(item.User.name);
      }
    });
    return [...userSet];
}

function generateStatusOptions(data) {
    const statusSet = new Set();
    data.forEach((item) => {
      if (item.Transaction_Status && item.Transaction_Status.status) {
        statusSet.add(item.Transaction_Status.status);
      }
    });
    return [...statusSet];
}

const defaultColumn = {
  Filter: DefaultColumnFilter,
};

function DefaultColumnFilter({ column }) {
  const { filterValue, setFilter } = column;

  // return (
  //   <Input
  //     value={filterValue || ''}
  //     onChange={(e) => setFilter(e.target.value || undefined)}
  //     placeholder={`Filter ${column.Header}`}
  //   />
  // );
}
function TransactionTable({ data }) {
    const branchOptions = generateBranchOptions(data);
    const userOptions = generateUserOptions(data);
    const statusOptions = generateStatusOptions(data);
    const [activeFilter, setActiveFilter] = useState(null);
  const [selectedUser, setSelectedUser] = useState('All Users');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "User Name",
        accessor: "User.name",
      },
      {
        Header: "Status",
        accessor: "Transaction_Status.status",
      },
      {
        Header: "Branch",
        accessor: "Branch.name",
      },
      {
        Header: "Transaction Created",
        accessor: "createdAt",
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        Header: "Transaction Updated",
        accessor: "updatedAt",
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
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
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex },
    setGlobalFilter,
  } = useTable(
    {
        columns,
        data,
        defaultColumn,
        initialState: { pageSize: 5 },
       
      },
    useFilters, 
    useGlobalFilter, 
    useSortBy,
    usePagination
  );

  const handleFilterChange = (filterIndex, selectedValue) => {
    setActiveFilter(filterIndex); // Set the currently active filter
    setGlobalFilter(selectedValue === `All ${filterIndex === 3 ? 'Users' : filterIndex === 4 ? 'Statuses' : 'Branches'}` ? '' : selectedValue, filterIndex);
    
    // Update the selected values based on the filter
    switch (filterIndex) {
      case 3:
        setSelectedUser(selectedValue);
        break;
      case 4:
        setSelectedStatus(selectedValue);
        break;
      case 2:
        setSelectedBranch(selectedValue);
        break;
      default:
        break;
    }
  };

  const clearFilters = () => {
    setActiveFilter(null); // Clear the active filter
    setGlobalFilter('', -1); // Clear all filters

    // Reset the selected values
    setSelectedUser('All Users');
    setSelectedStatus('All Statuses');
    setSelectedBranch('All Branches');
  };

  const getDefaultValue = (filterIndex) => {
    if (filterIndex === activeFilter) {
      // Return the selected filter's value
      return state.filters[filterIndex]?.value || 'All Users';
    }
    // Return the default value for other filters
    return `All ${filterIndex === 3 ? 'Users' : filterIndex === 4 ? 'Statuses' : 'Branches'}`;
  };  
  return (
    <Box>
       <Select
        width={'400px'}
        value={selectedUser}
        onChange={(e) => handleFilterChange(3, e.target.value)}
      >
  <option value="All Users">All Users</option>
  {userOptions.map((user) => (
    <option key={user} value={user}>
      {user}
    </option>
  ))} 
</Select>


<Select
        width={'400px'}
        value={selectedStatus}
        onChange={(e) => handleFilterChange(4, e.target.value)}
      >
  <option value="All Statuses">All Statuses</option>
  {statusOptions.map((status) => (
    <option key={status} value={status}>
      {status}
    </option>
  ))} 
</Select>
<Select
        width={'400px'}
        value={selectedBranch}
        onChange={(e) => handleFilterChange(2, e.target.value)}
      >
  <option value="All Branches">All Branches</option>
  {branchOptions.map((branch) => (
    <option key={branch} value={branch}>
      {branch}
    </option>
  ))} 
</Select>
<button onClick={clearFilters}>Clear Filters</button>
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
  {page.map((row) => {
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <IconButton
      onClick={() => previousPage()}
      isDisabled={!canPreviousPage}
      aria-label="Previous page"
      icon={<ChevronLeftIcon />}
    />
    <div style={{ margin: '0 10px' }}>Page {pageIndex + 1}</div>
    <IconButton
      onClick={() => nextPage()}
      isDisabled={!canNextPage}
      aria-label="Next page"
      icon={<ChevronRightIcon />}
    />
  </div>
    </Box>
  );
}

export default TransactionTable;