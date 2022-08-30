import '../App.css'
import { useEffect, useState } from 'react'
import { Badge, Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { ITodoItem } from './TodoList'
import styled from 'styled-components'

interface ITodoCardProps {
    todo: ITodoItem,
    toggleTodo: (todo: ITodoItem) => void,
}

const StyledBadge = styled(Badge)`
    width: auto;
    margin: 5px;
`

const TodoCard = ({ todo, toggleTodo }: ITodoCardProps) => {
    const [toggle, setToggle] = useState<boolean>(todo.completed)

    useEffect(() => {
        setToggle(todo.completed)
    }, [todo])
    
    return (
        <Card className="card" bg={toggle ? "success" : "light"}>
            <Card.Body as={Row}>
                <Col sm={2}>
                    <input type="checkbox" checked={toggle} onChange={() => {
                        toggleTodo(todo)
                        setToggle(!toggle)
                    }}/>
                </Col>
                <Col sm={7}>
                    <Row>
                        <Card.Title style={{ textAlign: 'left' }}>{todo.title}</Card.Title>
                    </Row>
                    <Row>
                        {todo.tagList.map((tag, index) => <StyledBadge key={index}>{tag}</StyledBadge>)}
                    </Row>
                </Col>
                <Col sm={3}>
                    <Card.Text>by {todo.dueDate.toDateString()}</Card.Text>
                </Col>
            </Card.Body>
        </Card>
    )
}

export default TodoCard