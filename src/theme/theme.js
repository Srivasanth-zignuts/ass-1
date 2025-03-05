'use client';
import { createTheme } from '@mui/material';

const theme = createTheme({
	// breakpoints: {
	// 	values: {
	// 		xs: 575,
	// 		sm: 767,
	// 		md: 991,
	// 		lg: 1199,
	// 		xl: 1920,
	// 	},
	// },
	palette: {
		products: {
			dark: '#000000',
			light: '#fff',
			grey: '#808080'
		},
	},
});

export default theme;
