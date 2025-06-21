import React, { useState } from 'react';
import './index.css';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import ChatMessage from './chatMessage';
import { analyze } from './utils';

function ChatBot() {
    const [isVisible, setIsVisible] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: 'Hi, may I have your name?',
        },
    ]);
    const [text, setText] = useState('');

    const onSend = () => {
        let list = [...messages, { message: text, user: true }];
        if (list.length > 2) {
            const reply = analyze(text);
            list = [...messages, { message: reply }];
        } else {
            list = [
                ...list,
                {
                    message: `Hi, ${text}!`,
                },
                {
                    message: 'How can I help you?',
                },
            ];
        }
        setMessages(list);
        setText('');
        setTimeout(() => {
            const copyrightElement = document.querySelector('#copyright');
            if (copyrightElement) {
                copyrightElement.scrollIntoView();
            }
        }, 100);
    };

    const toggleChatBot = () => {
        setIsVisible(!isVisible);
    };

    return (
        <Container>
            <Row className='d-flex align-items-center justify-content-center'>
                <Col>
                    <Button onClick={toggleChatBot} variant='primary'>
                        Open ChatBot
                    </Button>
                </Col>
            </Row>
            {isVisible && (
                <Row>
                    <Col className='chat-message'>
                        {messages.length > 0 && messages.map((data, index) => <ChatMessage key={index} {...data} />)}
                        <Row className='d-flex mt-2'>
                            <Col xs={8}>
                                <Form.Control type='text' placeholder='Type your message...' value={text} onChange={(e) => setText(e.target.value)} />
                            </Col>
                            <Col xs={4}>
                                <Button className='sendBtn' variant='success' onClick={onSend}>
                                    Send
                                </Button>
                            </Col>
                        </Row>
                        <div id='copyright' className='mt-3 text-muted'>
                            Copyrights reserved. Print on {new Date().toLocaleDateString()}
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default ChatBot;
