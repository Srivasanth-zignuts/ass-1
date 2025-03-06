'use client';
import {
	AppBar,
	Box,
	Container,
	IconButton,
	List,
	Menu,
	MenuItem,
	Pagination,
	Toolbar,
	Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import useAuthStore from '../zustand/store';
import { useRouter } from 'next/navigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CardElem from '../components/CardElem';

const ProductsFetch = () => {
	const [totalPages, setTotalpages] = useState(1);
	const [currentPage, setcurrentPage] = useState(1);
	const [products, setproducts] = useState([]);
	const [anchorEl, setAnchorEl] = useState(null);
	// const {isAuthenticated} = useAuthStore();
	const router = useRouter();
	// const [skip, setSkip] = useState(0);
	const limit = 8;

	useEffect(() => {
		const user = localStorage.getItem('currentUser');
		if (!user) {
			router.push('/login');
		}
		const fetchdata = async () => {
			try {
				const skip = (currentPage - 1) * limit;
				const response = await axios.get(
					`https://dummyjson.com/products?limit=${limit}&skip=${skip}`
				);
				// console.log(response.data.products);
				setproducts(response.data.products);
				setTotalpages(Math.ceil(response.data.total / limit));
			} catch (e) {
				console.log(e);
			}
		};

		fetchdata();
	}, [currentPage, router]);

	// console.log(totalPages);

	const handleChange = (events, value) => {
		setcurrentPage(value);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleEditProfile = () => {
		router.push('/edit-profile');
	};

	const handleLogout = () => {
		localStorage.removeItem('currentUser');
		router.push('/login');
	};

	const handleChangepassword = () => {
		router.push('/change-password');
	};

	return (
		<Container
			maxWidth='sm'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center',
				height: '100vh',
				pb: 3,
			}}
		>
			<Box
				sx={{
					width: '100vw',
				}}
			>
				<AppBar position='static'>
					<Toolbar
					// sx={{
					// 	width: '80vw',
					// 	display: 'flex',
					// 	flexDirection: 'row',
					// 	justifyContent: 'center',
					// 	alignItems: 'center',
					// }}
					>
						<Typography
							variant='h4'
							component='div'
							sx={{ flexGrow: 1 }}
						>
							Products List
						</Typography>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleMenu}
							color='inherit'
						>
							<AccountCircleIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
							<MenuItem onClick={handleChangepassword}>
								Change Password
							</MenuItem>
							<MenuItem onClick={handleLogout}>LogOut</MenuItem>
						</Menu>
					</Toolbar>
				</AppBar>
			</Box>

			{/* For rendering products List */}
			<List
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center',
					flexWrap: 'wrap',
					width: {
						lg: '80vw',
						xs: '100vw',
					},
				}}
			>
				{products.map((each) => (
					<CardElem
						key={each.id}
						each={each}
					/>
				))}
			</List>

			{/* pagination logic */}
			<Box sx={{ mt: ' auto' }}>
				<Pagination
					count={totalPages}
					variant='outlined'
					shape='rounded'
					page={currentPage}
					onChange={handleChange}
				/>
			</Box>
		</Container>
	);
};

export default ProductsFetch;
