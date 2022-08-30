import '../App.css'
import Card from 'react-bootstrap/Card'
import { Button, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

const StyledButton = styled(Button)`
    width: auto;
`

interface ISortCardProps {
    sortByCompleted: () => void,
    sortByDate: () => void,
}
const SortCard = ({ sortByCompleted, sortByDate }: ISortCardProps) => {
    return (
        <Card className="card">
            <Row>
                <Col>
                    <StyledButton onClick={sortByCompleted}>todo</StyledButton>
                </Col>
                <Col>
                    <StyledButton onClick={sortByDate}>date</StyledButton>
                </Col>
            </Row>
        </Card>
    )
}

export default SortCard