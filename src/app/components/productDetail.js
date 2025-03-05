import Image from 'next/image';
import React from 'react';

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
	return (
		<div>
			<h1>{title}</h1>
			<p>{description}</p>
			<p>Category: {category}</p>
			<p>Price: ${price}</p>
			<p>Discount: {discountPercentage}%</p>
			<p>Rating: {rating}</p>
			<p>Stock: {stock}</p>
			<p>Brand: {brand}</p>
			<img
				src={thumbnail}
				alt={`${id}-image`}
			/>
			<div>
				{images &&
					images.map((image, index) => (
						<img
							key={index}
							src={image}
							alt={`Product Image ${index}`}
						/>
					))}
			</div>
		</div>
	);
};

export default ProductDetails;
