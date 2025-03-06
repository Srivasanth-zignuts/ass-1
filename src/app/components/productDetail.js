import { ArrowBack, FavoriteRounded, ShoppingCart } from '@mui/icons-material';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Chip,
	Container,
	Divider,
	Fab,
	Grid2,
	Rating,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import InventoryIcon from '@mui/icons-material/Inventory';
import HeightIcon from '@mui/icons-material/Height';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import SyncIcon from '@mui/icons-material/Sync';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ProductionQuantityLimitsSharpIcon from '@mui/icons-material/ProductionQuantityLimitsSharp';
import dayjs from 'dayjs';

const ProductDetails = ({
	title,
	price,
	discountPercentage,
	rating,
	stock,
	images,
	description,
	category,
	brand,
	dimensions,
	warrantyInformation,
	shippingInformation,
	reviews,
	tags,
	returnPolicy,
	minimumOrderQuantity,
}) => {
	const router = useRouter();
	const [selectedImage, setSelectedImage] = useState(images[0]);

	return (
		<Container>
			{/* Back Button */}
			<Button
				startIcon={<ArrowBack />}
				onClick={() => router.push('/products')}
				sx={{
					mb: 2,
					mt: ' auto',
				}}
				position='sticky'
				variant='contained'
				color='primary'
			>
				Back to Products page
			</Button>

			<Grid2
				container
				spacing={4}
				// marginTop={1}
			>
				{/* Main Image Container */}
				<Card
					sx={{
						mb: 2,
						boxShadow: 3,
						mr: 2,
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

				{/* Images Container */}
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

				<Grid2
					item
					xs={12}
					md={6}
				>
					{/* Tags Element */}
					<Box>
						<Box
							sx={{
								pl: 1,
								pb: 0.5,
							}}
						>
							{tags.map((e, i) => (
								<Typography
									variant='p'
									key={i}
									sx={{
										pl: 0.5,
									}}
								>
									#{e}{' '}
								</Typography>
							))}
						</Box>
					</Box>

					{/* Chip elements */}
					<Box
						sx={{
							mb: 1,
						}}
					>
						<Chip
							label={brand}
							size='medium'
							avatar={<Avatar>{brand.charAt(0)}</Avatar>}
							sx={{
								mr: 1,
							}}
						/>
						<Chip
							label={category}
							size='medium'
							variant='outlined'
						/>
					</Box>

					{/* Title Container */}
					<Typography
						variant='h4'
						fontWeight='bold'
						gutterBottom
					>
						{title}
					</Typography>

					{/* Ratings container */}
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

					{/* Price Container */}
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

					{/* Dimensions, Warrenty, return Policy Container */}
					<Box>
						<Typography variant='p'>{description}</Typography>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'flex-start',
								alignItems: 'center',
								gap: 2,
							}}
						>
							<Box>
								<Box
									sx={{
										mr: 1,
										mt: 2,
										ml: 1,
									}}
								>
									<InventoryIcon />
									<HeightIcon />
									<Typography
										variant='p'
										sx={{
											fontSize: 15,
										}}
										color='products.grey'
									>
										{dimensions.height}
									</Typography>
								</Box>
								<Box
									sx={{
										ml: 0.5,
									}}
								>
									<Typography
										variant='p'
										color='products.grey'
										sx={{
											fontSize: 15,
										}}
									>
										{dimensions.width}
									</Typography>
								</Box>
							</Box>
							<Box>
								<DoneOutlineIcon />
								<Typography
									variant='p'
									color='products.grey'
									sx={{
										fontSize: 15,
										ml: 1,
									}}
								>
									{warrantyInformation}
								</Typography>
							</Box>
							<Box>
								<SyncIcon />
								<Typography
									variant='p'
									color='products.grey'
									sx={{
										fontSize: 15,
										ml: 0.5,
									}}
								>
									{returnPolicy}
								</Typography>
							</Box>
						</Box>
					</Box>

					{/* Minimum Order and Shipping Container */}
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'flex-start',
							alignItems: 'center',
							gap: 2,
							mt: 2,
							ml: 1,
						}}
					>
						<Box>
							<LocalShippingIcon />
							<Typography
								variant='p'
								color='products.grey'
								sx={{
									fontSize: 15,
									ml: 1,
								}}
							>
								{shippingInformation}
							</Typography>
						</Box>
						<Box>
							<ProductionQuantityLimitsSharpIcon />
							<Typography
								variant='p'
								color='products.grey'
								sx={{
									fontSize: 15,
									ml: 0.5,
								}}
							>
								Minimum Order Quantity : {minimumOrderQuantity}
							</Typography>
						</Box>
					</Box>

					{/* <Divider sx={{ my: 3 }} /> */}
					{/* Add to cart container */}
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
						<Fab
							color='error'
							aria-label='like'
						>
							<FavoriteRounded />
						</Fab>
					</Box>

					<Divider sx={{ my: 3 }} />
					{/* Reviews Cards */}
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'flex-start',
							gap: 2,
							flexWrap: 'wrap',
						}}
					>
						{reviews.map((r, i) => (
							<Card
								sx={{ maxWidth: 300 }}
								key={i}
							>
								<CardHeader
									avatar={<Avatar>{r.reviewerName.charAt(0)}</Avatar>}
									title={r.reviewerName}
									subheader={dayjs(r.date).format('MMMM D, YYYY')}
								/>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'flex-start',
										alignItems: 'center',
									}}
								>
									<Rating
										value={r.rating || 0}
										readOnly
										size='small'
										precision={0.1}
										sx={{
											pl: 1.5,
										}}
									/>
									<Typography
										variant='body2'
										color='text.secondary'
										sx={{ ml: 1 }}
									>
										{r.rating}/5
									</Typography>
								</Box>
								<CardContent>
									<Typography
										variant='body2'
										sx={{ color: 'text.secondary' }}
									>
										{r.comment}
									</Typography>
								</CardContent>
							</Card>
						))}
					</Box>
					
				</Grid2>
			</Grid2>
		</Container>
	);
};

export default ProductDetails;
