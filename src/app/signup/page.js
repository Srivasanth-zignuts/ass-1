'use client';
import {
	Box,
	Button,
	Container,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
import { Form, Formik, Field } from 'formik';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';

// const salt = bcrypt.genSaltSync(10);

const SignUp = () => {
	const router = useRouter();

	//form validation using Yup
	const validationSchema = Yup.object().shape({
		firstname: Yup.string().min(3, "It's too short").required('Required'),
		lastname: Yup.string().min(3, "It's too short").required('Required'),
		email: Yup.string().email('Please enter valid email').required('Required'),
		phonenumber: Yup.number()
			.test('Invalid', (number) => String(number).length === 10)
			.required('Required'),
		password: Yup.string()
			.matches(/^(?=.*[!@#\$%\^&\*])/, 'Must contain atleast one symbol')
			.matches(/^(?=.*[a-z])/, 'Must contain atleast one lowercase letter')
			.matches(/(?=.*[A-Z])/, 'Must contain atleast one uppercase letter')
			.matches(/^(?=.*[0-9])/, 'Must contain atleast one numeric letter')
			.min(8, 'Must be at least 8 characters')
			.required('Required'),
		confirmpassword: Yup.string()
			.oneOf([Yup.ref('password')], 'password not matched')
			.required('Required'),
	});

	const handleSubmit = async (values, props) => {
		let users = JSON.parse(localStorage.getItem('users')) || [];

		if (users.find((user) => user.email === values.email)) {
			alert('Email already exists');
			return;
		}

		// console.log(values);
		const hashed = bcrypt.hashSync(values.confirmpassword); //password hashing for secqurity
		// console.log(hashed)
		const newUser = {
			...values,
			confirmpassword: hashed,
			password: hashed,
		};
		users.push(newUser);
		localStorage.setItem('users', JSON.stringify(users));
		localStorage.setItem('currentUser', JSON.stringify(newUser));
		// console.log(encryptedData);
		// const decrypt = await bcrypt.compareSync("Srivasanth#23", hashed)
		// console.log(decrypt)
		props.resetForm();
		router.push('/products');
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
					SignUp
				</Typography>
				{/* Form container */}
				<Formik
					onSubmit={handleSubmit}
					initialValues={{
						firstname: '',
						lastname: '',
						email: '',
						phonenumber: '',
						password: '',
						confirmpassword: '',
					}}
					validationSchema={validationSchema}
				>
					{({ handleChange, errors, values }) => (
						<Form>
							<Grid
								container
								spacing={2}
							>
								<Grid
									item
									className='grid-elem'
								>
									<Field
										as={TextField}
										fullWidth
										margin='normal'
										label='First Name'
										variant='outlined'
										name='firstname'
										values={values.firstname}
										onChange={handleChange}
										// error={!!values.email && !!ErrorMessage}
										helperText={
											<span className='error-msg'>{errors.firstname}</span>
										}
									/>
									<Field
										as={TextField}
										fullWidth
										margin='normal'
										label='Last Name'
										variant='outlined'
										name='lastname'
										values={values.lastname}
										onChange={handleChange}
										// error={!!values.email && !!ErrorMessage}
										helperText={
											<span className='error-msg'>{errors.lastname}</span>
										}
									/>
								</Grid>
							</Grid>
							<Field
								as={TextField}
								fullWidth
								margin='normal'
								label='Email'
								variant='outlined'
								name='email'
								values={values.email}
								onChange={handleChange}
								// error={!!values.email && !!ErrorMessage}
								helperText={<span className='error-msg'>{errors.email}</span>}
							/>

							<Field
								as={TextField}
								label='Phone Number'
								fullWidth
								margin='normal'
								name='phonenumber'
								values={values.phonenumber}
								onChange={handleChange}
								helperText={
									<span className='error-msg'>{errors.phonenumber}</span>
								}
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
								// error={!!values.password && !!ErrorMessage}
								// helperText={<ErrorMessage name='password' />}
								helperText={
									<span className='error-msg'>{errors.password}</span>
								}
							/>
							<Field
								as={TextField}
								fullWidth
								margin='normal'
								label='Confirm Password'
								variant='outlined'
								name='confirmpassword'
								type='password'
								values={values.confirmpassword}
								onChange={handleChange}
								// error={!!values.password && !!ErrorMessage}
								// helperText={<ErrorMessage name='password' />}
								helperText={
									<span className='error-msg'>{errors.confirmpassword}</span>
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
								Sign Up
							</Button>
						</Form>
					)}
				</Formik>
				<div className='redirect-div'>
					<span> Alredy a user ? </span>
					<Link
						href={'/login'}
						className='rediret-link'
					>
						Login
					</Link>
				</div>
			</Box>
		</Container>
	);
};

export default SignUp;
