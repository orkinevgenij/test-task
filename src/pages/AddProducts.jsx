import { Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PreviewImage } from '../components/PreviewImage';
import { addProduct, fetchProductCategories, fetchProducts } from '../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const validateSchema = yup.object().shape({
  title: yup.string().min(3, 'Минимум 3 символа').required('Название обязательно'),
  description: yup
    .string()
    .min(3, 'Мінімум 3 символи')
    .max(50, 'Міксімум 50 символів')
    .required('Описання обов’язково'),
  price: yup.number().required('Додайте ціну'),
  rating: yup.number().required('Вкажіть рейтинг'),
  stock: yup.number().required('Вкажіть ціну стока'),
  category: yup.string().required('Вкажіть категорію'),
});

export const AddProducts = () => {
  const navigate = useNavigate();
  const { productCategories, products } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      rating: '',
      stock: '',
      category: '',
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      const id = Math.floor(Math.random() * Date.now());
      dispatch(addProduct({ ...values, id }));
      navigate('/test-task/');
    },
  });

  useEffect(() => {
    dispatch(fetchProductCategories());
  }, []);

  return (
    <>
      <Typography align='center' variant='h5' mb={5} mt={5}>
        Додати товар
      </Typography>
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Paper
          sx={{
            width: '50vw',
          }}
        >
          <Stack component='form' spacing={2} onSubmit={formik.handleSubmit}>
            <TextField
              label='Назва'
              variant='outlined'
              placeholder='Назва'
              fullWidth
              name='title'
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <Typography color='red' align='center'>
              {formik.touched.title && formik.errors.title}
            </Typography>

            <TextField
              variant='outlined'
              fullWidth
              label='Опис'
              placeholder='Опис'
              name='description'
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <Typography color='red' align='center'>
              {formik.touched.description && formik.errors.description}
            </Typography>
            <TextField
              variant='outlined'
              fullWidth
              label='Ціна'
              placeholder='Ціна'
              name='price'
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            <Typography color='red' align='center'>
              {formik.touched.price && formik.errors.price}
            </Typography>

            <TextField
              variant='outlined'
              fullWidth
              label='Рейтинг'
              name='rating'
              placeholder='Рейтинг'
              value={formik.values.rating}
              onChange={formik.handleChange}
            />
            <Typography color='red' align='center'>
              {formik.touched.rating && formik.errors.rating}
            </Typography>
            <TextField
              variant='outlined'
              fullWidth
              label='Сток'
              name='stock'
              placeholder='Сток'
              value={formik.values.stock}
              onChange={formik.handleChange}
            />
            <Typography color='red' align='center'>
              {formik.touched.stock && formik.errors.stock}
            </Typography>
            <TextField
              select
              onChange={formik.handleChange('category')}
              value={formik.values.category}
              label='Категория товара'
            >
              {productCategories?.map((category, i) => (
                <MenuItem key={i} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <Typography color='red' align='center'>
              {formik.touched.category && formik.errors.category}
            </Typography>
            <Button type='submit' variant='contained'>
              Додати
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};
