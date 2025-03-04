'use client';
import { Card, Container, List, Pagination, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProductsFetch = () => {
	const [totalPages, setTotalpages] = useState(1);
	const [currentPage, setcurrentPage] = useState(1);
	const [products, setproducts] = useState([]);
	// const [skip, setSkip] = useState(0);
	const limit = 8;

	useEffect(() => {
		const fetchdata = async () => {
			try {
				const skip = (currentPage - 1) * limit;
				const response = await axios.get(
					`https://dummyjson.com/products?limit=${limit}&skip=${skip}`
				);
				console.log(response.data.products);
				setproducts(response.data.products);
				setTotalpages(Math.ceil(response.data.total / limit));
			} catch (e) {
				console.log(error);
			}
		};

		fetchdata();
	}, [currentPage]);

	// console.log(totalPages);

	const handleChange = (events, value) => {
		setcurrentPage(value);
	};

	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Typography variant='h3'> Products List</Typography>
			<List
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center',
					flexWrap: 'wrap',
				}}
			>
				{products.map((each) => (
					<Card
						key={each.id}
						sx={{
							m: 2,
							p: 2,
							height: 250,
							width: 250,
						}}
					>
						{each.title}
					</Card>
				))}
			</List>
			<Pagination
				count={totalPages}
				variant='outlined'
				shape='rounded'
				// defaultPage={1}
				page={currentPage}
				onChange={handleChange}
			/>
		</Container>
	);
};

export default ProductsFetch;
