import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip } from '@mui/material';
import { styled } from '@mui/system';

const colors = {
    primary: '#2d5a4a',
    secondary: '#2c3e50',
    background: '#f8f9fa',
    cardBg: '#f1f3f4',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    border: '#d1d5db'
};

const Container = styled(Box)({
    backgroundColor: 'transparent',
    padding: '0 24px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
});

const Header = styled(Box)({
    textAlign: 'center',
    marginBottom: '48px'
});

const CategoryCard = styled(Card)({
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: colors.cardBg,
    border: `2px solid ${colors.border}`,
    borderRadius: '16px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
        borderColor: colors.primary
    }
});

const CategoryIcon = styled(Box)({
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    marginTop: '16px',
    fontSize: '32px',
    color: 'white',
    lineHeight: 1,
    textAlign: 'center'
});

const ServiceCatalog = ({ onCategorySelect }) => {
    const categories = [
        {
            id: 1,
            title: "Agent RAG",
            description: "Knowledge base and documentation services",
            icon: "📚",
            color: "#2d5a4a",
            services: ["Foundations", "DevOps Practice", "Application Guidelines"]
        },
        {
            id: 2,
            title: "Agent Execute",
            description: "Automated execution and deployment services",
            icon: "⚡",
            color: "#3b82f6",
            services: ["Compute", "SMTP", "Event Notification", "Connectivity", "IAM", "Instance Scheduler", "Cost Optimization", "Config Remediation", "Account Creation"]
        },
        {
            id: 3,
            title: "Agent Advisory",
            description: "Account guidance and cost optimization",
            icon: "💡",
            color: "#f59e0b",
            services: ["Advisory FinOps", "Event History"]
        }
    ];

    return (
        <Container>
            <Header>
                <Typography variant="h3" sx={{ 
                    fontWeight: 700, 
                    color: colors.textPrimary, 
                    marginBottom: '16px' 
                }}>
                    Service Catalog
                </Typography>
                <Typography variant="h6" sx={{ 
                    color: colors.textSecondary, 
                    maxWidth: '600px',
                    lineHeight: 1.6
                }}>
                    Choose a service category to get started with our AI-powered virtual assistant
                </Typography>
            </Header>

            <Grid container spacing={4} maxWidth="1200px">
                {categories.map((category) => (
                    <Grid item xs={12} md={4} key={category.id}>
                        <CategoryCard onClick={() => onCategorySelect(category)}>
                            <CategoryIcon sx={{ backgroundColor: category.color }}>
                                {category.icon}
                            </CategoryIcon>
                            <CardContent sx={{ padding: '0 24px' }}>
                                <Typography variant="h5" sx={{ 
                                    fontWeight: 600, 
                                    color: colors.textPrimary,
                                    marginBottom: '8px'
                                }}>
                                    {category.title}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                    color: colors.textSecondary,
                                    marginBottom: '16px',
                                    lineHeight: 0
                                }}>
                                    {category.description}
                                </Typography>
                                <Chip 
                                    label={`${category.services.length} services`}
                                    size="small"
                                    sx={{ 
                                        backgroundColor: category.color,
                                        color: '#f8f9fa',
                                        fontWeight: 500
                                    }}
                                />
                            </CardContent>
                        </CategoryCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ServiceCatalog;