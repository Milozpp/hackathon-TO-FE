import React, { useState } from 'react';
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

const ServiceCatalog = ({ onCategorySelect, isChatOpen }) => {
    const [hoveredCard, setHoveredCard] = useState(null);
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
            services: ["Advisory FinOps", "Account Advisory"]
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

            </Header>

            <Grid container spacing={4} maxWidth="1200px">
                {categories.map((category) => (
                    <Grid item xs={12} md={4} key={category.id}>
                        <Box sx={{ position: 'relative' }}>
                            <CategoryCard 
                                onMouseEnter={() => setHoveredCard(category.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
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
                            {hoveredCard === category.id && (
                                <Box sx={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: 'white',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                    zIndex: 1000,
                                    minWidth: '250px',
                                    marginTop: '8px',
                                    border: `2px solid ${category.color}`
                                }}>                                    
                                    <Typography variant="body1" sx={{ 
                                        fontWeight: 600, 
                                        marginBottom: '12px',
                                        color: category.color,
                                        textAlign: 'center'
                                    }}>
                                        Services
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                                        {category.services.map((service, index) => (
                                            <Box key={index} sx={{
                                                backgroundColor: category.color,
                                                color: 'white',
                                                padding: '6px 12px',
                                                borderRadius: '8px',
                                                fontSize: '12px',
                                                fontWeight: 500
                                            }}>
                                                {service}
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                ))}
            </Grid>
            
            <Box sx={{ 
                display: 'flex', 
                gap: '48px', 
                marginTop: '48px',
                alignItems: 'flex-start',
                opacity: isChatOpen ? 0.3 : 1,
                transition: 'opacity 0.3s ease-in-out'
            }}>
                <Box 
                    onClick={() => onCategorySelect({ title: 'Amazon Bedrock', slideDirection: 'left', headerColor: '#1e3a8a' })}
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        '&:hover': { 
                            transform: 'translateY(-8px) scale(1.05)'
                        }
                    }}>
                         <Typography variant="body1" sx={{ 
                        color: colors.textPrimary,
                        fontWeight: 700,
                        textAlign: 'center'
                    }}>
                        Powered by <br /><br />
                    </Typography>
                    <img 
                        src="/bedrock.png" 
                        alt="Amazon Bedrock" 
                        style={{ 
                            width: '120px', 
                            height: '120px', 
                            marginBottom: '12px',
                            border: '3px solid #000',
                            borderRadius: '16px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                    />
                    <Typography variant="body1" sx={{ 
                        color: colors.textPrimary,
                        fontWeight: 700,
                        textAlign: 'center'
                    }}>
                        Amazon Bedrock
                    </Typography>
                </Box>
                
                <Box 
                    onClick={() => onCategorySelect({ title: 'Amazon Bedrock AgentCore', slideDirection: 'right', headerColor: '#7c3aed' })}
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        '&:hover': { 
                            transform: 'translateY(-8px) scale(1.05)'
                        }
                    }}>
                           <Typography variant="body1" sx={{ 
                        color: colors.textPrimary,
                        fontWeight: 700,
                        textAlign: 'center'
                    }}>
                        Powered by <br /><br />
                    </Typography>
                    <img 
                        src="/agentcore.png" 
                        alt="Amazon Bedrock AgentCore" 
                        style={{ 
                            width: '120px', 
                            height: '120px', 
                            marginBottom: '12px',
                            border: '3px solid #000',
                            borderRadius: '16px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                    />
                    <Typography variant="body1" sx={{ 
                        color: colors.textPrimary,
                        fontWeight: 700,
                        textAlign: 'center'
                    }}>
                        Amazon Bedrock<br />AgentCore
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default ServiceCatalog;