import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/system";
import { Typography, TextField, Button, Box, Paper, IconButton, Collapse, Chip } from "@mui/material";
import { FaPaperPlane } from "react-icons/fa";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import config from '../config';
import { useAuth } from '../contexts/AuthContext';

// ServiceNow Color Palette
const colors = {
    primary: '#2d5a4a',
    secondary: '#2c3e50',
    background: '#f5f5f5',
    sidebarBg: '#1f2937',
    sidebarHover: '#374151',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    userMessage: '#2d5a4a',
    botMessage: '#f8f9fa'
};

const Container = styled(Box)({
    display: 'flex',
    height: '100%',
    backgroundColor: '#ffffff',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    borderRadius: '16px',
    overflow: 'hidden'
});

const Sidebar = styled(Box)(({ visible }) => ({
    width: visible ? '280px' : '0',
    backgroundColor: '#2d5a4a',
    transition: 'width 0.3s ease',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    borderLeft: `1px solid ${colors.border}`
}));

const SidebarHeader = styled(Box)({
    padding: '16px',
    borderBottom: `1px solid ${colors.sidebarHover}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
});

const SidebarContent = styled(Box)({
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    '&::-webkit-scrollbar': {
        width: '6px'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: colors.sidebarHover,
        borderRadius: '3px'
    }
});

const CategoryItem = styled(Box)({
    marginBottom: '8px'
});

const CategoryHeader = styled(Box)({
    padding: '12px 16px',
    backgroundColor: colors.sidebarHover,
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#f3f4f6',
    fontWeight: 600,
    fontSize: '14px',
    transition: 'background-color 0.2s',
    '&:hover': {
        backgroundColor: '#4b5563'
    }
});

const ServiceButton = styled(Box)({
    padding: '12px 16px',
    margin: '4px 8px',
    color: '#d1d5db',
    fontSize: '13px',
    cursor: 'pointer',
    borderRadius: '8px',
    border: '1px solid #ffffff',
    backgroundColor: 'transparent',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    '&:hover': {
        backgroundColor: '#2d5a4a',
        color: 'white',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(45, 90, 74, 0.3)'
    },
    '&:active': {
        transform: 'translateY(0px) scale(0.95)',
        transition: 'all 0.1s ease'
    }
});

const MainContent = styled(Box)({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.background
});

const Header = styled(Box)({
    padding: '16px 24px',
    backgroundColor: '#f1f3f4',
    borderBottom: `1px solid ${colors.border}`,
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
});

const ChatArea = styled(Box)({
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    '&::-webkit-scrollbar': {
        width: '8px'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#d1d5db',
        borderRadius: '4px'
    }
});

const MessageRow = styled(Box)(({ isUser }) => ({
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    flexDirection: isUser ? 'row-reverse' : 'row'
}));

const Avatar = styled(Box)(({ isUser }) => ({
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: isUser ? colors.primary : colors.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    flexShrink: 0
}));

const MessageBubble = styled(Paper)(({ isUser }) => ({
    padding: '12px 16px',
    maxWidth: '70%',
    backgroundColor: isUser ? colors.userMessage : colors.botMessage,
    color: isUser ? 'white' : colors.textPrimary,
    borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    wordWrap: 'break-word'
}));

const InputContainer = styled(Box)({
    padding: '16px 24px',
    backgroundColor: '#f1f3f4',
    borderTop: `1px solid ${colors.border}`,
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
});

const StyledInput = styled(TextField)({
    flex: 1,
    '& .MuiOutlinedInput-root': {
        borderRadius: '24px',
        backgroundColor: colors.background,
        '& fieldset': {
            borderColor: colors.border
        },
        '&:hover fieldset': {
            borderColor: colors.primary
        },
        '&.Mui-focused fieldset': {
            borderColor: colors.primary
        }
    }
});

const SendBtn = styled(Button)({
    minWidth: '48px',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: colors.primary,
    color: 'white',
    '&:hover': {
        backgroundColor: '#1e3d33'
    }
});

const SearchInput = styled(TextField)({
    marginBottom: '16px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        backgroundColor: colors.sidebarHover,
        color: '#f3f4f6',
        '& fieldset': {
            borderColor: 'transparent'
        },
        '&:hover fieldset': {
            borderColor: colors.primary
        },
        '&.Mui-focused fieldset': {
            borderColor: colors.primary
        }
    },
    '& .MuiInputBase-input': {
        color: '#f3f4f6',
        '&::placeholder': {
            color: '#9ca3af',
            opacity: 1
        }
    }
});

const ChatInterface = ({ selectedCategory }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const chatAreaRef = useRef(null);
    const sessionId = useRef(null);

    const [categories, setCategories] = useState([
        {
            id: 1,
            title: "Agent RAG",
            expanded: true,
            items: [
                { id: 1, title: "Foundations" },
                { id: 2, title: "DevOps Practice" },
                { id: 3, title: "Application Guidelines" },
            ]
        },
        {
            id: 2,
            title: "Agent Execute",
            expanded: false,
            items: [
                { id: 4, title: "Compute" },
                { id: 5, title: "SMTP" },
                { id: 6, title: "Event Notification" },
                { id: 7, title: "Connectivity" },
                { id: 8, title: "IAM" },
                { id: 9, title: "Instance Scheduler" },
                { id: 10, title: "Cost Optimization" },
                { id: 11, title: "Config Remediation" },
                { id: 12, title: "Account Creation" }
            ]
        },
        {
            id: 3,
            title: "Agent Advisory",
            expanded: false,
            items: [
                { id: 13, title: "Advisory FinOps" },
                { id: 14, title: "Event History" }
            ]
        }
    ]);

    useEffect(() => {
        if (!sessionId.current) {
            sessionId.current = Math.floor(100000 + Math.random() * 900000);
        }
        
        const welcomeMessage = selectedCategory 
            ? `Hello! I'm Fixy, your IT virtual assistant for ${selectedCategory.title}. How can I help you today?`
            : "Hello! I'm Fixy, your IT virtual assistant. How can I help you today?";
            
        setMessages([{
            id: Date.now(),
            text: welcomeMessage,
            isUser: false
        }]);
    }, [selectedCategory]);

    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const newMessage = { id: Date.now(), text: inputMessage, isUser: true };
        setMessages(prev => [...prev, newMessage]);
        setInputMessage("");

        const loadingMsg = { id: Date.now() + 1, text: "Typing...", isUser: false, isLoading: true };
        setMessages(prev => [...prev, loadingMsg]);

        try {
            // Get JWT token from current user session
            const getToken = () => {
                return new Promise((resolve, reject) => {
                    if (user) {
                        user.getSession((err, session) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            const token = session.getIdToken().getJwtToken();
                            resolve(token);
                        });
                    } else {
                        reject(new Error('No user session'));
                    }
                });
            };

            const token = await getToken();
            console.log('JWT Token:', token);
            
            console.log('Sending API request to:', `${config.url_integration}/test/invoke_agent`);
            console.log('Request payload:', {
                input_text: inputMessage,
                session_id: String(sessionId.current)
            });

            const response = await axios.post(`${config.url_integration}/test/invoke_agent`, {
                input_text: inputMessage,
                session_id: String(sessionId.current)
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('API response:', response);
            console.log('Response data:', response.data);

            setMessages(prev => prev.filter(m => !m.isLoading).concat({
                id: Date.now(),
                text: response?.data?.completion || "Sorry, I didn't understand that.",
                isUser: false
            }));
        } catch (error) {
            console.error("Full error object:", error);
            console.error("Error message:", error.message);
            console.error("Error response:", error.response);
            console.error("Error response data:", error.response?.data);
            console.error("Error response status:", error.response?.status);
            console.error("Error response headers:", error.response?.headers);
            
            setMessages(prev => prev.filter(m => !m.isLoading).concat({
                id: Date.now(),
                text: `Error: ${error.response?.data?.message || error.message || 'Something went wrong. Please try again.'}`,
                isUser: false
            }));
        }
    };

    const handleCategoryToggle = (categoryId) => {
        setCategories(categories.map(cat =>
            cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat
        ));
    };

    const handleSubItemClick = (item) => {
        setInputMessage(`Tell me about ${item.title}`);
    };

    const filteredCategories = categories
        .filter(cat => !selectedCategory || cat.title === selectedCategory.title)
        .map(cat => ({
            ...cat,
            items: cat.items.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        })).filter(cat => cat.items.length > 0 || searchTerm === "");

    return (
        <Container sx={{ marginTop: 0, height: 'calc(100vh - 140px)' }}>
            <MainContent>
                <Header>
                    <Typography variant="h6" sx={{ color: colors.textPrimary, fontWeight: 600 }}>
                        IT Virtual Assistant
                    </Typography>
                    <Chip label="Online" size="small" sx={{ backgroundColor: '#2d5a4a', color: 'white' }} />
                </Header>

                <ChatArea ref={chatAreaRef}>
                    {messages.map(message => (
                        <MessageRow key={message.id} isUser={message.isUser}>
                            <Avatar isUser={message.isUser}>
                                {message.isUser ? <PersonIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
                            </Avatar>
                            <MessageBubble isUser={message.isUser}>
                                <ReactMarkdown>{message.text}</ReactMarkdown>
                            </MessageBubble>
                        </MessageRow>
                    ))}
                </ChatArea>

                <InputContainer>
                    <StyledInput
                        placeholder="Type your message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        multiline
                        maxRows={4}
                    />
                    <SendBtn onClick={handleSendMessage}>
                        <FaPaperPlane />
                    </SendBtn>
                </InputContainer>
            </MainContent>

            <Sidebar visible={isSidebarVisible}>
                <SidebarHeader >
                    <Typography variant="h6" sx={{ color: '#f3f4f6', fontWeight: 600, fontSize: '16px' }}>
                        {selectedCategory ? selectedCategory.title : 'Service Catalog'}
                    </Typography>
                </SidebarHeader>
                <SidebarContent>
                    {filteredCategories.map(category => (
                        category.items.map(item => (
                            <ServiceButton key={item.id} onClick={() => handleSubItemClick(item)}>
                                {item.title}
                            </ServiceButton>
                        ))
                    ))}
                </SidebarContent>
            </Sidebar>
        </Container>
    );
};

export default ChatInterface;
