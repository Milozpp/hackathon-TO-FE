// import { axios } from 'axios';
import React, { useState, useEffect, useRef } from "react";
import { border, styled, width } from "@mui/system";
import { AppBar, Toolbar, Typography, Avatar, TextField, Button, Box, Paper, List, ListItem, ListItemText, Divider, IconButton, Icon } from "@mui/material";
import { FaPaperPlane, FaEllipsisV, FaBars, FaTimes, FaUnderline } from "react-icons/fa";
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import axios from "axios";
import ReactMarkdown from 'react-markdown';

import config from '../config'

const ChatContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "90%",
    border: "1px solid #ccc",
    borderRadius: "4px"
}));

const ChatAreaContainer = styled(Box)(({ theme, isSidebarVisible }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    borderRadius: "4px",
    position: "relative",
    backgroundColor: "#e2e2e2"
}));

const SidebarIcons = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(1),
}));

const Sidebar = styled(Paper)(({ theme, visible }) => ({
    width: visible ? "15%" : "0",
    transition: "width 0.3s ease",
    padding: visible ? theme.spacing(2) : "0",
    backgroundColor: "#f0f0f0"
}));

const ChatMessagesContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    padding: theme.spacing(2),
    paddingTop: theme.spacing(5),
    overflow: "hidden"

}));

//Paper
const ChatArea = styled(Box)(({ theme }) => ({
    flex: 1,
    overflowY: "auto",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    width: '70%',
    maxHeight: '100%',
}));

// const MessageItem = styled(ListItem)(({ theme, isUser }) => ({
//     justifyContent: isUser ? "flex-end" : "flex-start",
//     alignItems: "flex-start",
//     padding: theme.spacing(1, 2),
//     wordWrap: "break-word",
//     wordBreak: "break-word",
// }));

const MessageItem = styled(ListItem)(({ theme, isUser }) => ({
    justifyContent: "flex-start",
    alignItems: "flex-start",

    wordWrap: "break-word",
    wordBreak: "break-word",
    flexDirection: isUser ? 'row-reverse' : 'row',
}));

const MessageBubble = styled(Paper)(({ theme, isUser }) => ({
    padding: theme.spacing(0, 1),
    //backgroundColor: isUser ? "transparent" : "transparent",
    borderRadius: 8,
    maxWidth: isUser ? "50%" : "80%",
    color: "black",
    backgroundColor: "white"
}));

// const MessageBubble = styled(Box)(({ theme, isUser }) => ({
//     padding: theme.spacing(1, 2),
//     backgroundColor: isUser ? "#FFFFFF" : "transparent",
//     borderRadius: 8,
//     maxWidth: isUser ? "50%" : "80%",
//     color: isUser? "black" : "black",
//     border: isUser ? "none" : "none",
// }));

const ChatInputAreaContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}))

const InputArea = styled(Box)(({ theme }) => ({
    display: "flex",
    padding: theme.spacing(2),
    width: '70%',
    alignItems: 'center' //flex-end' 
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    flex: 1,
    marginRight: theme.spacing(2),
    wordWrap: "break-word",
    wordBreak: "break-word",
   "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
            borderColor: "#3b8983", 
        },
        "&.Mui-focused fieldset": {
            borderColor: "#3b8983", 
        },
    },

}));

