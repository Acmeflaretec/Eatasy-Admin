import React from 'react';
import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Skeleton } from '@mui/material';
import { useGetMesses } from 'api/queries/messQuery';
import Dot from 'components/@extended/Dot';
import { useNavigate } from 'react-router';

const headCells = [
  { id: 'id', label: 'Mess ID.' },
  { id: 'name', label: 'Mess Name' },
  { id: 'location', label: 'Location' },
  { id: 'phone', label: 'Phone' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', align: 'center', label: 'Joined On' },
];

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function OrderStatus({ status }) {
  let color, title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

export default function MessList() {
  const order = 'asc';
  const orderBy = 'id';
  const navigate = useNavigate()
  const { data, isLoading } = useGetMesses();

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={index}
                >
                  <TableCell component="th" scope="row">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
              ))
              : data?.data?.map((item, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer" }}
                    tabIndex={-1}
                    key={item?.id}
                    onClick={() => navigate(`/messes/edit/${item?.id}`)}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      <Link color="secondary">{item?.id}</Link>
                    </TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.location}</TableCell>
                    <TableCell>{item?.phone}</TableCell>
                    <TableCell>
                      <OrderStatus status={item?.status} />
                    </TableCell>
                    <TableCell align="center">
                      {new Date(item?.createdAt)?.toDateString()}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };
OrderStatus.propTypes = { status: PropTypes.string };
