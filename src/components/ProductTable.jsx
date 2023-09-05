import React, { useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';
import { PreviewImage } from './PreviewImage';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../redux/slices/productSlice';
import { useSortableData } from '../hooks/useSortableData';
import SortIcon from '@mui/icons-material/Sort';
import { Loader } from './Loader';
const rows = [
  { name: 'id', sortName: 'id' },
  { name: 'Назва', sortName: 'title' },
  { name: 'Зображення', sortName: 'photo' },
  { name: 'Опис', sortName: 'description' },
  { name: 'Ціна', sortName: 'price' },
  { name: 'Рейтинг', sortName: 'rating' },
  { name: 'Сток', sortName: 'stock' },
  { name: 'Категорія', sortName: 'category' },
  { name: 'Дія', sortName: 'active' },
];

const ProductTable = ({ products }) => {
  const { items, requestSort } = useSortableData(products);
  const { isLoading } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeProduct(id));
  };
  if (isLoading) return <Loader />;
  return (
    <TableContainer
      sx={{
        marginTop: 3,
      }}
    >
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            {rows.map((row, i) => (
              <TableCell
                padding='checkbox'
                size='small'
                key={i}
                sx={{
                  fontWeight: 'bold',
                }}
                align='center'
              >
                {row.name}
                <IconButton
                  onClick={() => requestSort(row.sortName)}
                  sx={{
                    margin: '10px',
                  }}
                >
                  <SortIcon fontSize='small' />
                </IconButton>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.map((product) => (
            <TableRow key={product?.id}>
              <TableCell align='center'>{product?.id}</TableCell>
              <TableCell align='center'>{product?.title}</TableCell>
              <TableCell align='center'>
                {product.images && (
                  <Avatar
                    alt='Remy Sharp'
                    src={product?.images[0]}
                    sx={{ width: 60, height: 60 }}
                  />
                )}
              </TableCell>

              <TableCell align='center'>{product?.description}</TableCell>
              <TableCell align='center'>{product?.price}</TableCell>

              <TableCell align='center'>{product?.rating}</TableCell>
              <TableCell align='center'>{product?.stock}</TableCell>
              <TableCell align='center'>{product?.category}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() =>
                    navigate(`/product-update/${product?.id}`, {
                      state: { product },
                    })
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon onClick={() => handleRemove(product.id)} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
