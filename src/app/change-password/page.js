'use client';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

const ChangePassword = () => {
	const router = useRouter();
	const [userState, setUserState] = useState(null);

	const validationSchema = Yup.object().shape({
		password: Yup.string()
			.matches(/^(?=.*[!@#\$%\^&\*])/, 'Must contain atleast one symbol')
			.matches(/^(?=.*[a-z])/, 'Must contain atleast one lowercase letter')
			.matches(/(?=.*[A-Z])/, 'Must contain atleast one uppercase letter')
			.matches(/^(?=.*[0-9])/, 'Must contain atleast one numeric letter')
			.min(8, 'Must be at least 8 characters')
			.required('Required'),
		newpassword: Yup.string()
			.matches(/^(?=.*[!@#\$%\^&\*])/, 'Must contain atleast one symbol')
			.matches(/^(?=.*[a-z])/, 'Must contain atleast one lowercase letter')
			.matches(/(?=.*[A-Z])/, 'Must contain atleast one uppercase letter')
			.matches(/^(?=.*[0-9])/, 'Must contain atleast one numeric letter')
			.min(8, 'Must be at least 8 characters')
			.required('Required'),
		confirmnewppassword: Yup.string()
			.oneOf([Yup.ref('newpassword')], 'password not matched')
			.required('Required'),
	});

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('currentUser'));
		if (!user) {
			router.push('/login');
		} else {
			setUserState(user);
		}
	}, [router, setUserState]);

	const handleSubmit = (values) => {
		let users = JSON.parse(localStorage.getItem('users')) || [];

		if (bcrypt.compareSync(values.password, userState.password)) {
			const userIndex = users.findIndex(
				(user) => user.email === userState.email
			);
			if (userIndex !== -1) {
				const hashedNewPassword = bcrypt.hashSync(values.newpassword, 10);
				users[userIndex] = {
					...users[userIndex], // Preserve other user details
					password: hashedNewPassword,
				};
				localStorage.setItem('users', JSON.stringify(users));
				localStorage.removeItem('currentUser');

				alert('Password Updated Successfully');
				router.push('/login');
			}
		} else {
			alert('Current password is incorrect');
		}
	};

	return (
		<Container maxWidth='sm'>
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
					Change password
				</Typography>

				{userState && (
					<Formik
						initialValues={{
							password: '',
							newpassword: '',
							confirmnewppassword: '',
						}}
						enableReinitialize={true}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ handleChange, errors, values }) => (
							<Form>
								<Field
									as={TextField}
									fullWidth
									margin='normal'
									label='Current Password'
									variant='outlined'
									name='password'
									value={values.password}
									onChange={handleChange}
									helperText={errors.password}
								/>
								<Field
									as={TextField}
									fullWidth
									margin='normal'
									label='New password'
									variant='outlined'
									name='newpassword'
									value={values.newpassword}
									onChange={handleChange}
									helperText={errors.newpassword}
								/>
								<Field
									as={TextField}
									fullWidth
									margin='normal'
									label='Confirm New Password'
									variant='outlined'
									name='confirmnewppassword'
									value={values.confirmnewppassword}
									onChange={handleChange}
									helperText={errors.confirmnewppassword}
								/>
								<Button
									type='submit'
									variant='contained'
									fullWidth
									sx={{ mt: 2 }}
								>
									Save New Password
								</Button>
							</Form>
						)}
					</Formik>
				)}
			</Box>
		</Container>
	);
};

export default ChangePassword;
