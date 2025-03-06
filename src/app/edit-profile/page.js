'use client';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

const EditProfile = () => {
	const router = useRouter();
	const [userState, setUserState] = useState(null);
	//validation schema
	const validationSchema = Yup.object().shape({
		firstname: Yup.string().min(3, "It's too short").required('Required'),
		lastname: Yup.string().min(3, "It's too short").required('Required'),
		email: Yup.string().email('Please enter valid email').required('Required'),
		phonenumber: Yup.string()
			.length(10, 'Phone number must be 10 digits')
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

		//find user and edit
		const userIndex = users.findIndex((user) => user.email === userState.email);
		if (userIndex !== -1) {
			users[userIndex] = values;
		} else {
			users.push(values);
		}

		localStorage.setItem('users', JSON.stringify(users));
		localStorage.setItem('currentUser', JSON.stringify(values));

		alert('Profile Updated Successfully');
		router.push('/products');
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
					Edit Profile
				</Typography>
				{/* Edit Profile container */}
				{userState && (
					<Formik
						initialValues={userState}
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
									label='First Name'
									variant='outlined'
									name='firstname'
									value={values.firstname}
									onChange={handleChange}
									helperText={errors.firstname}
								/>
								<Field
									as={TextField}
									fullWidth
									margin='normal'
									label='Last Name'
									variant='outlined'
									name='lastname'
									value={values.lastname}
									onChange={handleChange}
									helperText={errors.lastname}
								/>
								<Field
									as={TextField}
									fullWidth
									margin='normal'
									label='Email'
									variant='outlined'
									name='email'
									value={values.email}
									onChange={handleChange}
									helperText={errors.email}
								/>
								<Field
									as={TextField}
									label='Phone Number'
									fullWidth
									margin='normal'
									name='phonenumber'
									value={values.phonenumber}
									onChange={handleChange}
									helperText={errors.phonenumber}
								/>
								<Button
									type='submit'
									variant='contained'
									fullWidth
									sx={{ mt: 2 }}
								>
									Save Edits
								</Button>
							</Form>
						)}
					</Formik>
				)}
			</Box>
		</Container>
	);
};

export default EditProfile;
