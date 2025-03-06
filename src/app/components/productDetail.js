import { ArrowBack, FavoriteRounded, ShoppingCart } from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	CardMedia,
	Chip,
	Container,
	Divider,
	Grid,
	IconButton,
	Rating,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ProductDetails = ({
	title,
	description,
	category,
	price,
	discountPercentage,
	rating,
	stock,
	images,
	thumbnail,
	id,
	brand,
}) => {
	const router = useRouter();
	const [selectedImage, setSelectedImage] = useState(images[0]);

	return (
		<Container>
			<Button
				startIcon={<ArrowBack />}
				onClick={() => router.push('/products')}
				sx={{
					mb: 2,
				}}
				variant='contained'
				color='primary'
			>
				Back to Products page
			</Button>
			<Grid
				container
				spacing={4}
				marginTop={1}
			>
				<Card
					sx={{
						mb: 2,
						boxShadow: 3,
					}}
				>
					<CardMedia
						component='img'
						image={selectedImage}
						alt={title}
						sx={{
							height: { xs: 250, sm: 350, md: 450 },
							width: { xs: 250, sm: 350, md: 450 },
							objectFit: 'contain',
						}}
					/>
				</Card>
				<Box
					sx={{
						display: 'flex',
						gap: 1,
						overflowX: 'auto',
						pb: 1,
						'&::-webkit-scrollbar': { height: 4 },
					}}
				>
					{images.map((image, index) => (
						<Card
							key={index}
							onClick={() => setSelectedImage(image)}
							sx={{
								minWidth: 110,
								height: 110,
								cursor: 'pointer',
								border: selectedImage === image ? '2px solid #1976d2' : 'none',
								boxShadow: selectedImage === image ? 3 : 1,
								transition: 'all 0.2s',
							}}
						>
							<CardMedia
								component='img'
								image={image}
								alt={`Thumbnail ${index}`}
								sx={{ height: 100, objectFit: 'cover' }}
							/>
						</Card>
					))}
				</Box>

				<Grid
					item
					xs={12}
					md={6}
				>
					<Typography
						variant='h4'
						fontWeight='bold'
						gutterBottom
					>
						{title}
					</Typography>
					<Box
						display='flex'
						alignItems='center'
						mb={1}
					>
						<Rating
							value={rating || 0}
							readOnly
							size='small'
							precision={0.1}
						/>
						<Typography
							variant='body2'
							color='text.secondary'
							sx={{ ml: 1 }}
						>
							{rating?.toFixed(1)}
						</Typography>
					</Box>

					<Box mb={3}>
						<Box
							display='flex'
							alignItems='baseline'
						>
							<Typography
								variant='h6'
								fontWeight='bold'
							>
								$ {(price * (1 - discountPercentage / 100)).toFixed(2)}
							</Typography>
							{discountPercentage > 0 && (
								<Typography
									variant='h6'
									sx={{ ml: 2, textDecoration: 'line-through' }}
								>
									${price.toFixed(2)}
								</Typography>
							)}
							<Chip
								label={`${discountPercentage.toFixed(0)}% Off`}
								size='small'
								color='error'
								sx={{ ml: 2 }}
							/>
						</Box>
						<Typography
							variant='body2'
							color='textSecondary'
						>
							{stock > 0 ? 'In stock' : 'Out of Stock'}
						</Typography>
					</Box>
					<Box
						display='flex'
						mt={4}
						gap={4}
					>
						<Button
							variant='contained'
							size='large'
							startIcon={<ShoppingCart />}
							disabled={stock <= 0}
							color='primary'
						>
							Add to Cart
						</Button>
						<IconButton
							color='error'
							sx={{ border: '1px solid' }}
						>
							<FavoriteRounded />
						</IconButton>
					</Box>
					<Divider sx={{ my: 3 }} />
				</Grid>
			</Grid>
		</Container>
	);
};

export default ProductDetails;
