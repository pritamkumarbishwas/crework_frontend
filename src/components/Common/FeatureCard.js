import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const features = [
    {
        icon: 'assets/tag.png', // Replace with the actual path to your image
        title: 'Introducing tags',
        description: 'Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.',
    },
    {
        icon: 'assets/share.png', // Replace with the actual path to your image
        title: 'Share Notes Instantly',
        description: 'Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.',
    },
    {
        icon: 'assets/access.png', // Replace with the actual path to your image
        title: 'Access Anywhere',
        description: 'Sync your notes across all devices. Stay productive whether you’re on your phone, tablet, or computer.',
    },
];

const PaperStyled = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    color: theme.palette.text.secondary,
    minHeight: 120,
}));

const IconBox = styled(Box)(({ theme }) => ({
    marginRight: theme.spacing(2),
}));

const FeatureCard = ({ icon, title, description }) => (
    <Grid item xs={12} sm={6} md={4}>
        <PaperStyled>
            <IconBox>
                <img src={icon} alt={title} style={{ width: 50, height: 50 }} /> {/* Adjust the size as needed */}
            </IconBox>
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{title}</Typography>
                <Typography variant="body2">{description}</Typography>
            </Box>
        </PaperStyled>
    </Grid>
);

const FeatureSection = () => (
    <Container sx={{ mt: 1 }}>
        <Grid container spacing={2}>
            {features.map((feature, index) => (
                <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                />
            ))}
        </Grid>
    </Container>
);

export default FeatureSection;
