'use client';
import ProductDetails from '@/app/components/productDetail';
import { Container } from '@mui/material';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Productpage = () => {
	const [product, setProduct] = useState(null);
	const params = useParams();
	const { id } = params;

	useEffect(() => {
		const fetchProduct = async () => {
			const response = await axios.get(`https://dummyjson.com/products/${id}`);
			// console.log(response.data);
			setProduct(response.data);
		};

		fetchProduct();
	}, [id]);

	console.log(product);
	if (!product) {
		return <Container maxWidth='xs'> Loading...</Container>;
	}

	return (
		<Container
			maxWidth='lg'
			sx={{ py: 4 }}
		>
			<ProductDetails
				id={product.id}
				thumbnail={product.thumbnail}
				brand={product.brand}
				title={product.title}
				description={product.description}
				category={product.category}
				price={product.price}
				discountPercentage={product.discountPercentage}
				rating={product.rating}
				stock={product.stock}
				images={product.images}
			/>
		</Container>
	);
};

export default Productpage;
