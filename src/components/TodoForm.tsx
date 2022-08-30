import '../App.css'
import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import styled from 'styled-components'

import { ITodoItem } from './TodoList'

const StyledGroup = styled(Form.Group)`
    margin: 10px 0px;
`

const Tag = styled(Button)`
    width: auto;
    margin: 5px;
`

interface ITodoFormProps {
    updateTodos: (todo: ITodoItem) => void,
}

const TodoForm = ({ updateTodos }: ITodoFormProps) => {
    const initDate = new Date(0)
    const [title, setTitle] = useState<string>("")
    const [tagList, setTagList] = useState<string[]>([])
    const [date, setDate] = useState<Date>(initDate)
    const [dateString, setDateString] = useState<string>("")
    const [newTag, setNewTag] = useState<string>("")

    // Input Events
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTag(e.target.value)
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(new Date(e.target.value.replace(/-/g, '/').replace(/T.+/, '')))
        setDateString(e.target.value)
    }

    // Button Events
    const handleAddTag = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (newTag) {
            setTagList([...tagList, newTag])
            setNewTag("")
        }
    }
    const handleRemoveTag = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault()
        setTagList(tagList.filter((tag, i) => {
            return i !== index
        }))
    }

    const handleCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if (title && date.getTime() !== initDate.getTime()) {
            const todo: ITodoItem = {
                title: title,
                tagList: tagList,
                dueDate: date,
                completed: false,
            }
            updateTodos(todo)
            clearState()
        }
    }

    // Helper to clear state
    const clearState = () => {
        setTitle("")
        setDate(initDate)
        setDateString("")
        setTagList([])
        setNewTag("")
    }

    return (
        <Card className="card" bg="light">
            <Form>
                <StyledGroup as={Row}>
                    <Form.Label column sm={2}>Title</Form.Label>
                    <Col sm={10}>
                        <Form.Control className="col-xs-4" placeholder="description of todo item" value={title} onChange={handleTitleChange}/>
                    </Col>
                </StyledGroup>
                <StyledGroup as={Row}>
                    <Form.Label column sm={2}>Tags</Form.Label>
                    <Col sm={7}>
                        <Form.Control placeholder="Ex: Grocery, School, ..." value={newTag} onChange={handleTagChange} />
                    </Col>
                    <Col sm={3}>
                        <Button variant="primary" onClick={handleAddTag}>
                            Add Tag
                        </Button>
                    </Col>
                </StyledGroup>
                <StyledGroup as={Row}>
                    {tagList.map((tag, i) => {
                        return <Tag key={i} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleRemoveTag(e, i)}>x {tag}</Tag>
                    })}
                </StyledGroup>
                <StyledGroup as={Row}>
                    <Form.Label column sm={2}>Due</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="date" value={dateString} onChange={handleDateChange} />
                    </Col>
                </StyledGroup>
            </Form>
            <Button onClick={handleCreate}>Create</Button>
        </Card>
    )
}

export default TodoForm