'use client';
import ProductDetails from '@/app/components/productDetail';
import { CircularProgress, Container } from '@mui/material';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Productpage = () => {
	const router = useRouter();
	const [product, setProduct] = useState(null);
	const params = useParams();
	const { id } = params;

	useEffect(() => {
		const user = localStorage.getItem('currentUser');
		if (!user) {
			router.push('/login');
		}
		const fetchProduct = async () => {
			const response = await axios.get(`https://dummyjson.com/products/${id}`);
			// console.log(response.data);
			setProduct(response.data);
		};

		fetchProduct();
	}, [id, router]);

	console.log(product);
	if (!product) {
		return (
			<Container
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<CircularProgress />
			</Container>
		);
	}

	return (
		<Container
			maxWidth='lg'
			sx={{ py: 4 }}
		>
			{/* redirect to Productdetails  */}
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
				dimensions={product.dimensions}
				warrantyInformation={product.warrantyInformation}
				shippingInformation={product.shippingInformation}
				reviews={product.reviews}
				returnPolicy={product.returnPolicy}
				minimumOrderQuantity={product.minimumOrderQuantity}
				tags={product.tags}
			/>
		</Container>
	);
};

export default Productpage;
