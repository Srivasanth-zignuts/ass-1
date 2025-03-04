'use client';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Form, Formik, Field } from 'formik';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';

const Login = () => {
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Please enter valid email').required('Required'),
		password: Yup.string()
			.min(8, 'Must be at least 8 characters')
			.required('Required'),
	});

	const handleSubmit = (values, props) => {
		console.log(values);
        
		props.resetForm();
	};

	return (
		<Container maxWidth='xs'>
			<Box
				sx={{
					mt: 8,
					p: 4,
					boxShadow: 3,
					borderRadius: 2,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography
					variant='h5'
					gutterBottom
				>
					Login
				</Typography>
				<Formik
					onSubmit={handleSubmit}
					initialValues={{ email: '', password: '' }}
					validationSchema={validationSchema}
				>
					{({ handleChange, handleBlur, errors, values }) => (
						<Form>
							<Field
								as={TextField}
								fullWidth
								margin='normal'
								label='Email'
								variant='outlined'
								name='email'
								values={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
								// error={!!values.email && !!ErrorMessage}
								helperText={<span className='error-msg'>{errors.email}</span>}
							/>

							<Field
								as={TextField}
								fullWidth
								margin='normal'
								label='Password'
								variant='outlined'
								name='password'
								type='password'
								values={values.password}
								onChange={handleChange}
								onBlur={handleBlur}
								// error={!!values.password && !!ErrorMessage}
								// helperText={<ErrorMessage name='password' />}
								helperText={
									<span className='error-msg'>{errors.password}</span>
								}
							/>
							<Button
								type='submit'
								variant='contained'
								fullWidth
								className='mt-2'
								color='primary'
								sx={{
									mt: 1,
								}}
							>
								Login
							</Button>
						</Form>
					)}
				</Formik>
				<div className='redirect-div'>
					<span> New user ? </span>
					<Link
						href={'/signup'}
						className='rediret-link'
					>
						Signup
					</Link>
				</div>
			</Box>
		</Container>
	);
};

export default Login;