const SendButton = styled(Button)(({ theme }) => ({
    minWidth: "48px",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#3b8983",
    color: "white",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    "&:hover": {
        backgroundColor: "#3b8983"
    },
    ".MuiButton-endIcon": {
        margin: 0
    }
}));

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([
        { id: 1, title: "VPN resolution problem" },
        { id: 2, title: "Opening ticket" },
        { id: 3, title: "Reporting an issue" }
    ]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const chatAreaRef = useRef(null);
    const sessionId = useRef(null);
    const [isLoading, setIsLoading] = useState(false); // Stato per il caricamento

    useEffect(() => {
        if (!sessionId.current) {
            sessionId.current = Math.floor(100000 + Math.random() * 900000);
            const newMessage = {
                id: Date.now(),
                text: "Hello, I'm Fixy, your IT virtual assistant. Let's discuss your issue.",
                isUser: false,
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
    }, []);

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            const newMessage = {
                id: Date.now(),
                text: inputMessage,
                isUser: true,
            };

            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInputMessage("");
            scrollToBottom();

            const loadingMessage = {
                id: Date.now() + 1,
                text: "...",
                isUser: false,
                isLoading: true
            };
            setMessages((prevMessages) => [...prevMessages, loadingMessage]);

            setIsLoading(true); 

            try {
                const response = await axios.post(`${config.url_integration}/test/invoke_agent`, {
                    input_text: inputMessage,
                    session_id: String(sessionId.current)
                });

                console.log("Response from agent:", response);

                // Verifica la struttura della risposta
                const agentMessage = {
                    id: Date.now(),
                    text: response?.data?.completion || "Sorry, I didn't understand that.",
                    isUser: false,
                    isLoading: false 
                };

                setMessages((prevMessages) => {
                    const messagesWithoutLoading = prevMessages.filter(
                        (message) => !message.isLoading
                    );
                    return [...messagesWithoutLoading, agentMessage];
                });

                setIsLoading(false); 
                scrollToBottom();
            } catch (error) {
                console.error("Error sending message:", error);
                const errorMessage = {
                    id: Date.now(),
                    text: "Oops, something went wrong. Please try again later.",
                    isUser: false,
                };
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
                scrollToBottom();
            }
        }
    };

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    const scrollToBottom = () => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    };

    const loadChatHistory = (chatId) => {
        setMessages([{ id: Date.now(), text: `Loaded ${chatId}`, isUser: false }]);
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleToggleSidebar = () => {
        isSidebarVisible ? setIsSidebarVisible(false) : setIsSidebarVisible(true)
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
            <ChatContainer>
                <Sidebar visible={isSidebarVisible}>
                    {isSidebarVisible &&
                        <div style={{
                            display: 'flex',
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <IconButton
                                color="inherit"
                                aria-label="toggle drawer"
                                onClick={handleToggleSidebar}
                                edge="start"
                                sx={{ width: 'auto' }}
                            >
                                <ViewSidebarIcon />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                aria-label="edit"
                                onClick={handleToggleSidebar}
                                edge="start"
                                sx={{ width: 'auto' }}
                            >
                                <EditNoteIcon />
                            </IconButton>
                        </div>}

                    {isSidebarVisible &&
                        <List>
                            {chatHistory.map((chat) => (
                                <ListItem button key={chat.id} onClick={() => loadChatHistory(chat.title)}>
                                    <ListItemText primary={chat.title} />
                                </ListItem>
                            ))}
                        </List>}
                </Sidebar>

                {/* Main Chat Area */}
                <ChatAreaContainer>
                    {!isSidebarVisible && (
                        <SidebarIcons>
                            <IconButton
                                color="inherit"
                                aria-label="toggle drawer"
                                onClick={handleToggleSidebar}
                                edge="start"
                            >
                                <ViewSidebarIcon />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                aria-label="edit"
                                onClick={handleToggleSidebar}
                                edge="start"
                            >
                                <EditNoteIcon />
                            </IconButton>
                        </SidebarIcons>
                    )}
                    <ChatMessagesContainer>
                        <ChatArea ref={chatAreaRef}>
                            <List>
                                {messages.map((message) => (
                                    <MessageItem key={message.id} isUser={message.isUser}>
                                        <Box sx={[message.isUser ? { ml: 1 } : { mr: 1 }]}>
                                            {!message.isUser ? <SmartToyOutlinedIcon /> : <Person2OutlinedIcon />}
                                        </Box>
                                        <MessageBubble isUser={message.isUser}>
                                            <ReactMarkdown>{message.text}</ReactMarkdown>
                                        </MessageBubble>
                                    </MessageItem>
                                ))}
                            </List>
                        </ChatArea>
                    </ChatMessagesContainer>
                    <ChatInputAreaContainer>
                        <InputArea>
                            <StyledTextField
                                variant="outlined"
                                placeholder="Type a message..."
                                value={inputMessage}
                                onChange={handleInputChange}
                                onKeyUp={(e) => e.key === "Enter" && handleSendMessage()}
                                multiline
                                minRows={1}
                                maxRows={5}
                            />
                            <SendButton
                                variant="contained"
                                endIcon={<FaPaperPlane />}
                                onClick={handleSendMessage}
                            />
                        </InputArea>
                    </ChatInputAreaContainer>
                </ChatAreaContainer>
            </ChatContainer>
        </>
    );
};

export default ChatInterface;
