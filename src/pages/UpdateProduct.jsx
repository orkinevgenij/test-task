import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// import { addProduct } from '../redux/slices/productSlice';
import { PreviewImage } from '../components/PreviewImage';
import { addProduct, fetchProductCategories, updateProduct } from '../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const validateSchema = yup.object().shape({
  title: yup.string().min(3, 'Минимум 3 символа').required('Поле не может быть пустым'),
  description: yup
    .string()
    .min(3, 'Мінімум 3 символи')
    .max(50, 'Максімум 50 символів')
    .required('Поле не може бути пустим'),
  price: yup.number().required('Поле не може бути пустим'),
  rating: yup.number().required('Поле не може бути пустим'),
  stock: yup.number().required('Поле не може бути пустим'),
  category: yup.string().required('Вкажіть категорію'),
});
export const UpdateProduct = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productCategories, products } = useSelector((state) => state.product);
  const formik = useFormik({
    initialValues: {
      title: state?.product.title,
      description: state?.product.description,
      price: state?.product.price,
      rating: state?.product.rating,
      stock: state?.product.stock,
      category: state?.product.category,
    },
    validationSchema: validateSchema,

    onSubmit: (values) => {
      dispatch(
        updateProduct({
          id: Number(id),
          title: values?.title,
          description: values?.description,
          price: values?.price,
          rating: values?.rating,
          stock: values?.stock,
          category: values?.category,
        }),
      );
      navigate('/');
    },
  });

  useEffect(() => {
    dispatch(fetchProductCategories());
  }, []);

  return (
    <>
      <Typography align='center' variant='h5' mb={5} mt={5}>
        Оновити товар
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
