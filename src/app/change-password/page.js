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
		password: Yup.string().required('Required'),
		newpassword: Yup.string()
			.matches(/^(?=.*[!@#\$%\^&\*])/, 'Must contain at least one symbol')
			.matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase letter')
			.matches(/(?=.*[A-Z])/, 'Must contain at least one uppercase letter')
			.matches(/^(?=.*[0-9])/, 'Must contain at least one numeric letter')
			.min(8, 'Must be at least 8 characters')
			.required('Required'),
		confirmnewpassword: Yup.string()
			.oneOf([Yup.ref('newpassword')], 'Passwords do not match')
			.required('Required'),
	});

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('currentUser'));
		if (!user) {
			router.push('/login');
		} else {
			setUserState(user);
		}
	}, [router]);

	const handleSubmit = (values) => {
		let users = JSON.parse(localStorage.getItem('users')) || [];
		const userIndex = users.findIndex((user) => user.email === userState.email);

		if (userIndex === -1) {
			alert('User not found!');
			return;
		}

		const isMatch = bcrypt.compareSync(values.password, userState.password);
		if (!isMatch) {
			alert('Current password is incorrect');
			return;
		}

		const isSameAsOld = bcrypt.compareSync(
			values.newpassword,
			userState.password
		);
		if (isSameAsOld) {
			alert('New password must be different from the current password');
			return;
		}

		const hashedPassword = bcrypt.hashSync(values.newpassword, 10);
		users[userIndex] = {
			...users[userIndex],
			password: hashedPassword,
			confirmpassword: hashedPassword,
		};
		localStorage.setItem('users', JSON.stringify(users));

		localStorage.setItem(
			'currentUser',
			JSON.stringify({ ...userState, password: hashedPassword })
		);

		alert('Password Updated Successfully');
		router.push('/login');
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
					Change Password
				</Typography>

				{userState && (
					<Formik
						initialValues={{
							password: '',
							newpassword: '',
							confirmnewpassword: '',
						}}
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
									type='password'
									name='password'
									value={values.password}
									onChange={handleChange}
									helperText={errors.password}
									error={!!errors.password}
								/>
								<Field
									as={TextField}
									fullWidth
									margin='normal'
									label='New Password'
									variant='outlined'
									type='password'
									name='newpassword'
									value={values.newpassword}
									onChange={handleChange}
									helperText={errors.newpassword}
									error={!!errors.newpassword}
								/>
								<Field
									as={TextField}
									fullWidth
									margin='normal'
									label='Confirm New Password'
									variant='outlined'
									type='password'
									name='confirmnewpassword'
									value={values.confirmnewpassword}
									onChange={handleChange}
									helperText={errors.confirmnewpassword}
									error={!!errors.confirmnewpassword}
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
