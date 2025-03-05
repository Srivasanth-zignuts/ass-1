'use client';
import {
	Box,
	CardActionArea,
	CardMedia,
	Chip,
	Rating,
	Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const CardElem = ({ each }) => {
	const router = useRouter();

	const handleproduct = (id) => {
		router.replace(`/products/${id}`);
	};

	return (
		<CardActionArea
			onClick={() => handleproduct(each.id)}
			sx={{
				m: 2,
				// p: 2,
				height: { xs: 300, lg: 300 },
				width: { xs: 350, md: 350, lg: 350 },
				maxWidth: {
					xs: 300,
					lg: 350,
				},
				boxShadow: 2,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-start',
				flexGrow: 1,
				// alignItems: 'flex-start',
			}}
		>
			<CardMedia
				component='img'
				sx={{
					objectFit: 'contain',
					height: '50%',
				}}
				image={each.thumbnail}
			/>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'flex-start',
					width: '100%',
				}}
			>
				<Box
					sx={{
						// bgcolor: 'products.dark',
						width: '70%',
						// height: "auto",
						// color: 'products.light',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-start',
						p: 1,
					}}
				>
					<Typography variant='p'>{each.title}</Typography>
					<Typography
						variant='body2'
						color='products.grey'
					>
						{each.brand}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'flex-start',
							alignItems: 'center',
						}}
					>
						<Rating
							value={each.rating}
							size='small'
							readOnly
						/>
						<Typography
							variant='body1'
							paddingLeft={1}
						>
							{each.rating.toFixed(1)}
						</Typography>
					</Box>

					<Chip
						label={each.category}
						variant='outlined'
						sx={{
							width: '40%',
							marginTop: 1,
						}}
					/>
				</Box>
				<Box
					sx={{
						width: '30%',
						paddingTop: 1,
					}}
				>
					<Box
						display='flex'
						flexDirection='column'
						justifyContent='center'
						alignItems='center'
						paddingRight={1}
					>
						<Typography
							variant='h6'
							sx={{ fontWeight: 'bold' }}
						>
							${(each.price * (1 - each.discountPercentage / 100)).toFixed(2)}
						</Typography>
						<Box
							display='flex'
							flexDirection='row'
							justifyContent='center'
							alignItems='center'
						>
							{each.discountPercentage > 0 && (
								<Typography
									variant='p'
									sx={{ textDecoration: 'line-through' }}
								>
									{each.price}
								</Typography>
							)}
							<Chip
								label={`${each.discountPercentage.toFixed(0)}%`}
								size='small'
								color='error'
								sx={{ ml: 1 }}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</CardActionArea>
	);
};

export default CardElem;
