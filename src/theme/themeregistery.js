'use client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import theme from './theme';

const ThemeRegestiary = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline>{children}</CssBaseline>
		</ThemeProvider>
	);
};

export default ThemeRegestiary;
